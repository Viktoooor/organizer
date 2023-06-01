import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Input } from "semantic-ui-react";
import { Context } from "../..";
import MyMessage from "../../components/UI/message/MyMessage";

const ForgotPass = () => {
    const {store} = useContext(Context)
    const history = useHistory()

    const [email, setEmail] = useState<string>()
    const [nextDisabled, setNextDisabled] = useState<boolean>(true)
    const [nextLoading, setNextLoading] = useState<boolean>(false)
    const [error, setError] = useState<JSX.Element>()

    const inputChange = (value:string) => {
        setEmail(value)
        const reg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if(reg.test(String(value).toLowerCase())){
            setNextDisabled(false)
        }
        if(!reg.test(String(value).toLowerCase())){
            setNextDisabled(true)
        }
    }

    const next = async() => {
        try {
            setNextLoading(true)
            await axios.get(`${process.env.REACT_APP_API_URL}/api/forgotPassword/${email}`)
            store.setMail(email)
            setNextLoading(false)
            history.push("/forgotPass/code")
        } catch (e) {
            setNextLoading(false)
            setError(MyMessage(true, true, "Invalid email"))
        }
    }

    return(
        <div className="changeInfo">
            <Form className="changeForm">
                {error}
                <Form.Field>
                    <label>Your email</label>
                    <Input 
                        placeholder="Enter your email" 
                        type="email" 
                        onChange={e => inputChange(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Button 
                        type="submit" 
                        primary 
                        disabled={nextDisabled} 
                        onClick={next}
                        loading={nextLoading}
                    >
                        Next
                    </Button>
                </Form.Field>
            </Form>
        </div>
    )
}

export default ForgotPass