import TryAgainLogo from "../assets/img/try-again.gif";

const GameOverlay = ({onRestart, board}) => {
    if (board.hasWon()) {
        return <div className="tile2048"></div>
    } else if (board.hasLost()) {
        return (
            <div className="gameOver">
                <img 
                    onClick={onRestart}
                    src={TryAgainLogo} 
                    alt="try again" 
                    style={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                    }}
                />
            </div>
        )
    }

    return null;
};

export default GameOverlay;