import { useState } from "react";
import BoardView from "./components/Board";
import useSwipe from "./hooks/useSwipe";

const App = () => {
    const [swipeDirection, setSwipeDirection] = useState(null);
    const [swiped, setSwiped] = useState(null);

    const bindSwipe = useSwipe({
        onUp: () => {
            setSwiped(Date.now())
            setSwipeDirection(1)
        },
        onDown: () => {
            setSwiped(Date.now())
            setSwipeDirection(3)
        },
        onRight: () => {
            setSwiped(Date.now())
            setSwipeDirection(2)
        } ,
        onLeft: () => {
            setSwiped(Date.now())
            setSwipeDirection(0)
        }
    });

    return (
        <div className="app" {...bindSwipe()}>
            <BoardView swipeDirection={swipeDirection} swiped={swiped} />
        </div>
    );
};

export default App;