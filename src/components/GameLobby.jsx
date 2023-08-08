import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../util/firebase';
import { debounce } from "lodash";

const GameLobby = ({ resetAllGameStates, gameid, username }) => {

    const [players, setPlayers] = useState([]);

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
        const collectionRef = collection(db, "games");
        const q = query(collectionRef, where("gameid", "==", gameid));
    
        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const documentSnapshot = querySnapshot.docs[0];
                const documentRef = doc(collectionRef, documentSnapshot.id);
    
                await db.runTransaction(async transaction => {
                    const document = await transaction.get(documentRef);
                    const players = document.data().players;
                    
                    const updatedPlayers = players.map(player => {
                        if (player.username === username) {
                            return { ...player, ready: true };
                        }
                        return player;
                    });
    
                    transaction.update(documentRef, { players: updatedPlayers });
                });
    
            }
        } catch (err) {
            console.log("Error: " + err);
        }
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
                <button
                    className='p-1 bg-gray-200 m-1'
                    onClick={handleReadyUp}
                >
                    Ready
                </button> 
            </div>
        </>
    );  
};

export default GameLobby;