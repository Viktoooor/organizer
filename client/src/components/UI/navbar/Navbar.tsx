import { FC,useState, useContext, useEffect } from "react";
import { Context } from "../../..";
import {NavbarLogged, NavbarNotLogged} from "./NavbarElements"

interface INav {
    logged: boolean | undefined
}

const Navbar:FC<INav> = ({logged}) => {   
    const {store} = useContext(Context)

    const [right, setRight] = useState<JSX.Element>()

    useEffect(() => {
        function waitForObjects(){
              if(logged === true){
                setRight(<NavbarLogged logout={() => store.logout()}/>)
              }else{
                setRight(<NavbarNotLogged/>)
              }
        }
      
        waitForObjects()
    }, [])

    return(
        <div className="navbar">
            <div className="navbar__links">
                {right}
            </div>
        </div>
    )
}

export default Navbar