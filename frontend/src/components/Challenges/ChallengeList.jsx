import { useState, useEffect } from 'react';
import axios from 'axios';
import './challengeList.css'; 

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const response = await axios.get('http://localhost:8080/challenges');
      console.log('Response data:', response.data);
      setChallenges(response.data);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };

  // Function to format date strings
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/challenges/${id}`);
      // Update state to reflect the deletion
      setChallenges(challenges.filter(challenge => challenge._id !== id));
    } catch (error) {
      console.error('Error deleting challenge:', error);
    }
  };

  return (
    <div className="container"> {/* Apply container class */}
      <h2>Challenges</h2>
      <ul>
        {challenges.map(challenge => (
          <li key={challenge._id} className="custom-li">
            <h3>{challenge.title}</h3>
            <p><strong>Description:</strong> {challenge.description}</p>
            <p><strong>Cost:</strong> ${challenge.cost}</p>
            <p><strong>Start Date:</strong> {formatDate(challenge.startDate)}</p>
            <p><strong>End Date:</strong> {formatDate(challenge.endDate)}</p>
            <button onClick={() => handleDelete(challenge._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeList;
