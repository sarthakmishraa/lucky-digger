import { useState, useEffect, useRef } from "react";

export const Dice = () => {
    const [amount, setAmount] = useState<number | undefined>(1);
    const [winChance, setWinChance] = useState<number | undefined>(50);
    const [winnings, setWinnings] = useState<number | undefined>();
    const [balance, setBalance] = useState<number>(3000);
    const [winningAmount, setWinningAmount] = useState<number | undefined>();
    const amountRef = useRef<any>();

    const modifyAmount = (multiplier: number) => {
        if (amount && amount*multiplier<=100 && amount*multiplier>1){
            amountRef.current.value = amount*multiplier;
            setAmount(amount*multiplier);
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const random: number = Math.floor((Math.random() * 100));

        if(amount && winChance && winnings) {
            if(random >= winChance) {
                setBalance(balance - amount);
                setWinningAmount(amount);
            }
            else if(random < winChance) {
                setBalance(balance + winnings);
                setWinningAmount(amount + winnings);
            }
        }
    };

    useEffect(() => {
        if(amount && winChance) {
            for (let i = 2; i < 99; i++) {
                const temp = (100/winChance) * amount * 0.99 - amount;
                setWinnings(temp);
            }
        }
    }, [winChance, amount]);

    // to fix result changing on amount change after a bet bug
    useEffect(() => {
        setWinningAmount(undefined);
    }, [amount])

    return(
        <div>
            <div>
                <div>
                    <h2>Dice</h2>
                    <h1>Balance: { balance }</h1>
                </div>
                <div className="dice-container">
                    <div className="dice-sidebar">
                        <form onSubmit={handleSubmit} >
                            <div>
                                <label className="dice-sidebar-amount">Amount: </label>
                                <input
                                    type="number"
                                    onChange={(event) => setAmount(parseInt(event.target.value))}
                                    placeholder="Amount here"
                                    ref={amountRef}
                                    min={1}
                                    max={100.0}
                                    defaultValue={1}
                                />
                                <span
                                    className="amount-multiplier"
                                    onClick={() => modifyAmount(0.5)}
                                >
                                    1/2
                                </span>
                                <span
                                    className="amount-multiplier"
                                    onClick={() => modifyAmount(2)}
                                >
                                    x2
                                </span>
                            </div>
                            <div>
                                <button type="submit">Play</button>
                            </div>
                        </form>
                    </div>
                    <div className="dice-game">
                        <input
                            type="range"
                            onChange={(event) => setWinChance(100 - parseInt(event.target.value))}
                            min={2}
                            max={98}
                        />
                        <div className="dice-game-stats">
                            <div>
                                <label>Win Chance: </label>
                                <span>{ winChance } %</span>
                            </div>
                            <div>
                                <label>Net Gain on Win: </label>
                                <span>{ winnings?.toFixed(2) }</span>
                            </div>
                        </div>
                        <div className="dice-game-result">
                            {
                                winningAmount && (
                                    amount && winningAmount>amount ?
                                    (
                                        <p className="dice-game-result-won">You won {winningAmount}</p>
                                    ):(
                                        <p className="dice-game-result-lost">You lost {winningAmount}</p>
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}