import { useState } from "react";
import axios from "axios";
import "./CreateExercise.css";

const CreateExercise = () => {
  const [exercise, setExercise] = useState({
    title: "",
    description: "",
    reps: 0,
    rest: ""
  });

  const handleChange = e => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:8080/exercise/create", exercise)
      .then(response => {
        console.log("Exercise created successfully:", response.data.data);
      })
      .catch(error => {
        console.error("Error creating exercise:", error);
      });
  };

  return (
    <div className="create-exercise-container">
      <h2>Create Exercise</h2>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input type="text" name="title" value={exercise.title} onChange={handleChange} />
        <label>Description: </label>
        <input type="text" name="description" value={exercise.description} onChange={handleChange} />
        <label>Reps: </label>
        <input type="number" name="reps" value={exercise.reps} onChange={handleChange} />
        <label>Rest: </label>
        <input type="text" name="rest" value={exercise.rest} onChange={handleChange} />
        <button type="submit">Create Exercise</button>
      </form>
    </div>
  );
};

export default CreateExercise;
