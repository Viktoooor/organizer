import { Message } from "semantic-ui-react";

const MyMessage = (visible:boolean, error:boolean = true, message:string = "") => {
    if(error === true){
        return(
            <Message visible={visible} error header="Error" content={message} />
        )
    }else{
        return(
            <Message visible={visible} success header="Success" content={message} />
        )
    }
}

export default MyMessage