import React, { useEffect, useState } from "react";
import { updateDoc, onSnapshot, deleteDoc } from 'firebase/firestore';

/**
 * Displays the host's game lobby and manages game start or termination.
 */
const HostLobby = ({ gameid, username, setView, resetGameState, documentRef, saveInSessionStorage }) => {

    const [players, setPlayers] = useState([]);

    /**
     * Subscribes to player changes in the hosted game.
     */
    useEffect(() => {
        saveInSessionStorage(gameid, username, documentRef);

        if(!documentRef) return;

        const unsubscribe = onSnapshot(documentRef, snapshot => {
            if(!snapshot.data()) {
                console.log("Document does not exist!");
                return;
            }

            setPlayers(snapshot.data().players);
        });

        return () => unsubscribe();
    }, [documentRef]);

    /**
     * Deletes the game and resets to the landing page.
     */
    const handleLeaveGame = async () => {
        resetGameState();
        await deleteDoc(documentRef);
    };

    /**
     * Initiates the game by updating its state.
     */
    const handleStartGame = async () => {
        try {   
            await updateDoc(documentRef, { state: "WAITING" });
            setView("GAME_LOBBY");
            console.log("Game state changed. State: Waiting");
        } catch(err) {
            console.log("Error: " + err.message);
        }
    };

    return(
        <>
            <div className="flex flex-col justify-center items-center h-screen">                
                <div className="m-2 p-1 bg-gray-200">
                    <h1 className="text-xl font-bold">Players</h1>
                    {
                        !players ? "" :
                        players.map(player => (
                            <p key={player.id}>{player.username}</p>
                        ))
                    }
                </div>
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