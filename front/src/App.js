import './App.css'
import {useState, useEffect, Component} from 'react'
import { supabase } from './client'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Auth from './pages/Auth'
import Account from './pages/Account'
import Header from './components/Header';
import Home from './pages/Home';
import SubmitPet from "./pages/SubmitPet";
import Schedule from './pages/Schedule';
import SignOut from './pages/SignOut';

const App = () => {

    const [session, setSession] = useState(null)

    useEffect(() => {
        setSession(supabase.auth.session())

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <div className="container" style={{padding: '50px 0 100px 0'}}>
            <Header/>
            <main>
            <Routes>
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/account" element={<Account/>}/>
                <Route exact path="/auth" element={<Auth/>}/>
                <Route exact path="/pets" element={!session ? <Auth/> : <SubmitPet/>}/>
                <Route exact path="/schedule" element={!session ? <Auth/> : <Schedule/>}/>
                <Route exact path="/logout" element={!session ? <Auth/> : <SignOut/>}/>
                <Route path="*" element={<Home/>}/>
            </Routes>
            </main>
        </div>
    );
}

export default App;