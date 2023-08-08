import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, arrayUnion, updateDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../util/firebase';
import { debounce } from "lodash";

const HostLobby = ({ gameid, username, setGameLobby, resetAllGameStates }) => {

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

    const handleLeaveGame = () => {
        resetAllGameStates();
        // Deletes the game that was created
        // The joined players need to get the update so they can also leave their game that does not exist anymore
    };

    const handleStartGame = async () => {
        const collectionRef = collection(db, "games");
        const q = query(collectionRef, where("gameid", "==", gameid));
        try {
            const querySnapshot = await getDocs(q);
            if(!querySnapshot.empty) {
                const documentSnapshot = querySnapshot.docs[0];
                const documentRef = doc(collectionRef, documentSnapshot.id);
                
                await updateDoc(documentRef, {
                    state: "Waiting"
                });
            }
            resetAllGameStates();
            setGameLobby(true);
            console.log("Game state changed. State: Waiting");
        } catch(err) {
            console.log("Error: " + err);
        }
    };

    return(
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                {
                    <div className="m-2 p-1 bg-gray-200">
                        <h1 className="text-xl font-bold">Players</h1>
                        {
                            players.map(player => (
                                <p>{player.username}</p>
                            ))
                        }
                    </div>
                }
                <h1>HostLobby</h1>
                <h2>username: {username}</h2>
                <h2>gameid: {gameid}</h2>
                <div className='flex m-1'>
                    <button
                        className='p-1 bg-gray-200 m-1'
                        onClick={handleLeaveGame}
                    >
                        Leave
                    </button>
                    <button
                        className="p-1 bg-gray-200 m-1"
                        onClick={handleStartGame}
                    >
                        Start Game
                    </button>
                </div>
            </div>
        </>
    );
};

export default HostLobby;