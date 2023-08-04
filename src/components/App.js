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

    const allPlayersReady = () => {
        // onSnapshot to the game that is created
        // Checks if all players are ready
        // If all players ready, set gameStarted to true
    };

    const createGame = () => {
        // Creates a new game in the database
        // With all properties needed
    };

    const playerJoinGame = () => {
        // Takes gameid and username
        // Joins the given game
    };

    const getPlayersTurn = () => {

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