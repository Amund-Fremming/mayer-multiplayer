import React, { useState } from 'react';
import { collection, doc, getDocs, getDoc, arrayUnion, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../util/firebase';

const JoinGame = ({ resetAllGameStates , gameid, setGameid, username, setUsername, setJoinLobby }) => {

    const gameRef = collection(db, "games");

    const playerJoinGame = async () => {
        const collectionRef = collection(db, "games");
        const q = query(collectionRef, where("gameid", "==", gameid));
      
        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const documentSnapshot = querySnapshot.docs[0];
            const documentRef = doc(collectionRef, documentSnapshot.id);
            
            await updateDoc(documentRef, {
                players: arrayUnion({
                    username: username,
                    ready: false,
                })
            });
            console.log("Document updated successfully!");
          } else {
            console.log("Document not found!");
          }
        } catch (error) {
          console.error("Error updating document:", error);
        }
      };
      
    const handleJoinedGame = async () => {
        let duplicate = false;
        let idExists = true;
        const collectionRef = collection(db, "games");
        const q = query(collectionRef, where("gameid", "==", gameid));
        const querySnapshot = await getDocs(q);

        if(!querySnapshot.empty) {
            let players = querySnapshot.docs[0].data().players;
            if(players.includes(username)) duplicate = true;
        } else {
            idExists = false;
        }

        if (username === "" || gameid === "") {
            alert("Fill out username/gameid");
        } else if(!idExists) {
            alert("Id noes not exist");
        } else if(duplicate) {
            alert("Username is taken");
        } else {
            resetAllGameStates();
            setJoinLobby(true);
            playerJoinGame();
        }
    };

  return(
    <>
        <div className='flex flex-col items-center justify-center h-screen'>
            JoinGame
            <input
                type="text"
                placeholder='Game ID'
                onChange={e => setGameid(e.target.value)}
            />
            <input
                type="text"
                placeholder='Username'
                onChange={e => setUsername(e.target.value)}
            />
            <div className='flex m-1'>
                <button
                    className='p-1 bg-gray-200 m-1'
                    onClick={() => resetAllGameStates()}
                >
                    Back
                </button>
                <button
                    className='p-1 bg-gray-200 m-1'
                    onClick={() => {handleJoinedGame()}}
                >   
                    Join
                </button>
            </div>
        </div>
    </>
  );
};

export default JoinGame;
