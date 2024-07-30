import { Link } from "react-router-dom";

export const Navbar = () => {
    return(
        <nav className="navbar">
            <Link to="/"><p>Lucky Digger</p></Link>
            <Link to="/dice"><p>Play Dice</p></Link>
        </nav>
    )
}