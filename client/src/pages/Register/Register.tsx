import { useEffect, useState, useContext, ChangeEvent, FocusEvent } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { Context } from '../../index'
import MyMessage from "../../components/UI/message/MyMessage";
import MyCheckbox from "../../components/UI/checkbox/MyCheckbox";

const Register = () => {
    
    const check = <Icon name="check" color="green" style={{marginLeft: "10px"}}/>
    const cross = <Icon name="close" color="red" style={{marginLeft: "10px"}}/>
    

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [emailClean, setEmailClean] = useState<boolean>(false)
    const [passwordClean, setPasswordClean] = useState<boolean>(false)
    const [confirmClean, setConfirmClean] = useState<boolean>(false)
    const [emailError, setEmailError] = useState<JSX.Element>(cross)
    const [passwordError, setPasswordError] = useState<JSX.Element>(cross)
    const [confirmError, setConfirmError] = useState<JSX.Element>(cross)
    
    const [emailBlur, setEmailBlur] = useState<JSX.Element>(<span></span>)
    const [passwordBlur, setPasswordBlur] = useState<JSX.Element>(<span></span>)
    const [showPassword, setShowPassword] = useState<string>("password")
    const [error, setError] = useState<JSX.Element>()
    const [isLoading, setIsLoading] = useState(false)
    const [submitDisabled, setSubmitDisabled] = useState(true)
    

    const {store} = useContext(Context)
    const history = useHistory()

    useEffect(() => {
        const checkValidity = () => {
            if(emailClean && passwordClean && confirmClean){
                setSubmitDisabled(false)
            }else{
                setSubmitDisabled(true)
            }
        }

        checkValidity()
    }, [emailError, passwordError, confirmError])

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        const ereg = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if(ereg.test(String(e.target.value).toLowerCase())){
            setEmailError(check)
            setEmailClean(true)
            setEmailBlur(<span></span>)
        }
        if(!ereg.test(String(e.target.value).toLowerCase())){
            setEmailError(cross)
            setEmailClean(false)
        }
    }

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
        const preg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
        if(preg.test(String(e.target.value))){
            setPasswordError(check)
            setPasswordClean(true)
            setPasswordBlur(<span></span>)
        }
        if(!preg.test(String(e.target.value))){
            setPasswordError(cross)
            setPasswordClean(false)
        }
    }

    const confirmPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
        if(e.target.value === password){
            setConfirmError(check)
            setConfirmClean(true)
        }
        if(e.target.value !== password){
            setConfirmError(cross)
            setConfirmClean(false)
        }
    }

    const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
        if(e.target.type === "email"){
            if(!emailClean){
                setEmailBlur(<span style={{fontSize: "12px", color: "red"}}>Not correct email</span>)
            }
        }
        if(e.target.type === "password"){
            if(!passwordClean){
                setPasswordBlur(
                    <span style={{fontSize: "12px", color: "red"}}>
                        Must contain at least one  number and one uppercase and lowercase letter,
                        and at least 8 or more characters
                    </span>
                )
            }
        }
    }

    const registerFunction = async() => {
        setIsLoading(true)
        const response = await store.registration(email, password)
        if(response === true){
            history.push("/activation")
            return true
        }else{
            setError(MyMessage(true, true, response))
        }
        setIsLoading(false)
        setSubmitDisabled(true)
    }

    return(
        <div className="login">
            <Form className="loginForm">
                <Form.Field>
                    {error}
                </Form.Field>
                <Form.Field>
                    <h1>Register</h1>
                </Form.Field>
                <Form.Field>
                    <Input iconPosition="left" placeholder='Email' style={{width:"90%"}}>
                        <Icon name='at' />
                        <input 
                            type="email" 
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            value={email}
                            onChange={emailHandler}
                            onBlur={blurHandler}
                        />
                    </Input>
                    {emailError}
                    {emailBlur}
                </Form.Field>
                <Form.Field>
                    <Input iconPosition='left' placeholder='Password' style={{width:"90%"}}>
                        <Icon name="key" />
                        <input 
                            type={showPassword} 
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            value={password}
                            onChange={passwordHandler}
                            onBlur={blurHandler}
                        />
                    </Input>
                    {passwordError}
                    {passwordBlur}
                </Form.Field>
                <Form.Field>
                    <Input iconPosition='left' placeholder='Confirm password' style={{width:"90%"}}>
                        <Icon name="key" />
                        <input 
                            type={showPassword} 
                            value={confirmPassword} 
                            onChange={confirmPasswordHandler}
                        />
                    </Input>
                    {confirmError}
                </Form.Field>
                <MyCheckbox value={showPassword} onClick={setShowPassword} />
                <Button
                    type="submit" 
                    primary 
                    onClick={registerFunction}
                    loading={isLoading}
                    disabled={submitDisabled}
                >
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}

export default Register