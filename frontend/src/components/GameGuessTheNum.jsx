import { useState } from "react";
import { Link } from 'react-router-dom';

export const GameGuessTheNum = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [userGuess, setUserGuess] = useState('');
    const [message, setMessage] = useState('');
    const [isRevealed, setIsRevealed] = useState(false);
    const [targetNum, setTargetNUm] = useState(null);
    const [attempts, setAttempts] = useState(5);

    const handlePlay = () => {
        let randomNum = Math.floor(Math.random() * 90) + 10;
        console.log(randomNum);
        setTargetNUm(randomNum);
        setIsPlaying(true);
        setAttempts(5);
        setIsRevealed(false);
        setUserGuess('');
        setMessage('Guess a 2 digit number!');
    }

    const handleCheck = (e) => {
        e.preventDefault();
        const guessedNum = parseInt(userGuess);

        if (isNaN(guessedNum)) {
            setMessage('Please enter a valid number!');
            return;
        }
        const updatedAttempts = attempts - 1;
        setAttempts(updatedAttempts);

        if (guessedNum === targetNum) {
            setIsRevealed(true);
            setMessage('You win!Correct Guess.');
        } else if (updatedAttempts === 0) {
            setIsRevealed(true);
            setMessage('Opps! You lose! No warries try again');
        } else if (guessedNum < targetNum) {
            setMessage('Too low! Try a hingher number');
        } else {
            setMessage('Too high! Try a lower number');
        }
    }

    return (
        <div>
            <h1>Guess The Num</h1>
            {!isPlaying ? (
                <button type="submit" onClick={handlePlay}>Play</button>
            ) : (
                <div>
                    <p>{message}</p>
                    {isRevealed ? (
                        <>
                            <button onClick={handlePlay}>Play Again</button>
                            <Link to='/'>Go Back</Link>
                        </>
                    ) : (
                        <form>
                            <input type="number"
                                value={userGuess}
                                onChange={(e) => setUserGuess(e.target.value)}
                                placeholder="Enter 2 digit numbers"
                                disabled={isRevealed}
                            />
                            <button type="submit" onClick={handleCheck}>Check</button>
                        </form>
                    )}
                </div>
            )}
        </div>
    )
}
