import React from 'react';
import { addDoc, collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../util/firebase';

/**
 * This component renders if the user decides that he want to create a game and be the host.
 * Here the host sees all players that join and can start the game whenever he wants.
 */
const HostGame = ({ resetGameState, gameid, setGameid, username, setUsername, setView, setDocumentRef }) => {

    const collectionRef = collection(db, "games");

    /**
     *  Creates a new game instance in the firestore database
     */
    const createGame = async () => {
        try {
            const newGameRef = await addDoc(collectionRef, {
                gameid: gameid,
                currentPlayer: "",
                players: [
                    {
                        username: username,
                        ready: false,
                    },
                ],
                roundnumber: 0,
                state: "CREATED",
            }); 
            console.log("Game created");

            // This sets the documentRef for later use, so i dont have to query more, and make the program less effective
            setDocumentRef(newGameRef);
        } catch(err) {
            console.log("Error: " + err);
        }
    };

    /**
     * Sets the states from the App so that the next "page" 
     * renders
     */
    const handleHostedGame = async () => {
        try {
            const q = query(collectionRef, where("gameid", "==", gameid));
            const querySnapshot = await getDocs(q);

            if(gameid === "" || username === "") {
                alert("Fill out username/gameid");
            } else if(!querySnapshot.empty) {
                alert("Game id in use");
            } else {
                createGame();
                resetGameState();
                setView("HOST_LOBBY");
            }
        } catch (err) {
            console.log("Error: " + err.message);
        }
    };

    return(
        <>
            <div className='flex flex-col items-center justify-center h-screen'>
                Hostgame
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
                        onClick={handleHostedGame}
                    >   
                        Host
                    </button>
                </div>
            </div>
        </>
    );
};

export default HostGame;
