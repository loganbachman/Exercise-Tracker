import ExerItem from './ExerItem';

function ExerCollection({exercises, onUpdate, onDelete}) {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Reps</th>
                        <th>Weight</th>
                        <th>Unit</th>
                        <th>Date</th>
                        <th>Edit / Delete</th>
                    </tr>
                </thead>
                <tbody>
                {exercises.map((exercise, i) => <ExerItem exercise={exercise} 
                    onDelete={onDelete} onUpdate={onUpdate} key={i} />)}
                </tbody>
            </table>
        </div>
    );
}

export default ExerCollection;