import { useEffect, useState } from "react";
import axios from "axios";
import "./ExerciseList.css"; 

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = () => {
    axios.get("http://localhost:8080/exercise")
      .then(response => {
        setExercises(response.data.data);
      })
      .catch(error => {
        console.error("Error fetching exercises:", error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/exercise/${id}`)
      .then(response => {
        console.log("Exercise deleted successfully:", response.data.data);
        fetchExercises();
      })
      .catch(error => {
        console.error("Error deleting exercise:", error);
      });
  };

  return (
    <div className="exercise-list-container">
      <h2>List of Exercises for Today</h2>
      <ul>
        {exercises.map((exercise, index) => (
          <li key={index} className="exercise-item">
            <p>Title: {exercise.title}</p>
            <p>Description: {exercise.description}</p>
            <p>Reps: {exercise.reps}</p>
            <p>Rest: {exercise.rest}</p>
            <button onClick={() => handleDelete(exercise._id)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
