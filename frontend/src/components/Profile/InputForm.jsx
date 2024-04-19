import { useState } from "react";
import axios from "axios";
import "./input.css";

// eslint-disable-next-line react/prop-types
const InputForm = ({ onProfileCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    age: 0,
    weight: 0,
    height: 0,
    goals: "",
    injuries: "",
    preferences: "",
    restrictions: ""
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:8080/client-profile/create", formData)
      .then(response => {
        onProfileCreated(response.data);
        setFormData({
          name: "",
          contact: "",
          email: "",
          age: 0,
          weight: 0,
          height: 0,
          goals: "",
          injuries: "",
          preferences: "",
          restrictions: ""
        });
      })
      .catch(error => {
        console.error("Error creating client profile:", error);
      });
  };

  return (
    <div className="input-form-container">
      <h2>Add new client info</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="label">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="input-field2" />
        </div>
        <div className="form-group">
          <label htmlFor="contact" className="label">Contact:</label>
          <input type="text" id="contact" name="contact" value={formData.contact} onChange={handleChange} className="input-field2" />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="label">Email:</label>
          <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} className="input-field2" />
        </div>
        <div className="form-group">
          <label htmlFor="age" className="label">Age:</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="input-field2" />
        </div>
        <div className="form-group">
          <label htmlFor="weight" className="label">Weight:</label>
          <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} className="input-field2" />
        </div>
        <div className="form-group">
          <label htmlFor="height" className="label">Height:</label>
          <input type="number" id="height" name="height" value={formData.height} onChange={handleChange} className="input-field2" />
        </div>
        <div className="form-group">
          <label htmlFor="goals" className="label">Goals:</label>
          <input type="text" id="goals" name="goals" value={formData.goals} onChange={handleChange} className="input-field2" />
        </div>
        <div className="form-group">
          <label htmlFor="injuries" className="label">Injuries:</label>
          <input type="text" id="injuries" name="injuries" value={formData.injuries} onChange={handleChange} className="input-field2" />
        </div>
        <div className="form-group">
          <label htmlFor="preferences" className="label">Preferences:</label>
          <input type="text" id="preferences" name="preferences" value={formData.preferences} onChange={handleChange} className="input-field2" />
        </div>
        <div className="form-group">
          <label htmlFor="restrictions" className="label">Restrictions:</label>
          <input type="text" id="restrictions" name="restrictions" value={formData.restrictions} onChange={handleChange} className="input-field2" />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default InputForm;
