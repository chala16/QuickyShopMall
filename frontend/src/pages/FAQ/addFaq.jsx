import React, { useState } from 'react';
import axios from 'axios';

const AddFAQ = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/faq/faqs', {
        shopId,
        question,
        answer
      });
      console.log('FAQ added successfully:', response.data);
      setQuestion('');
      setAnswer('');
    } catch (error) {
      setError('Error adding FAQ');
    }
  };

  return (
    <div>
      <h2>Add FAQ</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input 
            type="text" 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Answer:</label>
          <input 
            type="text" 
            value={answer} 
            onChange={(e) => setAnswer(e.target.value)} 
            required 
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Add FAQ</button>
      </form>
    </div>
  );
};

export default AddFAQ;
