import { useRef } from "react";

interface Props {
    value: number,
    index: number,
    balance: number,
    amount: number,
    mines: number,
    betAmount: number,
    tilesClicked: number,
    gameStarted: boolean,
    setBalance: React.Dispatch<React.SetStateAction<number>>,
    setBetAmount: React.Dispatch<React.SetStateAction<number | undefined>>,
    setGameStarted: React.Dispatch<React.SetStateAction<boolean>>,
    setTilesClicked: React.Dispatch<React.SetStateAction<number>>
    setMultiplierValue: React.Dispatch<React.SetStateAction<number | undefined>>
}

export const Card = (props: Props) => {
    const mineRef = useRef<any>();

    const value = props.value;
    const index = props.index;
    const amount = props.amount;
    const tilesClicked = props.tilesClicked;
    const gameStarted = props.gameStarted;
    const mines = props.mines;

    const setBetAmount = props.setBetAmount;
    const setGameStarted = props.setGameStarted;
    const setTilesClicked = props.setTilesClicked;
    const setMultiplierValue = props.setMultiplierValue;

    const wonBet = () => {
        setTilesClicked(tilesClicked + 1);
        const rewardRate = 0.1;
        const multiplier  = (1 + rewardRate)**tilesClicked;
        const reward = amount * multiplier;
        const probSafeTile = (25 - tilesClicked - mines)/(25 - tilesClicked);
        const temp = probSafeTile * reward;
        setBetAmount(temp);
        mineRef.current.className = "mines-card-safe-clicked"
    }
    const lostBet = () => {
        setTilesClicked(0);
        setGameStarted(false);
        setMultiplierValue(undefined);
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