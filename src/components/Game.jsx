import React, { useEffect } from "react";

const Game = ({ gameid, username, documentRef, saveInSessionStorage }) => {
    
    useEffect(() => {
        saveInSessionStorage(gameid, username, documentRef);
    }, [documentRef]);
    
    return(
        <>
            Game
        </>
    );
};

export default Game;