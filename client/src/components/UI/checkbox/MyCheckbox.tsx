import { FC } from "react"
import { Form, Checkbox } from "semantic-ui-react"

interface ICheckbox {
    value: string
    onClick: any
}

const MyCheckbox:FC<ICheckbox> = (props) => {
    const showPass = () => {
        if(props.value === "password"){
            return "text"
        }else{
            return "password"
        }
    }

    return(
        <Form.Field>
            <Checkbox label="Show password" onClick={() => props.onClick(showPass)} />
        </Form.Field>
    )
}

export default MyCheckbox