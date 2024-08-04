import { Link } from "react-router-dom";

export const Home = () => {
    return(
        <div className="home">
            <h1>Lucky Digger: Free Online Casino Games</h1>
            <h2>Play <Link to="/mines"><span>Mines</span></Link> & <Link to="/dice"><span>Dice</span></Link> now</h2>
            <div className="images-container">
                <img src="./public/mines_snip.png" className="images" />
                <img src="./public/dice_snip.png" className="images" />
            </div>
        </div>
    )
}