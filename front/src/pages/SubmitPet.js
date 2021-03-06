// Submit new pet to supabase table

// TODO: FIX: Data is getting inserted twice.
// TODO: FIX: Select is reading before the data is updated.
// TODO: Formatting of the data.
// TODO: Add functionality to fetch pets.
// TODO: Add a button to delete the pet.
// TODO: Add a button to edit the pet.

// TODO: If user is not admin, return to home page.
//  Only admins should be able to insert pets.
//  Should clients be able to edit their pets?

import {useState, useEffect, useContext} from 'react';
import { supabase } from "../client";
import { Select } from '@supabase/ui'
import '../components/form.css'
import {SupabaseContext} from "../SupabaseContext";
import { useNavigate } from "react-router-dom";

const SubmitPet = ({ session }) =>{
    const [loading, setLoading] = useState(false);

    // Name, breed, condition, special_instructions, picture, temperament, clip, age, size, weight, description, image, last_seen, owner_id
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [condition, setCondition] = useState('');
    const [special_instructions, setSpecialInstructions] = useState('');
    const [picture, setPicture] = useState('');
    const [temperament, setTemperament] = useState('');
    const [clip, setClip] = useState('');
    const [last_seen, setLastSeen] = useState('');
    const [owner_id, setOwnerId] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');
    const [weight, setWeight] = useState('');
    const [owners, setOwners] = useState([]);

    let navigate = useNavigate();

    const {
        setError,
    } = useContext(SupabaseContext);

    useEffect(() => {
        if (supabase.auth.user() == null) {
            return navigate("/login")
        }
        getPet();
    }, [session]);

    const getPet = async () => {
        try {
            setLoading(true);
            // If user is not authenticated, redirect to login page
            const user = supabase.auth.user();

            // if (!user) {
            //     window.location.href = '/login';
            // }

            let { data: profiles, error_profiles } = await supabase
                .from('profiles')
                .select('id, first_name, last_name')

            if (profiles.length > 0) {
                console.log(profiles)
                setOwners(profiles);
            } else {
                setOwners([]);
            }

            if (error_profiles) {
                setError(error_profiles.message);
            }

            let { data, error} = await supabase
                .from('pets')
                .select('*')
                .single()

            if (error){
                setError(error.message);
            }

            if (data) {
                setName(data.name);
                setBreed(data.breed);
                setCondition(data.condition);
                setSpecialInstructions(data.special_instructions);
                setPicture(data.picture);
                setTemperament(data.temperament);
                setClip(data.clip);
                setLastSeen(data.last_seen);
                setOwnerId(data.owner_id);
            }

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

    const updatePet = async (e) => {
        e.preventDefault();

        try{
            // Submit pet to supabase pets table
            setLoading(true);
            const user = supabase.auth.user();

            // If the owner_id is blank, then the first profile in the profiles table is the owner
            if (owner_id === '') {
                setOwnerId(owners[0].id);
            }
            console.log("Owner ID: " + owner_id);

            let updates = {
                name: name,
                breed: breed,
                condition: condition,
                special_instructions: special_instructions,
                picture: picture,
                temperament: temperament,
                clip: clip,
                owner_id: owner_id,
                updated_at: new Date()
            }

            let { pets_error } = await supabase
                .from('pets')
                .insert(updates, {
                    returning: 'minimal'
                })

            if (pets_error){
                console.log(pets_error);
            }

            } finally {
                setLoading(false);
            }

        }

        return (
            <div className="form" aria-live="polite">
                {loading ? (
                    'Submitting pet...'
                ) : (
                    <form onSubmit={updatePet} className="form-widget">
                        <div className="content">
                        <div className="input-field">
                            <Select
                                label="Select owner" name="profiles" id="profiles"
                                value={owner_id} onChange={(e) => setOwnerId(e.target.value)}>
                                {owners.map(profile => (
                                    <option key={profile.id} value={profile.id}>
                                        {profile.first_name+" "+profile.last_name}
                                    </option>
                                ))}</Select>
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Name"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                id="breed"
                                name="breed"
                                placeholder="Breed"
                                required
                                value={breed}
                                onChange={e => setBreed(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                id="condition"
                                placeholder="Condition"
                                name="condition"
                                value={condition}
                                onChange={e => setCondition(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                id="special_instructions"
                                placeholder="Special Instructions"
                                name="special_instructions"
                                value={special_instructions}
                                onChange={e => setSpecialInstructions(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                id="temperament"
                                name="temperament"
                                placeholder="Temperament"
                                value={temperament}
                                onChange={e => setTemperament(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                id="clip"
                                name="clip"
                                placeholder="Clip"
                                value={clip}
                                onChange={e => setClip(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                id="age"
                                name="age"
                                placeholder="Age (years)"
                                value={age}
                                onChange={e => setAge(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                id="size"
                                name="size"
                                placeholder="Size (inches)"
                                value={size}
                                onChange={e => setSize(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                type="text"
                                id="weight"
                                name="weight"
                                placeholder="Weight (lbs)"
                                value={weight}
                                onChange={e => setWeight(e.target.value)}
                            />
                        </div>
                        </div>
                        <div className="action">
                        <button className="button block primary" disabled={loading}>
                            Submit
                        </button>
                        </div>

                    </form>
                )}
            </div>
    )
}

export default SubmitPet