import '../App.css';
import {CiEdit} from 'react-icons/ci'
import { MdDeleteForever } from "react-icons/md";

function ExerItem({exercise, onUpdate, onDelete}) {
    return (
            <tr>
                <td>{exercise.name}</td>
                <td>{exercise.reps}</td>
                <td>{exercise.weight}</td>
                <td>{exercise.unit}</td>
                <td>{exercise.date}</td>
                <td>
                    <a href="/" onClick={e => {e.preventDefault(); onUpdate(exercise)}}><CiEdit /></a>&nbsp;
                    <a href="/" onClick={e => {e.preventDefault(); onDelete(exercise._id)}}><MdDeleteForever /></a>
                </td>
            </tr>
    );
}

export default ExerItem;