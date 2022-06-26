import { useEffect, useState } from "react";
import useEvent from "../hooks/useEvent";
import { Board } from "../helper";
import GameOverlay from "./GameOverlay";
import Tile from "./Tile";
import Cell from "./Cell";
import congrats from "../assets/img/ava.JPG";

const BoardView = ({swipeDirection, swiped}) => {
    const [board, setBoard] = useState(new Board());
    const [showCongrats, setShowCongrats] = useState("");
    const [wasShown, setWasShown] = useState(false);

    useEffect(() => {
        if (board.score > 300 && !wasShown) {
            setShowCongrats("isVisible")

            setTimeout(() => {
                setShowCongrats("");
                setWasShown(true);
            }, 4000)
        }
    }, [setShowCongrats, board.score, wasShown, setWasShown])

    const handleKeydown = (event) => {
        if (board.hasWon()) {
            return;
        }
        if (event.keyCode >= 37 && event.keyCode <= 40) {
            let direction = event.keyCode - 37;
            let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
            let newBoard = boardClone.move(direction);
            setBoard(newBoard);
        }
    }
    useEvent("keydown", handleKeydown);
    
    useEffect(() => {
        const handleSwipe = () => {
            let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
            let newBoard = boardClone.move(swipeDirection);
            setBoard(newBoard);
        }

        handleSwipe();
        //eslint-disable-next-line
    }, [swipeDirection, swiped])

    const cells = board.cells.map((row, rowIndex) => {
        return (
            <div key={rowIndex}>
                {row.map((col, colIndex) => {
                    return <Cell key={colIndex} />
                })}
            </div>
        )
    })

    const tiles = board.tiles.filter(tile => tile.value !== 0).map((tile, index) => {
        return <Tile tile={tile} key={index}/>
    })

    const resetGame = () => {
        setBoard(new Board());
        setWasShown(false);
    }

    return (
        <div>
            <div className="details-box">
                <button
                    onClick={resetGame} 
                    className="resetButton"
                >Нова гра</button>
                <div className="score-box">
                    <div className="score-header">РАХУНОК:</div>
                    <div>{board.score}</div>
                </div>
            </div>
            <p className="header_text">Зроблено з любов'ю by <br/> Hnat Liashenko ❤️</p>
            <div className="board">
                {cells}
                {tiles}
                <GameOverlay onRestart={resetGame} board={board} />
            </div>
            <img 
                className={`congrats ${showCongrats}`} 
                src={congrats} 
                alt="congrats" 
            />
        </div>
    );
};

export default BoardView;