import React from 'react';
import { collection, doc, getDocs, query, where, runTransaction } from 'firebase/firestore';
import { db } from '../util/firebase';
import Game from './Game';

const JoinGame = ({ resetAllGameStates , gameid, setGameid, username, setUsername, setJoinLobby }) => {

    const playerJoinGame = async () => {
        const collectionRef = collection(db, "games");
        const q = query(collectionRef, where("gameid", "==", gameid));
    
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
                    for (let player of players) {
                        if (player.username.toUpperCase() === username.toUpperCase()) {
                            return "USERNAME_EXISTS";
                        }
                    }
                    players.push({ username: username, ready: false });
                    transaction.update(documentRef, { players: players });
                };
    
                const transactionResult = await runTransaction(db, joinTransaction);
    
                if (transactionResult === "USERNAME_EXISTS") {
                    alert(`Username: ${username} is already in use!`);
                    return;
                }
    
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

    const handleJoinGame = async () => {
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

