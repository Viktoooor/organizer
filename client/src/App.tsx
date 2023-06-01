import { useContext, useEffect, useState} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/UI/navbar/Navbar';
import AppRouter from './router/AppRouter';
import { Context } from '.';

const App = () => {
    const [logged, setLogged] = useState<boolean | undefined>()
    const [loading, setLoading] = useState<boolean>(true)

    const {store} = useContext(Context)

    useEffect(() => {
        async function AppStart() {
            if (localStorage.getItem('token')) {
                await store.checkAuth()
                if(store.isAuth){
                    setLogged(true)
                }else{
                    setLogged(false)
                    localStorage.removeItem('token')
                }
            }else{
                setLogged(false)
            }
            setLoading(false)
        }

        AppStart()
    }, [])

    if(loading === true){
        return <div className="load mainLoad">Loading<span className="loader"></span></div>
    }

    return (
        <BrowserRouter>
            <Navbar logged={logged}/>
            <AppRouter logged={logged}/>
        </BrowserRouter>
    );
};

export default App;
