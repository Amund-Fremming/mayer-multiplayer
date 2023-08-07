import React, { useState } from "react";
import Home from "./Home";
import JoinGame from "./JoinGame";
import HostGame from "./Hostgame";
import HostLobby from "./HostLobby";
import JoinLobby from "./JoinLobby";
import Game from "./Game";

const App = () => {

    const [joinGame, setJoinGame] = useState(false);
    const [hostGame, setHostGame] = useState(false);
    const [hostLobby, setHostLobby] = useState(false);
    const [joinLobby, setJoinLobby] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [username, setUsername] = useState("");
    const [gameid, setGameId] = useState("");

    const toggleGameState = (newState) => {
        // Updates the game to inProgress
        // update gameStarted State
        // sets all other states to false so only game is live
    };

    const resetAllGameStates = () => {
        setJoinGame(false);
        setHostGame(false);
        setHostLobby(false);
        setJoinLobby(false);
        setGameStarted(false);
    };

    if(!joinGame && !hostGame && !hostLobby && !joinLobby && !gameStarted) {
        return(
            <Home
                joinGame={joinGame}
                hostGame={hostGame}
                setJoinGame={setJoinGame}
                setHostGame={setHostGame}
            />  
        );
    } else if (joinGame) {
        return(
            <JoinGame
                resetAllGameStates={resetAllGameStates}
                gameid={gameid}
                setGameid={setGameId}
                username={username}
                setUsername={setUsername}
                setJoinLobby={setJoinLobby}
            />
        )
    } else if(hostGame) {
        return(
            <HostGame
                resetAllGameStates={resetAllGameStates}
                gameid={gameid}
                setGameid={setGameId}
                username={username}
                setUsername={setUsername}
                setHostLobby={setHostLobby}
            />
        )
    } else if (hostLobby) {
        return(
            <HostLobby
                resetAllGameStates={resetAllGameStates}
                gameid={gameid}
                username={username}
                setGameStarted={setGameStarted}
            />
        )
    } else if(joinLobby) {
        return(
            <JoinLobby
                resetAllGameStates={resetAllGameStates}
                gameid={gameid}
                username={username}
                setGameStarted={setGameStarted}
            />
        )
    }
};

export default App;