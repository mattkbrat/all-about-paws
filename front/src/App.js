import './App.css'
import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './client'

import {Route, Routes} from "react-router-dom";
import Login from './pages/auth/Login'
import Logout from "./pages/auth/Logout";
import Account from './pages/auth/Account'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SubmitPet from "./pages/SubmitPet";
import Schedule from './pages/Schedule';
import Contact from './pages/Contact';
import {ItemsContextProvider} from "./SupabaseContext";


const App = () => {

    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log('onAuthStateChange', session);
            console.log("Session:", session ? session.user : 'no user');

            setSession(session);
        });
    }, [])

    return (
        <ItemsContextProvider>
            <div className="container" style={{padding: '50px 0 100px 0'}}>
                <Header/>
                <main>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route exact path="/home" element={<Home/>}/>
                        <Route exact path="/auth" element={<Login/>}/>
                        <Route exact path="/account" element={<Account/>}/>
                        <Route exact path="/pets" element={ <SubmitPet/>}/>
                        <Route exact path="/schedule" element={<Schedule/>}/>
                        <Route exact path="/logout" element={<Logout/>}/>
                        <Route exact path="/contact" element={<Contact/>}/>
                        {/*<Route exact path={'/password-reset'} element={<PasswordReset/>}/>*/}
                        <Route path="*" element={<Home/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </ItemsContextProvider>
    );
}

export default App;