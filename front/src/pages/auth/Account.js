import {useState, useEffect} from 'react'
import { supabase } from "../../client";
import {useNavigate} from "react-router-dom";
import '../../components/form.css'

const Account = ( ) => {
    const [loading, setLoading] = useState(true)
    const [first_name, setFirstName] = useState(null)
    const [last_name, setLastName] = useState(null)
    const [street_address, setStreet] = useState(null)
    const [city_address, setCity] = useState(null)
    const [state_address, setState] = useState(null)
    const [zip_address, setZip] = useState(null)
    const [phone_no, setPhone] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)

    const session = supabase.auth.session()
    let navigate = useNavigate();


    useEffect(() => {
        getProfile()
        if (supabase.auth.user() == null) {
            return navigate("/login")
        }
    }, [session])

    const getProfile = async () => {
        try {
            setLoading(true)
            const user = supabase.auth.user()
            console.log("User: ", user)

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`avatar_url, first_name, last_name, street_address, city_address, state_address, zip_address, phone_no`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setFirstName(data.first_name)
                setLastName(data.last_name)
                setStreet(data.street_address)
                setCity(data.city_address)
                setState(data.state_address)
                setZip(data.zip_address)
                setPhone(data.phone_no)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    const updateProfile = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const user = supabase.auth.user()

            const updates = {
                id: user.id,
                first_name,
                last_name,
                street_address,
                city_address,
                state_address,
                zip_address,
                phone_no,
                avatar_url,
                updated_at: new Date(),
            }

            let { error } = await supabase.from('profiles').upsert(updates, {
                returning: 'minimal', // Don't return the value after inserting
            })

            if (error) {
                throw error
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    function handleSignOut() {
        supabase.auth.signOut()
        navigate("/login")
    }

    return (
        <div className="form" aria-live="polite">
            {loading ? (
                'Saving ...'
            ) : (
                <form onSubmit={updateProfile} className="form-widget">
                    <div className="content">
                    <div className="input-field">Email: {session.user.email}</div>
                    <div className="input-field">
                        <input
                            id="first-name"
                            type="text"
                            placeholder="First Name"
                            value={first_name || ''}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            id="last-name"
                            type="text"
                            placeholder="Last Name"
                            value={last_name || ''}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            id="street-address"
                            type="text"
                            placeholder="Street Address"
                            value={street_address || ''}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            id="city-address"
                            type="text"
                            placeholder="City Address"
                            value={city_address || ''}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            id="state-address"
                            type="text"
                            placeholder="State Address"
                            value={state_address || ''}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            id="zip-address"
                            type="text"
                            placeholder="Zip Address"
                            value={zip_address || ''}
                            onChange={(e) => setZip(e.target.value)}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            id="phone-no"
                            type="text"
                            placeholder="Phone Number"
                            value={phone_no || ''}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    </div>
                    <div className="action">
                        <button type="button" className="button block" onClick={handleSignOut}>
                            Sign Out
                        </button>
                        <button className="button block" disabled={loading}>
                            Update profile
                        </button>
                    </div>
                </form>
                )}
                </div>
    )}
export default Account