import React from "react";

/**
 * This is the first component a player sees when they come to the site.
 * Here the user can choose between hosting a game, or to join an existing game.
 */
const Home = ({ setJoinGame, setHostGame }) => {
    return(
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1>Velkommen til Mayer</h1>
                <div className="mt-3">
                    <button
                        className="p-1 bg-gray-200 m-1"
                        onClick={() => setJoinGame(true)}
                    >
                        Join
                    </button>
                    <button
                        className="p-1 bg-gray-200 m-1"
                        onClick={() => setHostGame(true)}
                    >
                        Host
                    </button>
                </div>
            </div>
        </>
    );
};

export default Home;