import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Input } from "semantic-ui-react";
import { Context } from "../..";
import MyMessage from "../../components/UI/message/MyMessage";

const ForgotPassCode = () => {
    const {store} = useContext(Context)
    const history = useHistory()

    const [code, setCode] = useState<string>()
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true)
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [error, setError] = useState<JSX.Element>()

    const codeChange = (value:string) => {
        setCode(value)
        const reg = /^[0-9]{6,6}$/
        if(reg.test(String(value))){
            setSubmitDisabled(false)
        }else{
            setSubmitDisabled(true)
        }
    }

    const submit = async() => {
        try {
            if(code){
                setSubmitLoading(true)
                await axios.post(`${process.env.REACT_APP_API_URL}/api/checkCode/${store.tempMail}`, {data: parseInt(code)})
                setSubmitLoading(false)
                history.push("/login")
            }
        } catch (e) {
            setSubmitLoading(false)
            setError(MyMessage(true, true, "Invalid code"))
        }
    }

    return(
        <div className="changeInfo">
            <Form className="changeForm">
                {error}
                <Form.Field>
                    <label>Code</label>
                    <Input 
                        placeholder="Enter your code" 
                        type="number" 
                        onChange={e => codeChange(e.target.value)} 
                    />
                </Form.Field>
                <Form.Field>
                    <Button 
                        loading={submitLoading} 
                        type="submit" 
                        primary 
                        disabled={submitDisabled} 
                        onClick={submit}
                    >
                        Submit
                    </Button>
                </Form.Field>
            </Form>
        </div>
    )
}

export default ForgotPassCode