interface Props {
    value: number,
    balance: number,
    amount: number,
    betAmount: number,
    setBalance: any,
    setBetAmount: any,
    setGameStarted: React.Dispatch<React.SetStateAction<boolean>>
}

export const Card = (props: Props) => {
    const value = props.value;
    const betAmount = props.betAmount;

    const setBetAmount = props.setBetAmount;
    const setGameStarted = props.setGameStarted;

    const wonBet = () => {
        setBetAmount(betAmount + 1);
    }
    const lostBet = () => {
        setGameStarted(false);
    }
    return(
        <div className="mines-card">
            {
                value === 1 ? (
                    <div onClick={wonBet} className="mines-card-safe"></div>
                ):(
                    <div onClick={lostBet} className="mines-card-bomb"></div>
                )
            }
        </div>
    )
};