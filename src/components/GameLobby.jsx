import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, query, where, onSnapshot, runTransaction, updateDoc } from 'firebase/firestore';
import { db } from '../util/firebase';

/**
 * This component renders when the host has presset the start-game button and the database game state is "Waiting"
 * Here users can hit the Ready up button to ready up for the game.
 * There is also a view off all the players, when they ready up their username turns green.
 */
const GameLobby = ({ resetGameState, gameid, username, setView }) => {

    const [players, setPlayers] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const [allPlayersReady, setAllPlayersReady] = useState(false);

    /**
     * useEffect runs every time the component renders.
     * Here we subscribe to the database, so it listens for updates on the database
     * The debounce function delays the listener so its not too much traffic.
     */
    useEffect(() => {
        const collectionRef = collection(db, "games");
        const q = query(collectionRef, where("gameid", "==", gameid));
        
        const unsubscribe = onSnapshot(q, snapshot => {
            const players = snapshot.docs[0].data().players
            setPlayers(players);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        handleAllPlayersReady();
    });

    const handleAllPlayersReady = async () => {
        const areAllPlayersReady = players => players.every(player => player.ready === true);

        console.log("SPILLERE: " + players.username);
            
        if(players.length !== 0 && areAllPlayersReady(players)) {
            setView("GAME");
            // SET GAME STATE TO "In progress"
            // denne metoden blir sendt flere ganger enn nødvendig
            const updateState = async () => {
                const collectionRef = collection(db, "games");
                const q = query(collectionRef, where("gameid", "==", gameid));

                try {
                    const documentSnapshot = await getDocs(q);
                    if(!documentSnapshot.empty) {
                        const documentRef = doc(db, "games", documentSnapshot.docs[0].id);

                        await updateDoc(documentRef, {
                            state: "IN_PROGRESS"
                        });
                    }
                } catch (err) {
                    console.log("Error: " + err.message);
                }
            };

            updateState();
        }
    };

    /**
     * This function queries the right document in the database and makes a referande to the instance.
     * Then it uses transaction for avoiding race conditions when updating the players.
     * In the end the function changes a players ready state to true, with the username they have.
     */
    const handleReadyUp = async () => {
        if(isReady) return;

        const collectionRef = collection(db, "games");
        const q = query(collectionRef, where("gameid", "==", gameid));
        try {
            const querySnapshot = await getDocs(q);
            if(!querySnapshot.empty) {
                const documentSnapshot = querySnapshot.docs[0];
                const documentRef = doc(collectionRef, documentSnapshot.id);
    
                const updatePlayerStatus = async (transaction) => {
                    const docSnapshot = await transaction.get(documentRef);
                    if (!docSnapshot.exists) {
                        throw new Error("Document does not exist!");
                    }
    
                    const players = docSnapshot.data().players;
                    const updatedPlayers = players.map(player => {
                        if (player.username === username) {
                            return {...player, ready: true}
                        }
                        return player;
                    });
    
                    transaction.update(documentRef, { players: updatedPlayers });
                };
                
                setIsReady(true);
                console.log(`Player: ${username} is ready`);
                await runTransaction(db, updatePlayerStatus);
            }
        } catch(err) {
            console.log("Error: " + err);
        }
    };

    /**
     * Removes a player from the game collection they are in when they leave the game. 
     */
    const handleLeaveGame = async () => {
        const collectionRef = collection(db, "games");
        const q = query(collectionRef, where("gameid", "==", gameid));
      
        try {
            const querySnapshot = await getDocs(q);
            const documentSnapshot = querySnapshot.docs[0];
            const documentRef = doc(collectionRef, documentSnapshot.id);

            const updatedPlayers = documentSnapshot.data().players.filter(player => player.username !== username);
                        
            await updateDoc(documentRef, {
                players: updatedPlayers
            });
            console.log(username + " left the game");
        } catch (error) {
          console.error("Error updating document:", error);
        }

        resetGameState();
    };

    return(
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1>GameLobby</h1>
                <h2>Players</h2>
                <div className="w-[20%] flex flex-wrap">
                    {
                        players.map(player => (
                            <p key={player.id} className={player.ready ? "text-green-500 m-1" : "text-red-500 m-1"}>{player.username}</p>
                        ))
                    }
                </div>
                <div className="flex">
                    <button
                        className='p-1 bg-gray-200 m-1'
                        onClick={handleLeaveGame}
                    >
                        Leave
                    </button>  
                    <button
                        className={isReady ? `bg-green-500 p-1 m-1 ` : `bg-gray-200 p-1 m-1 `}
                        onClick={handleReadyUp}
                    >
                        Ready
                    </button>
                </div>
            </div>
        </>
    );  
};

export default GameLobby;