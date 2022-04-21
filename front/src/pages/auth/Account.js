import {useState, useEffect, useContext} from 'react'
import { supabase } from "../../client";

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


    useEffect(() => {
        getProfile()
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

    return (
        <div aria-live="polite">
            {loading ? (
                'Saving ...'
            ) : (
                <form onSubmit={updateProfile} className="form-widget">
                    <div>Email: {session.user.email}</div>
                    {/*<div>*/}
                    {/*    <label htmlFor="username">Name</label>*/}
                    {/*    <input*/}
                    {/*        id="username"*/}
                    {/*        type="text"*/}
                    {/*        value={username || ''}*/}
                    {/*        onChange={(e) => setUsername(e.target.value)}*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <div>
                        <label htmlFor="first-name">First Name</label>
                        <input
                            id="first-name"
                            type="text"
                            value={first_name || ''}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="last-name">Last Name</label>
                        <input
                            id="last-name"
                            type="text"
                            value={last_name || ''}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="street-address">Street Address</label>
                        <input
                            id="street-address"
                            type="text"
                            value={street_address || ''}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="city-address">City Address</label>
                        <input
                            id="city-address"
                            type="text"
                            value={city_address || ''}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="state-address">State Address</label>
                        <input
                            id="state-address"
                            type="text"
                            value={state_address || ''}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="zip-address">Zip Address</label>
                        <input
                            id="zip-address"
                            type="text"
                            value={zip_address || ''}
                            onChange={(e) => setZip(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="phone-no">Phone Number</label>
                        <input
                            id="phone-no"
                            type="text"
                            value={phone_no || ''}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="button block primary" disabled={loading}>
                            Update profile
                        </button>
                    </div>
                </form>
            )}
            <button type="button" className="button block" onClick={() => supabase.auth.signOut()}>
                Sign Out
            </button>
        </div>
    )
}

export default Account