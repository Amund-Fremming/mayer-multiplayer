import React, { useEffect } from "react";
import { collection, doc, getDocs, updateDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../util/firebase';

/**
 * This components have a listener that listens for the game state to change in the database.
 * When the game state changes a new component will render.
 * The user can also
 */
const JoinLobby = ({ gameid, username, setView, resetGameState }) => {

    const collectionRef = collection(db, "games");
    const q = query(collectionRef, where("gameid", "==", gameid));

    /**
     * This useEffect subscribes a listener to a given entry in the database.
     */
    useEffect(() => {
        const unsubscribe = onSnapshot(q, snapshot => {
            snapshot.docs.forEach(doc => {
                const gameData = doc.data();
                if(gameData.state === "WAITING") {
                    resetGameState();
                    setView("GAME_LOBBY");
                }
            });
        });

        return () => unsubscribe();
    }, []);

    /**
     * Removes the player from the game collection, and then returns the user to the landing page.
     */
    const handleLeaveGame = async () => {      
        try {
            const querySnapshot = await getDocs(q);
            const documentRef = doc(collectionRef, querySnapshot.docs[0].id);

            const updatedPlayers = querySnapshot.docs[0].data().players.filter(player => player.username !== username);
                        
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