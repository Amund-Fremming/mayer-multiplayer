import React, { useEffect } from "react";
import { collection, doc, getDocs, updateDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../util/firebase';

const JoinLobby = ({ gameid, username, setGameLobby, resetAllGameStates }) => {

    useEffect(() => {
        const collectionRef = collection(db, "games");
        const q = query(collectionRef, where("gameid", "==", gameid));

        const unsubscribe = onSnapshot(q, snapshot => {
            snapshot.docs.forEach(doc => {
                const gameData = doc.data();
                if(gameData.state === "Waiting") {
                    resetAllGameStates();
                    setGameLobby(true);
                }
            });
        });

        return () => unsubscribe();
    });

    const handleLeaveGame = async () => {
        // Remove the username from the game
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