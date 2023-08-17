import React, { useState } from 'react'
import { Transaction, runTransaction, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

/**
 * Handles all the users choices when its their turn
 */
function PlayerTurn({ documentRef, username, game, dice1, setDice1, dice2, setDice2, inputDice1, setInputDice1, inputDice2, setInputDice2 }) {

  const [thrownDices, setThrownDices] = useState(false);
  const [tryBust, setTryBust] = useState(false);

  /**
   * Handles the logic if a player thinks the previous player has cheated.
   */
  const handleBust = () => {
    const previousPlayer = game.previousPlayer;

    console.log("inputdice1 " + previousPlayer.inputDice1);
    console.log("dice1 " + previousPlayer.dice1);
    console.log("inputdice2 " + previousPlayer.inputDice2);
    console.log("dice2 " + previousPlayer.dice2);

    if(previousPlayer.inputDice1 !== previousPlayer.dice1 && previousPlayer.inputDice2 !== previousPlayer.dice2) {
      console.log("Previous player got BUSTED!");
      // kanskje si ifra at en spiller prøvde å buste noen
      // alertPlayerBusted();
    } else {
      console.log(`The BUST was false, player ${username} lost!`);
    }
    
    // resetGame();
  };

  /**
   * Handles the throw dice mechanism
   */
  const handleThrowDices = () => {
    // Play dice annimation
    const dice1Local = Math.floor(Math.random() * 6) + 1;
    const dice2Local = Math.floor(Math.random() * 6) + 1;
    setDice1(dice1Local);
    setDice2(dice2Local);
    // Show lie or play dices to go futher in game logic
    setThrownDices(true);
  };

  const handleSubmitDices = () => {
    updateAllDices();
  };

  /**
   * Takes in the values the player decides that the dices are
   */
  const updateAllDices = async () => {
    // Dont need a transaction, only one player can update this at a time
    try {
      const updatedCurrentPlayer = {
        ...game.currentPlayer,
        dice1: dice1,
        dice2: dice2,
        inputDice1: inputDice1,
        inputDice2: inputDice2,
      }

      const updatedPlayers = game.players.map(player => {
        if(player.username === username) {
          return {
            ...player,
            dice1: dice1,
            dice2: dice2, 
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

      updateNextPlayer();
    } catch(err) {
      console.log("Error: " + err.message);
    }
  };

  /**
   * Updates the next players turr, so the game continues
   */
  const updateNextPlayer = async () => {  
    try {
      const updateTransaction = async (transaction) => {
        const docSnapshot = await transaction.get(documentRef);
        if(!docSnapshot.exists) {
          throw new Error("Document does not exist!");
        }

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

        transaction.update(documentRef, {
          currentPlayer: currentPlayer,
          previousPlayer: previousPlayer,
        });
      };

      setDice1(0);
      setDice2(0);
      console.log("Updated next player");
      await runTransaction(db, updateTransaction);
    } catch (err) {
      console.log(err.message);
    }
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

  if(!thrownDices && !tryBust) {
    return (
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
    )
  } else if(thrownDices) {
    return(
      <div className='flex flex-col justify-center items-center'>
        <input 
          type="number"
          className="p-1 m-1 bg-gray-200 w-12"
          onChange={e => setInputDice1(e.target.value)}
          placeholder='Dice 1'
          min={1} max={6}
        />
        <input 
          type="number"
          className="p-1 m-1 bg-gray-200 w-12"
          placeholder='Dice 2'
          onChange={e => setInputDice2(e.target.value)}
          min={1} max={6}
        />
        <button
          className='m-2 p-1 bg-gray-200'
          onClick={handleSubmitDices}
        >
          Play dices
        </button>
      </div>
    );
  } else if(tryBust) {
    return(
      <div className='flex justify-center items-center'>

      </div>
    );
  }
};

export default PlayerTurn

