import { Link } from 'react-router-dom';
import ExerCollection from '../components/ExerCollection';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage({setExerToEdit}) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async () => {
        const response = await fetch("/exercises");
        const data = await response.json();
        setExercises(data);
    }

    useEffect( () => {
        loadExercises();
    }, []);

    const onDelete = async (_id) => {
        const response = await fetch(
            `/exercises/${_id}`,
            {method: 'DELETE'}
        );
        if(response.status === 204) {
            setExercises(exercises.filter(e => e._id !== _id));
        } else {
            alert(`Failed to delete movie with _id = ${_id}, status code = ${response.status}`);
        }
    }

    const onUpdate = async (exercise) => {
        setExerToEdit(exercise);
        navigate('/edit-exercise');
    }

    return (
        <div className ="container">
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
            <ExerCollection exercises={exercises} onDelete={onDelete} onUpdate={onUpdate}></ExerCollection>
        </div>
    );
}

export default HomePage;