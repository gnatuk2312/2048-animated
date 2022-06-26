import { useEffect, useState } from "react";
import useEvent from "../hooks/useEvent";
import { Board } from "../helper";
import GameOverlay from "./GameOverlay";
import Tile from "./Tile";
import Cell from "./Cell";

const BoardView = ({swipeDirection}) => {
    const [board, setBoard] = useState(new Board());

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
    }, [swipeDirection])

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
            <div className="board">
                {cells}
                {tiles}
                <GameOverlay onRestart={resetGame} board={board} />
            </div>
        </div>
    );
};

export default BoardView;