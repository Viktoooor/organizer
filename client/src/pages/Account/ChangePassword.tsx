import axios from "axios";
import { useContext, useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { Context } from "../..";
import MyCheckbox from "../../components/UI/checkbox/MyCheckbox";
import MyMessage from "../../components/UI/message/MyMessage";

const ChangePassword = () => {
    const {store} = useContext(Context)

    const [oldPassword, setOldPassword] = useState<string>()
    const [newPassword, setNewPassword] = useState<string>()
    const [inputDisabled, setInputDisabled] = useState<boolean>(true)
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true)
    const [error, setError] = useState<JSX.Element>()
    const [showPassword, setShowPassword] = useState<string>("password")
    const [oldLoading, setOldLoading] = useState<boolean>(false)
    const [newLoading, setNewLoading] = useState<boolean>(false)

    const checkPassword = async() => {
        try {
            setOldLoading(true)
            await axios.post(`${process.env.REACT_APP_API_URL}/api/checkPassword/${store.user.id}`, {data: oldPassword})
            setInputDisabled(false)
            setOldLoading(false)
            setError(MyMessage(false))
        } catch (e) {
            setOldLoading(false)
            setError(MyMessage(true, true, "Invalid password"))
        }
    }

    const changePassword = async() => {
        try {
            setNewLoading(true)
            await axios.post(`${process.env.REACT_APP_API_URL}/api/changePassword/${store.user.id}`, {data: newPassword})
            setError(MyMessage(true, false, "You successfully changed your password"))
            setNewLoading(false)
            
            setTimeout(async() => {
                await store.logout()
                window.location.reload()
            }, 1000)
        } catch (e) {
            setNewLoading(false)
            setError(MyMessage(true, true, "Unexpected error"))
        }
    }

    const inputChange = (value: string) => {
        setNewPassword(value)
        const reg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if(reg.test(String(value))){
            setSubmitDisabled(false) 
        }
        if(!reg.test(String(value))){
            setSubmitDisabled(true)
        }
    }

    return(
        <div className="changeInfo">
            <Form className="changeForm">
                {error}
                <Form.Field>
                    <label>Old password</label>
                    <Input 
                        placeholder="Old password" 
                        onChange={e => setOldPassword(e.target.value)} 
                        type={showPassword}
                    />
                </Form.Field>
                <Form.Field>
                    <Button type="submit" onClick={checkPassword} loading={oldLoading}>
                        Check
                    </Button>
                </Form.Field>
                <Form.Field>
                    <label>New password</label>
                    <Input 
                        disabled={inputDisabled} 
                        placeholder="New password" 
                        onChange={e => inputChange(e.target.value)} 
                        type={showPassword}
                    />
                </Form.Field>
                <Form.Field>
                    <Button 
                        disabled={submitDisabled} 
                        onClick={changePassword} 
                        type="submit"
                        loading={newLoading}
                    >
                        Change password
                    </Button>
                </Form.Field>
                <MyCheckbox value={showPassword} onClick={setShowPassword} />
            </Form>
        </div>
    )
}

export default ChangePassword