import React, { useEffect, useState } from "react";
import { getDoc, onSnapshot, runTransaction, updateDoc } from 'firebase/firestore';
import { db } from '../util/firebase';

/**
 * GameLobby: Renders when the host starts the game with a "Waiting" state.
 * Allows users to ready up, displaying all player names, changing colors when ready.
 */
const GameLobby = ({ resetGameState, gameid, username, setView, documentRef, saveInSessionStorage }) => {

    const [players, setPlayers] = useState([]);
    const [isReady, setIsReady] = useState(false);

    /**
     * Subscribes a listener to DB for updates for players list.
     */
    useEffect(() => {
        if(!documentRef) return; 

        saveInSessionStorage(gameid, username, documentRef);

        const unsubscribe = onSnapshot(documentRef, snapshot => {
            if (!snapshot.data()) {
                console.error("Document does not exist!");
                return;
            }

            setPlayers(snapshot.data().players);
            setIsReady(snapshot.data().players.some(player => player.username === username && player.ready === true));
        });

        return () => unsubscribe();
    }, [documentRef]);

    useEffect(() => {
        const handleAllPlayersReady = async () => {
            const areAllPlayersReady = players => players.every(player => player.ready === true); 
            
            if(players.length !== 0 && areAllPlayersReady(players)) {
                // denne metoden blir sendt flere ganger enn nødvendig
                try {
                    await updateDoc(documentRef, { state: "IN_PROGRESS" });
                } catch (err) {
                    console.log("Error: " + err.message);
                }

                setView("GAME");
            }
        };

        handleAllPlayersReady();
    });

    /**
     * Checks if all players are ready and updates game state.
     */
    const handleReadyUp = async () => {
        if(isReady) return;
        try {    
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
        } catch(err) {
            console.log("Error: " + err.message);
        }
    };

    /**
     * Handles player ready state, updating DB via transaction.
     */
    const handleLeaveGame = async () => {      
        try {
            const documentSnapshot = await getDoc(documentRef);
            const updatedPlayers = documentSnapshot.data().players.filter(player => player.username !== username);
                        
            await updateDoc(documentRef, { players: updatedPlayers });
            console.log(username + " left the game");
        } catch (err) {
          console.error("Error: " + err.message);
        }

        resetGameState();
    };

    return(
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1>GameLobby</h1>
                <h2>Gameid: {gameid}</h2>
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