import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './client'
import Auth from './Auth'
import Account from './Account'
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
        // <div className="container" style={{ padding: '50px 0 100px 0' }}>
        //     {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
        // </div>
        <SubmitPet />
    )
}