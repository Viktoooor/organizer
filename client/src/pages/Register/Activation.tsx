import { Link } from "react-router-dom"

const Activation = () => {
    return(
        <div className="activation">
            <h1>You need to activate your account</h1>
            <h4>
                After you activated your account <Link to="/login">Log In</Link>
            </h4>
        </div>
    )
}

export default Activation