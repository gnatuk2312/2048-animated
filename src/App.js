import { useState } from "react";
import BoardView from "./components/Board";
import useSwipe from "./hooks/useSwipe";

const App = () => {
    const [swipeDirection, setSwipeDirection] = useState(null);

    const bindSwipe = useSwipe({
        onUp: () => setSwipeDirection(1),
        onDown: () => setSwipeDirection(3),
        onRight: () => setSwipeDirection(2),
        onLeft: () => setSwipeDirection(0)
    });

    return (
        <div className="app" {...bindSwipe()}>
            <BoardView swipeDirection={swipeDirection} />
        </div>
    );
};

export default App;