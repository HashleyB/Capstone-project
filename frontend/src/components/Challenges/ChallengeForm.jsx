import { useState } from 'react';
import axios from 'axios';
import './challengeForm.css';
const ChallengeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cost: '',
    startDate: '',
    endDate: '',
    photo: null
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // eslint-disable-next-line no-unused-vars
  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newChallenge = new FormData();
    newChallenge.append('title', formData.title);
    newChallenge.append('description', formData.description);
    newChallenge.append('cost', formData.cost);
    newChallenge.append('startDate', formData.startDate);
    newChallenge.append('endDate', formData.endDate);

    try {
      await axios.post('http://localhost:8080/challenges', newChallenge);
    } catch (error) {
      console.error('Error adding challenge:', error);
    }
  };

  return (
    <div className="container">
      <h2>Add New Challenge</h2>
      <form onSubmit={handleSubmit} className="challengeForm">
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea>
        <label>Cost:</label>
        <input type="number" name="cost" value={formData.cost} onChange={handleInputChange} />
        <label>Start Date:</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
        <label>End Date:</label>
        <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
        <button type="submit" className="btn_global">Add Challenge</button>
      </form>
    </div>
  );
};

export default ChallengeForm;
