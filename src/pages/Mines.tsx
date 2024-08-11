import { useState, useRef, useEffect } from "react";
import { Card } from "../components/Card";

export const Mines = () => {
    const [amount, setAmount] = useState<number | undefined>();
    const [betAmount, setBetAmount] = useState<number | undefined>(amount);
    const [balance, setBalance] = useState<number>(3000);
    const [mines, setMines] = useState<number>(1);
    const [arr, setArr] = useState<number[]>(Array(25).fill(1));
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [tilesClicked, setTilesClicked] = useState<number | undefined>(1);
    const [multiplierValue, setMultiplierValue] = useState<number | undefined>();

    const amountRef = useRef<any>();
    const dialogRef = useRef<any>();

    const modifyAmount = (multiplier: number) => {
        if (amount && amount*multiplier<=100 && amount*multiplier>=1){
            amountRef.current.value = amount*multiplier;
            setAmount(amount*multiplier);
        };
    };

    const canvasArr = () => {
        let array = Array(25).fill(1);
        const randomIndices: Set<number> = new Set<number>();

        // generating unique indices to set bombs
        while (randomIndices.size < mines) {
            const randomIndex = Math.floor(Math.random() * 25);
            randomIndices.add(randomIndex);
        };

        // set => array
        randomIndices.forEach(index => {
            array[index] = 0;
        });

        setArr(array);
    };

    const cashoutBetAmount = () => {
        if(betAmount) {
            setBalance(balance + betAmount);
            setTilesClicked(0);
            setGameStarted(false);
            setMultiplierValue(undefined);
        }
    }

    const handleSubmit = (event: any) => {
        event?.preventDefault();
        if(amount) {
            if(amount>balance){
                alert("Insufficient funds");
            }
            else{
                setBalance(balance - amount);
                setBetAmount(amount);
                canvasArr();
                setGameStarted(true);
            }
        }    
    };

    const openHowToPlay = () => {
        dialogRef.current.show();
    };

    const closeHowToPlay = () => {
        dialogRef.current.close();
    };

    useEffect(() => {
        if(tilesClicked) {
            const rewardRate = 0.1;
            const multiplier  = (1 + rewardRate)**tilesClicked;
            setMultiplierValue(multiplier);
        }
    }, [tilesClicked])

    return(
        <>
            <div>
                <h1>Mines</h1>
                <h2 className="how-to-play" onClick={openHowToPlay}>How to play?</h2>
                <dialog className="how-to-play-dialog" ref={dialogRef} >
                    <div className="how-to-play-dialog-heading">
                        <h3>HOW TO PLAY MINES ?</h3>
                        <button onClick={closeHowToPlay}>Close</button>
                    </div>
                    <img width={400} height={400} src="./mines_snip.png" />
                    <p>Each tile hides either a safe tile(green) or a mine (red)</p>
                    <p>
                        To boost your chances of winning and earn larger prizes,
                        expand the safe playing area. You can choose to collect your winnings by
                        cashing out after each round or continue playing for a potentially bigger payout.
                    </p>
                </dialog>
                
                <h2>Balance: { balance } USD</h2>
            </div>
            <div className="mines-container">
                <div className="mines-sidebar">
                    <form onSubmit={handleSubmit} >
                        <div className="mines-sidebar-elements">
                            <div className="mines-sidebar-element">
                                <label className="mines-sidebar-amount">Amount: </label>
                                <input
                                    type="number"
                                    onChange={(event) => setAmount(parseInt(event.target.value))}
                                    placeholder="Amount here"
                                    ref={amountRef}
                                    min={1}
                                    max={100.0}
                                    // defaultValue={1}
                                    disabled={gameStarted}
                                    required
                                />
                                <span
                                    className="amount-multiplier"
                                    onClick={() => modifyAmount(0.5)}
                                    hidden={gameStarted}
                                >
                                    1/2
                                </span>
                                <span
                                    className="amount-multiplier"
                                    onClick={() => modifyAmount(2)}
                                    hidden={gameStarted}
                                >
                                    x2
                                </span>
                            </div>
                            <div className="mines-sidebar-element">
                                <label className="mines-sidebar-amount">Mines: </label>
                                <input
                                    type="number"
                                    onChange={(event) => setMines(parseInt(event.target.value))}
                                    placeholder="Mines here"
                                    min={1}
                                    max={20}
                                    defaultValue={1}
                                    disabled={gameStarted}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <button type="submit" disabled={gameStarted} >Play</button>
                            {
                                gameStarted &&
                                <button disabled={!gameStarted} onClick={cashoutBetAmount} >Cashout {betAmount?.toFixed(2)} USD</button> 
                            }
                            
                        </div>
                        {
                            gameStarted && multiplierValue && 
                            <h3>Next: {multiplierValue?.toFixed(2)}x</h3>
                        }
                    </form>
                </div>
                <div className="mines-game">
                    {
                        gameStarted && arr.map((value: number, index: number) => 
                            <Card
                                key={index}
                                value={value}
                                index={index}
                                balance={balance}
                                mines={mines}
                                tilesClicked={tilesClicked as number}
                                amount={amount as number}
                                betAmount={betAmount as number}
                                gameStarted={gameStarted}
                                setBalance={setBalance}
                                setBetAmount={setBetAmount}
                                setGameStarted={setGameStarted as React.Dispatch<React.SetStateAction<boolean>>}
                                setTilesClicked={setTilesClicked as React.Dispatch<React.SetStateAction<number>>}
                                setMultiplierValue={setMultiplierValue as React.Dispatch<React.SetStateAction<number | undefined>>}
                            />
                        )
                    }
                </div>
            </div>
        </>
    )
}