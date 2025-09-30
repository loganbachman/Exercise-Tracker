import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const EditExerPage = ({exerToEdit}) => {

    const [name, setName] = useState(exerToEdit.name);
    const [reps, setReps] = useState(exerToEdit.reps);
    const [weight, setWeight] = useState(exerToEdit.weight);
    const [unit, setUnit] = useState(exerToEdit.unit);
    const [date, setDate] = useState(exerToEdit.date);
    const navigate = useNavigate();

    const editExer = async () => {
        const editedExer = {name, reps, weight, unit, date};
        const response = await fetch(
            `/exercises/${exerToEdit._id}`, {
                method: 'PUT',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(editedExer)
            }
        );
        if(response.status === 200) {
            alert("Successfully edited exercise");
        } else {
            alert("Failed to edit exercise, status code = " + response.status);
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

        <h1>Edit Exercise</h1>
        <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)} />
        <input
            type="number"
            value={reps}
            onChange={e => setReps(e.target.valueAsNumber)} />
        <input
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.valueAsNumber)} />
        <input
            type="text"
            value={unit}
            onChange={e => setUnit(e.target.value)} />
        <input
            type="text"
            value={date}
            onChange={e => setDate(e.target.value)} />
        <button
            onClick={editExer}
        >Edit</button>
    </div>
    );
}

export default EditExerPage;