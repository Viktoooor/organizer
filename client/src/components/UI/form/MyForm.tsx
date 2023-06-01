import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import MyText from "../text/MyText";

const MyForm = (props:any) => { 
    return(
        <div className="top">
            <div className='datePicker'>
                <DateTimePickerComponent 
                    style={{height:'50px'}} 
                    min={new Date()} 
                    ref={props.time}
                    format={'dd MMM HH:mm'}
                />
            </div>
            <div className="form">
                <MyText subject={props.subject} value={""}/>
                <button className="submit" type="submit" onClick={() => props.add()}>Add</button>
            </div>
        </div>
    )
}

export default MyForm