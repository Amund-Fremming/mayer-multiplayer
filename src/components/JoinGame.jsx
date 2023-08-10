import React from 'react';
import { collection, doc, getDocs, query, where, runTransaction } from 'firebase/firestore';
import { db } from '../util/firebase';
import Game from './Game';

/**
 * This component handles the players trying to join a game with a gicen id and username.
 * Users can also leave the game resoulting in them getting removed from the database.
 */
const JoinGame = ({ resetGameState , gameid, setGameid, username, setUsername, setView }) => {

    /**
     * Creates a refferance to the collection and the specific entry in the database and makes a transaction to prevent race conditions.
     * Adds the player to the game in the db and cheks for if the username already exists.
     */
    const playerJoinGame = async () => {
        const collectionRef = collection(db, "games");
        const q = query(collectionRef, where("gameid", "==", gameid));
    
        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const documentRef = doc(collectionRef, querySnapshot.docs[0].id);
                
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
                resetGameState();
                setView("JOIN_LOBBY");
    
            } else {
                alert(`Game id: ${gameid}, does not exist`);
            }
        } catch (err) {
            console.log("Error: " + err.message);
        }
    };

    /**
     * Handles the player trying to join a game and checks if all conditions are met.
     */
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
                    onClick={() => resetGameState()}
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

