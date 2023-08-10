import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../util/firebase';

/**
 * This component shows all the players that have joined the game the host has made.
 * The host can also hit the start-game button to start the game.
 */
const HostLobby = ({ gameid, username, setView, resetGameState }) => {

    const [players, setPlayers] = useState([]);

    /**
     * This useEffect subscribes a listener to a given entry in the database.
     */
    useEffect(() => {
        const collectionRef = collection(db, "games");
        const q = query(collectionRef, where("gameid", "==", gameid));

        const unsubscribe = onSnapshot(q, snapshot => {
            setPlayers(snapshot.docs[0].data().players);
        });

        return () => unsubscribe();
    }, []);

    /**
     * Deletes the game entry in the database and alerts the joined players that the game is no longer in play.
     * Then it resets the state and returns the user to the landing page.
     */
    const handleLeaveGame = () => {
        resetGameState();
        // Deletes the game that was created
        // The joined players need to get the update so they can also leave their game that does not exist anymore
    };

    /**
     * This function gets the entry in the database and updates the game state to "Waiting".
     * It then changes the states from the App component and renders a new componen.
     */
    const handleStartGame = async () => {
        const collectionRef = collection(db, "games");
        const q = query(collectionRef, where("gameid", "==", gameid));
        try {
            const querySnapshot = await getDocs(q);
            if(!querySnapshot.empty) {
                const documentSnapshot = querySnapshot.docs[0];
                const documentRef = doc(collectionRef, documentSnapshot.id);
                
                await updateDoc(documentRef, { state: "WAITING" });
            }
            resetGameState();
            setView("GAME_LOBBY");
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