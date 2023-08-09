import React from 'react';
import { collection, doc, getDocs, query, where, runTransaction } from 'firebase/firestore';
import { db } from '../util/firebase';
import Game from './Game';

const JoinGame = ({ resetAllGameStates , gameid, setGameid, username, setUsername, setJoinLobby }) => {
    /*const playerJoinGame = async () => {
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
            console.log(`Player (${username}) joined game (${gameid})`);
          } else {
            console.log("Document not found!");
          }
        } catch (error) {
          console.error("Error updating document:", error);
        }
    };*/

    const playerJoinGame = async () => {
        const collectionRef = collection(db, "games");
        const q = query(collectionRef, where("gameid", "==", gameid));
        let usernameExists = false;

        try {
            const documentSnapshot = await getDocs(q);
            if (!documentSnapshot.empty) {
                const documentRef = doc(collectionRef, documentSnapshot.docs[0].id);
    
                const joinTransaction = async (transaction) => {
                    const docSnapshot = await transaction.get(documentRef);
                    if (!docSnapshot.exists) {
                        throw new Error("Document does not exist!");
                    }
    
                    const players = docSnapshot.data().players;
                    players.push({ username: username, ready: false });
                    transaction.update(documentRef, { players: players });
                };
                
                await runTransaction(db, joinTransaction);
                console.log("Player joined the game!");
                resetAllGameStates();
                setJoinLobby(true);
            } else {
                alert(`Game id: ${gameid}, does not exist`);
            }
        } catch (err) {
            console.log("Error: " + err.message);
        }
    };

    const handleJoinGame = () => {
        // Sjekker om username finnes

        if (username === "" || gameid === "") {
            alert("Fill out username/gameid");
        } else {
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
                    onClick={handleJoinGame}
                >   
                    Join
                </button>
            </div>
        </div>
    </>
  );
};

export default JoinGame;
