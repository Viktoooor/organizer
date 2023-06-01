import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import { RefObject, useContext, useRef, useState } from "react";
import { Button, Form, Input, Dropdown } from "semantic-ui-react";
import { Context } from "../..";
import timeParser from "../../components/timeParser";
import MyMessage from "../../components/UI/message/MyMessage";

const ChangeInfo = () => {
    const options = [
        { key: 'm', text: 'Male', value: 'Male' },
        { key: 'f', text: 'Female', value: 'Female' },
        { key: 'o', text: 'Other', value: 'Other' },
    ]

    const {store} = useContext(Context)
    const timeRef = useRef() as RefObject<DatePickerComponent>
    const [user, setUser] = useState(store.user.userName)
    const [bio, setBio] = useState(store.user.bio)
    const [gender, setGender] = useState<any>(store.user.sex)
    const [submitLoading, setSubmitLoading] = useState<boolean>(false)
    const [error, setError] = useState<JSX.Element>()

    const changeFunction = async() => {
        try {
            setSubmitLoading(true)
            let time = timeParser(timeRef.current?.value, true)
            if(gender === undefined){
                setGender(store.user.sex)
            }
            if(time === undefined){
                time = store.user.dateOfBirth
            }
            if(user === undefined){
                setUser(store.user.userName) 
            }
            if(bio === undefined){
                setBio(store.user.bio)
            }
            const userData = {
                userName: user,
                dateOfBirth: time,
                sex: gender,
                email: store.user.email,
                bio: bio
            }
            store.user.userName = user
            store.user.dateOfBirth = time
            store.user.sex = gender
            store.user.bio = bio
            await axios.post(`${process.env.REACT_APP_API_URL}/api/changeInfo/${store.user.email}`, userData)
            setSubmitLoading(false)
            setError(MyMessage(true, false, "You successfully changed your info"))
        } catch (e) {
            setSubmitLoading(false)
            setError(MyMessage(true ,true, "Unexpected error"))
        }
    }

    return(
        <div className="changeInfo">
            <Form className="changeForm">
            {error}
                <Form.Field>
                    <label>Username</label>
                    <Input 
                        type="text" 
                        placeholder="Username" 
                        value={user}
                        onChange={e => setUser(e.target.value)} 
                    />
                </Form.Field>
                <Form.Field>
                    <label>Bio</label>
                    <Input 
                        type="text" 
                        placeholder="Bio" 
                        value={bio}
                        onChange={e => setBio(e.target.value)} 
                    />
                </Form.Field>
                <Form.Field>
                    <label>Date of birth</label>
                    <DatePickerComponent 
                        placeholder="Date of birth" 
                        ref={timeRef} 
                        format={'dd.MM.yyyy'} 
                        max={new Date()}
                    />
                </Form.Field>
                <Form.Field>
                    <Dropdown
                        options={options}
                        selection
                        label="Gender"
                        placeholder="Gender"
                        value={gender}
                        onChange={(event, data) => setGender(data.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <Button type="submit" onClick={changeFunction} loading={submitLoading}>
                        Submit
                    </Button>
                </Form.Field>
            </Form>
        </div>
    )
}

export default ChangeInfo