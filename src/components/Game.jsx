import React, { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";

const Game = ({ gameid, username, documentRef, saveInSessionStorage, resetGameState }) => {
    
    const [players, setPlayers] = useState([]);

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

            setPlayers(snapshot.data().players);
        });
    }, [documentRef]);
    
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
                            <p key={player.id}>{player.username}</p>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Game;