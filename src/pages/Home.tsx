import { useContext } from "react"
import { Button, Container } from "react-bootstrap"
import GameContext from "../context/GameContext"
import HexToRgb from "../utilities/HexToRGB"
import { AnswerToast } from "../components/AnswerToast"
import CheckGuess from "../components/CheckGuess"
import GuessDisplay from "../components/GuessDisplay"
import { GuessEntry } from "../components/GuessEntry"

export const Home = () => {

    const { dispatch, gamePlaying, gameWon, correctAnswer, guesses } = useContext(GameContext);

    const recordGuess = (hexValue: string) => {
        console.log(`The correct answer is: ${correctAnswer.r}, ${correctAnswer.g}, ${correctAnswer.b} `)
        const rgbValue = HexToRgb(hexValue)
        const userAnswer = {
            r: rgbValue!.r,
            g: rgbValue!.g,
            b: rgbValue!.b,
            correct: CheckGuess(correctAnswer, { r: rgbValue!.r, g: rgbValue!.g, b: rgbValue!.b })
        }

        var numCorrect = 0
        userAnswer.correct.forEach(element => {
            if (element === 1) { numCorrect++ }
        })
        if (numCorrect === 3) {
            dispatch({ type: 'SET_GAMEWON', payload: true });
            dispatch({ type: 'SET_GAMEPLAYING', payload: false });
        }

        dispatch({ type: 'SET_GUESSES', payload: [...guesses, userAnswer] });
        if (guesses.length >= 4) {
            dispatch({ type: 'SET_GAMEPLAYING', payload: false });
        }
    }

    const resetGame = () => {
        dispatch({ type: 'SET_GUESSES', payload: [] });
        dispatch({
            type: 'SET_CORRECTANSWER', payload: {
                r: Math.round(Math.random() * 255),
                g: Math.round(Math.random() * 255),
                b: Math.round(Math.random() * 255)
            }
        });
        dispatch({ type: 'SET_GAMEWON', payload: false });
        dispatch({ type: 'SET_GAMEPLAYING', payload: true });
    }

    return (
        <>
            <Container>
                {!gamePlaying && <AnswerToast correctAnswer={correctAnswer} />}
                <div className="d-flex justify-content-center">
                    <div className="flex-column text-center">
                        <h5>{gamePlaying ? "Choose a color:" : gameWon ? "You win!" : "You lose!"}</h5>
                        <GuessEntry recordGuess={recordGuess} gamePlaying={gamePlaying} />
                        <div className="mt-2 mb-2 px-2 ">
                            <Button
                                style={{ visibility: gamePlaying ? 'hidden' : 'visible' }}
                                onClick={() => {
                                    resetGame()
                                }}>
                                Play Again
                            </Button>
                        </div>
                        <div className="d-flex gap-3">
                            <GuessDisplay guesses={guesses} />
                        </div>
                    </div>
                </div>

            </Container>
        </>
    )
}