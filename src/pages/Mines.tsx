import { useState, useRef } from "react";
import { Card } from "../components/Card";

export const Mines = () => {
    const [amount, setAmount] = useState<number | undefined>(1);
    const [balance, setBalance] = useState<number>(3000);
    const [mines, setMines] = useState<number>(1);
    const [arr, setArr] = useState<number[]>(Array(25).fill(1));
    const [gameStarted, setGameStarted] = useState<boolean>(false);

    const amountRef = useRef<any>();

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
    }

    const handleSubmit = (event: any) => {
        event?.preventDefault();
        canvasArr();
        setGameStarted(true);
    };

    return(
        <>
            <div>
                <h1>Mines</h1>
                <h2>Balance: { balance }</h2>
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
                                    defaultValue={1}
                                    disabled={gameStarted}
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
                                    max={24}
                                    defaultValue={1}
                                    disabled={gameStarted}
                                />
                            </div>
                        </div>
                        <div>
                            <button type="submit" disabled={gameStarted} >Play</button>
                        </div>
                    </form>
                </div>
                <div className="mines-game">
                    {
                        gameStarted && arr.map((value: number) => <Card value={value} />)
                    }
                </div>
            </div>
        </>
    )
}