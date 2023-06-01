import { FC } from "react";
import { IObjects } from "../../../models/IObjects";
import MyRow from "../row/MyRow";

interface ObjectList {
    obj: IObjects[]
    sort: Function
    remove: Function
    rename: Function
}

const MyTable: FC<ObjectList> = ({obj, sort, remove, rename}) => {
    return(
        <table className='table'>
            <thead>
            <tr>
                <th className="time" onClick={() => sort()}>Time</th>
                <th className="subject">Subject</th>
                <th className="status">Status</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {obj.map(obj => <MyRow 
                                    obj={obj} 
                                    key={obj._id} 
                                    remove={() => remove(obj)}
                                    rename={() => rename()}
                                />
                        )
                }
            </tbody>
        </table>
    )
}

export default MyTable