import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { Context } from "../..";

const Account = () => {
    const {store} = useContext(Context)
    const history = useHistory()

    return(
        <div className="accountInfo">
            <h2>Account information:</h2>
            <div className="profilePicture" onClick={() => history.push('/account/foto')}>
                <div className="header">
                    Profile picture
                </div>
                <div className="info">
                    You can personalize your account with a photo
                </div>
                <img 
                        src={`${process.env.REACT_APP_API_URL}/${store.user.picture}`} 
                        className="picture" 
                        alt="Your avatar" 
                />
            </div>
            <div className="accountField" onClick={() => history.push("/account/change")}>
            <div className="header">Bio</div>
                <div className="info">
                    {store.user.bio}
                </div>
            </div>
            <div className="accountField">
                <div className="header">E-mail</div>
                <div className="info">
                    {store.user.email}
                </div>
            </div>
            <div className="accountField" onClick={() => history.push("/account/change")}>
                <div className="header">Username</div>
                <div className="info">
                    {store.user.userName}
                </div>
                <Icon name="chevron right"/>
            </div>
            <div className="accountField" onClick={() => history.push("/account/change")}>
                <div className="header">Date</div>
                <div className="info">
                    {store.user.dateOfBirth}
                </div>
                <Icon name="chevron right"/>
            </div>
            <div className="accountField" onClick={() => history.push("/account/change")}>
                <div className="header">Gender</div>
                <div className="info">
                    {store.user.sex}
                </div>
                <Icon name="chevron right"/>
            </div>
            <div className="accountField" onClick={() => history.push("/account/password")}>
                <div className="header">Password</div>
                <div className="info">
                    *********
                </div>
                <Icon name="chevron right"/>
            </div>
        </div>
    )
}

export default Account