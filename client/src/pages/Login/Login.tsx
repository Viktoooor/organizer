import { useContext, useState } from "react";
import { Button, Form, Input, Icon } from "semantic-ui-react";
import { Context } from "../../index";
import MyMessage from "../../components/UI/message/MyMessage";

const Login = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<JSX.Element>()
    const [loading, setLoading] = useState<boolean>(false)
    
    const {store} = useContext(Context)

    const loginFunction = async() => {
        setLoading(true)
        const response = await store.login(email, password)
        if(response === true){
            setError(MyMessage(true, false, "You successfuly logined to your account"))
            setTimeout(() => window.location.reload(), 1000)
        }else{
            setError(MyMessage(true, true, response))
        }
        setLoading(false)
    }

    return(
        <div className="login">
            <Form className="loginForm">
                <Form.Field>
                    {error}
                </Form.Field>
                <Form.Field>
                    <h1>Log In</h1>
                </Form.Field>
                <Form.Field>
                    <Input iconPosition='left' placeholder='Email'>
                        <Icon name='at' />
                        <input type="email" onChange={e => setEmail(e.target.value)}/>
                    </Input>
                </Form.Field>
                <Form.Field>
                    <Input iconPosition='left' placeholder='Password'>
                        <Icon name="key" />
                        <input type="password" onChange={e => setPassword(e.target.value)}/>
                    </Input>
                </Form.Field>
                <Form.Field>
                    <Button 
                        type="submit" 
                        positive 
                        onClick={loginFunction} 
                        loading={loading}
                    >
                        Log In
                    </Button>
                </Form.Field>
                <Form.Field>
                    <p>
                        Haven't registered yet? <a href="/register">Sign Up</a>
                    </p>
                    <p>
                        Forgot password? <a href="/forgotPass">Change password</a>
                    </p>
                </Form.Field>
            </Form>
        </div>
    )
}

export default Login