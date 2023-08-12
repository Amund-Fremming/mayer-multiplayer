import React from 'react';
import { collection, doc, getDocs, query, where, runTransaction } from 'firebase/firestore';
import { db } from '../util/firebase';

/**
 * Component for players to join an existing game or leave it.
 */
const JoinGame = ({ resetGameState , gameid, setGameid, username, setUsername, setView, setDocumentRef }) => {

    const collectionRef = collection(db, "games");
    const q = query(collectionRef, where("gameid", "==", gameid));

    /**
     * Adds the player to the specified game in the database after 
     * performing necessary checks using a transaction.
     */
    const playerJoinGame = async () => {
        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const documentRef = doc(collectionRef, querySnapshot.docs[0].id);
                setDocumentRef(documentRef);
                
                const joinTransaction = async (transaction) => {
                    const docSnapshot = await transaction.get(documentRef);
                    if (!docSnapshot.exists) {
                        throw new Error("Document does not exist!");
                    }

                    // Checks if the game has started
                    if(docSnapshot.data().state === "IN_PROGRESS") {
                        return "GAME_STARTED";
                    };
    
                    // Chekcs if the username exists
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
                if(transactionResult === "GAME_STARTED") {
                    alert("Game has started");
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
     * Verifies user input before attempting to join a game.
     */
    const handleJoinGame = async () => {
        if (username === "" || gameid === "") {
            alert("Fill out username/gameid");
        } else if(username.length > 14 || gameid.length > 14) {
            alert("Too long username or gameid (Max 14)");
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

