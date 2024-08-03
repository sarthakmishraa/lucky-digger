import { useRef } from "react";

interface Props {
    value: number,
    index: number,
    balance: number,
    amount: number,
    betAmount: number,
    minesClicked: number,
    gameStarted: boolean,
    setBalance: React.Dispatch<React.SetStateAction<number>>,
    setBetAmount: React.Dispatch<React.SetStateAction<number | undefined>>,
    setGameStarted: React.Dispatch<React.SetStateAction<boolean>>,
    setMinesClicked: React.Dispatch<React.SetStateAction<number>>
}

export const Card = (props: Props) => {
    const mineRef = useRef<any>();

    const value = props.value;
    const index = props.index;
    const betAmount = props.betAmount;
    const minesClicked = props.minesClicked;
    const gameStarted = props.gameStarted;

    const setBetAmount = props.setBetAmount;
    const setGameStarted = props.setGameStarted;
    const setMinesClicked = props.setMinesClicked;

    const wonBet = () => {
        setBetAmount(betAmount + 1);
        setMinesClicked(minesClicked + 1);
        mineRef.current.className = "mines-card-safe-clicked"
    }
    const lostBet = () => {
        setMinesClicked(0);
        setGameStarted(false);
    }

    return(
        <div className="mines-card">
            {
                gameStarted && value === 1 ? (
                    <div
                        id={index.toString()}
                        onClick={wonBet}
                        className="mines-card-safe"
                        ref={mineRef}
                    >
                    </div>
                ):(
                    <div onClick={lostBet} className="mines-card-bomb"></div>
                )
            }
        </div>
    )
};