import React from 'react'
import { updateDoc } from 'firebase/firestore';

/**
 * Handles all the users choices when its their turn
 */
function PlayerTurn({ documentRef, username, game, setDice1, setDice2 }) {

  /**
   * Updates the dices to a player in the firestore database
   */
  const updateDices = async (dice1, dice2) => {
    try {
      const updatedPlayers = game.players.map(player => {
        if(player.username === username) {
          // Mulig enne oppdaterer feil
          return { ...player, dice1, dice2 };
        }
        return player;
      });

      await updateDoc(documentRef, { players: updatedPlayers });
    } catch(err) {
      console.log("Error: " + err.message);
    }
  };

  /**
   * Handles the logic if a player thinks the previous player has cheated.
   */
  const handleBust = () => {
    const previousPlayer = game.previousPlayer;

    if(previousPlayer.inputDice1 !== previousPlayer.dice1 && previousPlayer.inputDice2 !== previousPlayer.dice2) {
      console.log("Previous player got BUSTED!");
      // kanskje si ifra at en spiller prøvde å buste noen
      // alertPlayerBusted();
    } else {
      console.log(`The BUST was false, player ${username} lost!`);
    }
    
    resetGame();
  };

  /**
   * Handles the throw dice mechanism
   */
  const handleThrowDices = () => {
    // Play dice annimation
    const dice1Result = Math.floor(Math.random() * 6) + 1;
    const dice2Result = Math.floor(Math.random() * 6) + 1;
    setDice1(dice1Result);
    setDice2(dice2Result);
    updateDices(dice1Result, dice2Result);
    // Show lie or play dices to go futher in game logic
  };

  /**
   * Takes in the values the player decides that the dices are
   */
  const handleinputDices = async (inputDice1, inputDice2) => {
    // Dont need a transaction, only one player can update this at a time
    try {
      const updatedCurrentPlayer = {
        ...game.currentPlayer,
        inputDice1: inputDice1,
        inputDice2: inputDice2,
      }

      const updatedPlayers = game.players.map(player => {
        if(player.username === username) {
          return {
            ...player,
            inputDice1: inputDice1,
            inputDice2: inputDice2,
          }
        }
        return player;
      });

      await updateDoc(documentRef, {
        currentPlayer: updatedCurrentPlayer,
        players: updatedPlayers,
      });

    } catch(err) {
      console.log("Error: " + err.message);
    }
  };

  /**
   * Updates the next players turr, so the game continues
   */
  const updateNextPlayer = async () => {
    const players = game.players;
    const previousPlayerIndex = players.findIndex(player => player.username === username);

    const previousPlayer = players[previousPlayerIndex];
    let currentPlayer;

    if(previousPlayerIndex === -1) {
      alert("player no longer exists");
      return;
    } else if(previousPlayerIndex === (players.length - 1)) {
      currentPlayer = players[0];
    } else {
      currentPlayer = players[(previousPlayerIndex + 1)];
    }

    setDice1(0);
    setDice2(0);
    await updateDoc(documentRef, {
      currentPlayer: currentPlayer,
      previousPlayer: previousPlayer,
    });
  };

  /**
   * Resets the game so its ready for a new round
   */
  const resetGame = async () => {
    const updatedPlayers = game.players.map(player => {
      return {
        ...player,
        dice1: 0,
        dice2: 0,
        inputDice1: 0,
        inputDice2: 0,
      }
    });

    const updatedCurrentPlayer = {
      ...game.currentPlayer,
      dice1: 0,
      dice2: 0,
      inputDice1: 0,
      inputDice2: 0,
    };

    const updatedPreviousPlayer = {
      ...game.previousPlayer,
      dice1: 0,
      dice2: 0,
      inputDice1: 0,
      inputDice2: 0,
    };

    await updateDoc(documentRef, {
      currentPlayer: updatedCurrentPlayer,
      players: updatedPlayers,
      previousPlayer: updatedPreviousPlayer
    });
  };

  /**
   * Alerts the player that has been busted.
   */
  const alertPlayerBusted = () => {
    // Updates a players busted state, and shows them that they are busted and to all other players
    // Needs to edit db
  };

  return (
    <>
      <div className='flex justify-center items-center'>
        <button
          className='m-2 p-1 bg-gray-200'
          onClick={handleBust}
        >
          Bust
        </button>
        <button
          className='m-2 p-1 bg-gray-200'
          onClick={handleThrowDices}
        >
          Throw dice
        </button>
      </div>
    </>
  )
};

export default PlayerTurn
