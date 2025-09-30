import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const CreateExerPage = () => {
    
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExer = async () => {
        const newExer = {name, reps, weight, unit, date};
        const response = await fetch(
            `/exercises`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(newExer)
            }
        );
        if(response.status === 201) {
            alert("Successfully added exercise");
        } else {
            alert("Failed to ad exercise, status code = " + response.status);
        }
        navigate("/");
    };

    return (
        <div className="container">
            <h1>Exercise Tracker</h1>
            <p className="subtitle">Full Stack MERN Application</p>

            <div className="nav-container">
                <div className="nav-box">
                    <Link to="/" className="nav-link">Home</Link>
                </div>
                <div className="nav-box">
                    <Link to="/add-exercise" className="nav-link">Create</Link>
                </div>
            </div>

        <h1>Add Exercise</h1>
        <input
            type="text"
            placeholder="Enter name here"
            value={name}
            onChange={e => setName(e.target.value)} />
        <input
            type="number"
            placeholder="Enter reps here"
            value={reps}
            onChange={e => setReps(e.target.valueAsNumber)} />
        <input
            type="number"
            placeholder="Enter weight here"
            value={weight}
            onChange={e => setWeight(e.target.valueAsNumber)} />
        <input
            type="text"
            placeholder="Enter unit here"
            value={unit}
            onChange={e => setUnit(e.target.value)} />
        <input
            type="text"
            placeholder="Enter date here"
            value={date}
            onChange={e => setDate(e.target.value)} />
        <button
            onClick={addExer}
        >Add</button>
    </div>
    );
}

export default CreateExerPage;