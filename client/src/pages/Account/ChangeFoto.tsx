import React, { useContext, useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import axios from "axios";
import { Context } from "../..";
import MyMessage from "../../components/UI/message/MyMessage";

const ChangeFoto = () => {
    const {store} = useContext(Context)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [changeLoading, setChangeLoading] = useState<boolean>(false)
    const [error, setError] = useState<JSX.Element>()

    const submitPhoto = async() => {
        if(selectedFile!=null){
            const formData = new FormData();
            formData.append("picture", selectedFile);
            try {
                setChangeLoading(true)
                await axios({
                    method: "post",
                    url: `${process.env.REACT_APP_API_URL}/api/changePicture/${store.user.id}`,
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                });
                setError(MyMessage(true, false, "You successfuly changed your photo"))
                setChangeLoading(false)
            } catch(e) {
                setChangeLoading(false)
                setError(MyMessage(true, true, "Unexpected error"))
            }
        }
    }

    const fileHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            if(e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png"){
                setSelectedFile(e.target.files[0])
                setError(MyMessage(false))
            }else{
                setError(MyMessage(true, true, "Choose a picture!"))
            }
        }
    }

    return(
        <div className="changeInfo">
            <Form className="changeForm">
                {error}
                <Form.Field>
                    <label>Change profile picture</label>
                    <Input type="file" onChange={e => fileHandler(e)} />
                </Form.Field>
                <Form.Field>
                    <Button type="submit" onClick={submitPhoto} loading={changeLoading}>
                        Change
                    </Button>
                </Form.Field>
            </Form>
        </div>
    )
}

export default ChangeFoto