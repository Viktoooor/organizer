import { FC, RefObject } from "react";
import { useState, useRef } from "react";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import MyText from "../text/MyText";
import timeParser from "../../timeParser";
import { IObjects } from "../../../models/IObjects";
import { Icon } from "semantic-ui-react";

interface ObjItem {
    obj:IObjects
    remove: Function
    rename: Function
}

const MyRow:FC<ObjItem> = ({obj, remove, rename}) => {

    const [timeObj, setTimeObj] = useState(<div>{obj.time}</div>) 
    const [subjectObj, setSubjectObj] = useState(<div>{obj.subject}</div>)
    const renameTimeRef = useRef() as RefObject<DateTimePickerComponent>
    const renameSubjectRef = useRef<HTMLInputElement>()
    
    const renameTime = () => {
        if(timeObj.type === "div"){
            setTimeObj(
                <DateTimePickerComponent 
                    ref={renameTimeRef}
                    format={'dd MMM HH:mm'} 
                    min={new Date()}
                />
            )
        }else{
            let timeRef = timeParser(renameTimeRef.current?.value, false)
            if(timeRef){
                obj.time = timeRef
                obj.timeCode = Date.parse(timeRef.toString())
            }         
            setTimeObj(<div>{obj.time}</div>)
            rename()
        }
    }

    const renameSubject = () => {
        if(subjectObj.type === "div"){
            setSubjectObj(<MyText subject={renameSubjectRef} value={obj.subject} />)
        }else{
            let subjectInput = renameSubjectRef.current?.value
            obj.subject = subjectInput
            setSubjectObj(<div>{obj.subject}</div>)
            rename()
        }
    }

    const renameStatus = () => {
        obj.status = "Processing"
        rename()
    }

    return(
        <tr>
            <td className="time">
                <div>
                    {timeObj}
                    <div onClick={renameTime}><Icon name="pencil"/></div>
                </div>
            </td>
            <td className="subject">
                <div>
                    {subjectObj}
                    <div onClick={renameSubject}><Icon name="pencil"/></div>
                </div>
            </td>
            <td className="status">
                {obj.status}
                {obj.status === "Not started"
                    ?<button className="submit" onClick={() => renameStatus()}>Start</button>
                    :<div></div>
                }
            </td>
            <td>
                <button className="submit" onClick={() => remove(obj)}>Done</button>
            </td>
        </tr>
    )
}

export default MyRow