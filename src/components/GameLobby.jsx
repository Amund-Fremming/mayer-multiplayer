import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, query, where, onSnapshot, runTransaction, updateDoc } from 'firebase/firestore';
import { db } from '../util/firebase';
import { debounce } from "lodash";

const GameLobby = ({ resetAllGameStates, gameid, username }) => {

    const [players, setPlayers] = useState([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const collectionRef = collection(db, "games");
        const q = query(collectionRef, where("gameid", "==", gameid));
        
        const unsubscribe = onSnapshot(q, snapshot => {
            setPlayers(snapshot.docs[0].data().players);
        });

        const debouncedUnsubscribe = debounce(unsubscribe, 500);

        return () => {
            debouncedUnsubscribe();
            debouncedUnsubscribe.cancel();
        }
    });

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
        
        resetAllGameStates();
    };

    return(
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1>GameLobby</h1>
                <h2>Players</h2>
                <div className="w-[20%] flex flex-wrap">
                    {
                        players.map(player => (
                            <p className={player.ready ? "text-green-500 m-1" : "text-red-500 m-1"}>{player.username}</p>
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