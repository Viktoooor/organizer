import { FC } from "react"
import { Link } from "react-router-dom"
import { Icon } from "semantic-ui-react"

interface INavbarLogged{
    logout: Function
}

export const NavbarLogged:FC<INavbarLogged> = ({logout}) => {
    return(
        <div className="navbar__links">
            <div className="navbar__element">
                <Link to="/">Main</Link>
                <Link to="/objects">Objects</Link>
            </div>
            <div className="navbar__element">
                <Link to="/account">Account<Icon name="user circle"/></Link>
                <a href="/login" onClick={() => logout()}>Logout<Icon name="log out"/></a>
            </div>
        </div>
    )
}

export const NavbarNotLogged = () => {
    return(
        <div className="navbar__links">
            <div className="navbar__element">
                <Link to="/">Main</Link>
            </div>
            <div className="navbar__element">
                <Link to="/login">Log In</Link>
                <Link to="/register">Sign Up</Link>
            </div>
        </div>
    )
}