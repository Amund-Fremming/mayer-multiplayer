import React, { useEffect } from "react";
import { getDoc, updateDoc, onSnapshot } from 'firebase/firestore';

/**
 * This components have a listener that listens for the game state to change in the database.
 * When the game state changes a new component will render.
 * The user can also
 */
const JoinLobby = ({ gameid, username, setView, resetGameState, documentRef }) => {

    /**
     * This useEffect subscribes a listener to a given entry in the database.
     */
    useEffect(() => {
        if(!documentRef) return;

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
     * Removes the player from the game collection, and then returns the user to the landing page.
     */
    const handleLeaveGame = async () => {      
        try {
            const documentSnapshot = await getDoc(documentRef);

            if(!documentSnapshot.data()) {
                console.log("Something went wrong. (document dont exist)");
                resetGameState();
                return;
            }

            const updatedPlayers = documentSnapshot.data().players.filter(player => player.username !== username);
                        
            await updateDoc(documentRef, {
                players: updatedPlayers
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