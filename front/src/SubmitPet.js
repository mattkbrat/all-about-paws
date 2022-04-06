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

import { useState, useEffect } from 'react';
import { supabase } from "./client";
import { Select } from '@supabase/ui'

const SubmitPet = ({ session }) =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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

    useEffect(() => {
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
                throw new Error(error_profiles.message);
            }

            let { data, error} = await supabase
                .from('pets')
                .select('*')
                .single()

            if (error){
                throw new Error(error.message);
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
                alert(error.message);
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
                throw error
            }

            } catch (error) {
                alert(error.message);
            } finally {
                setLoading(false);
            }

        }

        return (
            <div aria-live="polite">
                {loading ? (
                    'Submitting pet...'
                ) : (
                    <form onSubmit={updatePet} className="form-widget">
                        <div>
                            <label htmlFor='profiles'>Owner</label>
                            <Select
                                label="Select owner" name="profiles" id="profiles"
                                value={owner_id} onChange={(e) => setOwnerId(e.target.value)}>
                                {owners.map(profile => (
                                    <option key={profile.id} value={profile.id}>
                                        {profile.first_name+" "+profile.last_name}
                                    </option>
                                ))}</Select>
                        </div>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="breed">Breed</label>
                            <input
                                type="text"
                                id="breed"
                                name="breed"
                                value={breed}
                                onChange={e => setBreed(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="condition">Condition</label>
                            <input
                                type="text"
                                id="condition"
                                name="condition"
                                value={condition}
                                onChange={e => setCondition(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="special_instructions">Special Instructions</label>
                            <input
                                type="text"
                                id="special_instructions"
                                name="special_instructions"
                                value={special_instructions}
                                onChange={e => setSpecialInstructions(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="picture">Picture</label>
                            <input
                                type="text"
                                id="picture"
                                name="picture"
                                value={picture}
                                onChange={e => setPicture(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="temperament">Temperament</label>
                            <input
                                type="text"
                                id="temperament"
                                name="temperament"
                                value={temperament}
                                onChange={e => setTemperament(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="clip">Clip</label>
                            <input
                                type="text"
                                id="clip"
                                name="clip"
                                value={clip}
                                onChange={e => setClip(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="age">Age</label>
                            <input
                                type="text"
                                id="age"
                                name="age"
                                value={age}
                                onChange={e => setAge(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="size">Size</label>
                            <input
                                type="text"
                                id="size"
                                name="size"
                                value={size}
                                onChange={e => setSize(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="weight">Weight</label>
                            <input
                                type="text"
                                id="weight"
                                name="weight"
                                value={weight}
                                onChange={e => setWeight(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="breed">Breed</label>
                            <input
                                type="text"
                                id="breed"
                                name="breed"
                                value={breed}
                                onChange={e => setBreed(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="image">Image</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            />
                        </div>

                        <button className="button block primary" disabled={loading}>
                            Submit
                        </button>

                    </form>
                )}
            </div>
    )
}

export default SubmitPet