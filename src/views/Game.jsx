import React, { useEffect, useState } from "react";
import { onSnapshot, runTransaction } from "firebase/firestore";
import PlayerTurn from "../components/Game/PlayerTurn";
import WaitingTurn from "../components/Game/WaitingTurn";
import { db } from "../config/firebase";

const Game = ({ gameid, username, documentRef, saveInSessionStorage, resetGameState }) => {
    
    const [players, setPlayers] = useState([]);
    const [playersTurn, setPlayersTurn] = useState(false);

    useEffect(() => {
        if(!documentRef) return;

        saveInSessionStorage(gameid, username, documentRef);

        const unsubscribe = onSnapshot(documentRef, snapshot => {
            if(!snapshot.data()) {
                console.log("Game deleted");
                alert("Game deleted");
                resetGameState();
                return;
            }

            setPlayersTurn(snapshot.data().currentPlayer === username);
            setPlayers(snapshot.data().players);
        });
    
        return () => unsubscribe();
    }, [documentRef]);

    const handleLeaveGame = async () => {
        try {
            await runTransaction(db, async (transaction) => {
                const docSnapshot = await transaction.get(documentRef);
    
                if (!docSnapshot.exists()) {
                    throw new Error("Document does not exist!");
                }
    
                const currentPlayers = docSnapshot.data().players;
                const updatedPlayers = currentPlayers.filter(player => player.username !== username);
    
                transaction.update(documentRef, { players: updatedPlayers });
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
                <h1>Game</h1>
                <h2>gameid: {gameid}</h2>
                <div className="m-2 p-1 bg-gray-200">
                    <h1 className="text-xl font-bold">Players</h1>
                    {
                        !players ? "" :
                        players.map(player => (
                            <p key={player.id}>{player.username} rolled dices: {player.dice1 > player.dice2 ? player.dice1 + "" + player.dice2 : player.dice2 + "" + player.dice1}</p>
                        ))
                    }
                </div>
                
                {/* Game logic */}
                {
                    playersTurn
                    ? <PlayerTurn />
                    : <WaitingTurn />
                }
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

export default Game;