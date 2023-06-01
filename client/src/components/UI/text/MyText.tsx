import { FC } from "react";

interface IText{
    subject: any
    value: string | undefined
}

const MyText: FC<IText> = ({subject, value}) => {
    return(
            <textarea 
                className="textArea" 
                rows={2} 
                placeholder='Subject' 
                ref={subject}
                defaultValue={value}
            />
    )
}

export default MyText