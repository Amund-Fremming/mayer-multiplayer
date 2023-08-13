import React, { useEffect } from "react";
import { runTransaction, onSnapshot } from 'firebase/firestore';
import { db } from "../config/firebase";

/**
 * Component for players to join a game lobby. Listens for game state changes in the database and reacts accordingly.
 */
const JoinLobby = ({ gameid, username, setView, resetGameState, documentRef, saveInSessionStorage }) => {

    /**
     * Subscribes to database updates for the specified game, and changes view accordingly.
     */
    useEffect(() => {
        if(!documentRef) return;

        saveInSessionStorage(gameid, username, documentRef);

        const unsubscribe = onSnapshot(documentRef, snapshot => {
            if (!snapshot.data()) {
                console.log("Game deleted");
                alert("Game deleted");
                resetGameState();
                return;
            }
    
            if (snapshot.data().state === "WAITING") {
                setView("GAME_LOBBY");
            }
        });

        return () => unsubscribe();
    }, [documentRef, setView]);

    /**
     * Removes the player from the game's player list and navigates to the landing page.
     */
    const handleLeaveGame = async () => {
        try {
            await runTransaction(db, async (transaction) => {
                const docSnapshot = await transaction.get(documentRef);
    
                if (!docSnapshot.exists()) {
                    throw new Error("Document does not exist!");
                }
    
                const currentPlayers = docSnapshot.data().players;
                const updatedPlayers = currentPlayers.filter(player => player.username !== username);
    
                transaction.update(documentRef, { players: updatedPlayers });
            });
    
            console.log(username + " left the game");
        } catch (err) {
            console.error("Error: " + err.message);
        }
    
        resetGameState();
    };    

    return(
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1>JoinLobby</h1>
                <h2>username: {username}</h2>
                <h2>gameid: {gameid}</h2>
                <h2>Waiting for Host ...</h2>
                <button
                    className='p-1 bg-gray-200 m-1'
                    onClick={handleLeaveGame}
                >
                    Leave
                </button>      
            </div>
        </>
    );
};

export default JoinLobby;