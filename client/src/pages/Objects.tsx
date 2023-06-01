import { RefObject, useContext } from "react";
import { useState, useRef, useEffect } from 'react';
import axios from 'axios'
import '../style/App.css';
import MyForm from '../components/UI/form/MyForm';
import MyTable from '../components/UI/table/MyTable';
import timeParser from '../components/timeParser';
import { IObjects } from "../models/IObjects";
import {  DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { Context } from "..";

const Objects = () => {
  const [obj, setObj] = useState<IObjects[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [load, setLoad] = useState(false)

  const {store} = useContext(Context)

  useEffect(() => {
    async function waitForObjects(){
      if(typeof store.user.id !== "undefined"){
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/objects/${store.user.id}`)
        const json = await response.json()
        setObj(json)
        setIsLoading(false)
        store.setAuth(true)
      }
      else{
        setTimeout(waitForObjects, 250);
      }
    }

    waitForObjects()
  },[load])

  const timeInputRef = useRef() as RefObject<DateTimePickerComponent>
  const subjectInputRef = useRef<HTMLInputElement>()

  const sortObj = () => {
    setObj([...obj].sort((a,b) => a["timeCode"] - b["timeCode"]))
  }

  const removeObj = (subj:IObjects) => {
    setObj(obj.filter((p:IObjects) => p._id !== subj._id))
    axios.put(`${process.env.REACT_APP_API_URL}/api/objects/${store.user.id}`, obj.filter((p:IObjects) => p._id !== subj._id))
  }

  const addNewObj = async() => {
    const temp = timeInputRef.current?.value
    const subject = subjectInputRef.current?.value
    if(temp){
      const newObj = {
        timeCode: Date.parse(temp.toString()),
        time: timeParser(temp, false),
        subject: subject,
        status: 'Not started'
      }
      await axios.post(`${process.env.REACT_APP_API_URL}/api/objects/${store.user.id}`, newObj)
      setIsLoading(true)
      load ? setLoad(false) : setLoad(true)
    }
  }

  const renameObj = () => {
    setObj([...obj])
    axios.put(`${process.env.REACT_APP_API_URL}/api/objects/${store.user.id}`, obj)
  }

  return (
    <div className='App'>
      <MyForm time={timeInputRef} subject={subjectInputRef} add={addNewObj}/>
      <MyTable 
        obj={obj}
        sort={sortObj}
        remove={removeObj}
        rename={renameObj}
      />
      {isLoading &&
       <div className="load">Loading<span className="loader"></span></div>
      }
    </div>
  );
}

export default Objects