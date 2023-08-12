import React from 'react';
import { addDoc, collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../util/firebase';

/**
 * Allows a user to create and host a new game.
 */
const HostGame = ({ resetGameState, gameid, setGameid, username, setUsername, setView, setDocumentRef }) => {

    const collectionRef = collection(db, "games");

    /**
     *  Creates a new game in the firestore database
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

            // Sets the documentRef, saves us form extra querying later.
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
            } else if(username.length > 14 || gameid.length > 14) {
                alert("Too long username or gameid (Max 14)");
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
