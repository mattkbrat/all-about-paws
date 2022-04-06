import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './client'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Auth from './Auth'
import Account from './Account'
import Header from './Header';
import Home from './Home';
import SubmitPet from "./SubmitPet";

export default () => {
    const [session, setSession] = useState(null)

    useEffect(() => {
        setSession(supabase.auth.session())

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    return (
        <Router>
            <div className="container" style={{ padding: '50px 0 100px 0' }}>
                <Header />
                <Routes>
                    <Route exact path="/home" element={<Home />}/>
                    <Route exact path="/account"element={<Account />}/>
                    <Route exact path="/auth" element={!session ? <Auth /> : <Account key={session.user.id} session={session} />}/>
                    <Route exact path="/pets" element={!session ? <Auth /> : <SubmitPet />}/>
                    <Route path="*" element={<Home />}/>
                </Routes >
            </div >
        </Router >
            
    )
}