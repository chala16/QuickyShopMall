import React, { useState } from 'react';
import axios from 'axios';
import { Label, TextInput, Button } from 'flowbite-react';
import Navbar from "../../components/home/Navbar/Navbar";
import { Link, useParams } from 'react-router-dom'; // Import useParams to get URL parameters
import { IconContext } from 'react-icons';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { useAuthContext } from "../../hooks/useAuthContext";

const AddFAQ = () => {
  const { user } = useAuthContext();
  const { shopId } = useParams(); // Use useParams to get shopId from URL
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      if (!shopId) {
        setError('Shop ID is missing.'); // Handle case where shopId is not defined
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/inventory/create-faq', {
          shopId, // Use the shopId obtained from useParams
          question,
          answer
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          }
        });

        console.log('FAQ added successfully:', response.data);
        setQuestion('');
        setAnswer('');
      } catch (error) {
        console.error("Error adding FAQ", error);
        setError('Error adding FAQ');
      }
    } else {
      setError('User not authenticated'); // Handle case where user is not authenticated
    }
  };

  return (
    <div className="min-h-screen pb-16 bg-gray-100">
      <Navbar />
      <div className="px-20 pb-12 mt-16 bg-white shadow-xl rounded-3xl mx-44">
        <div className="pt-8 mt-8">
          <Link to={`/`}>
            <IconContext.Provider value={{ color: "green", size: "40px" }}>
              <IoArrowBackCircleSharp />
            </IconContext.Provider>
          </Link>
        </div>
  
        <div className="flex p-6 pt-0 rounded-xl">
          <h2 className="mt-6 text-3xl font-semibold">Add FAQ</h2>
        </div>
  
        <div className="flex justify-between items-start gap-12">
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:w-1/2">
            {/* Question Input */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="question" value="Question" className="text-lg" />
              <TextInput
                id="question"
                name="question"
                type="text"
                placeholder="Enter your question"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              {error && <div className="font-semibold text-red-600">{error}</div>}
            </div>
  
            {/* Answer Input */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="answer" value="Answer" className="text-lg" />
              <TextInput
                id="answer"
                name="answer"
                type="text"
                placeholder="Enter the answer"
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              {error && <div className="font-semibold text-red-600">{error}</div>}
            </div>
  
            <Button type="submit" className="w-40 bg-indigo-500 text-white shadow-lg mt-4">
              <p className="text-lg font-bold">Add FAQ</p>
            </Button>
          </form>
  
          {/* Image Section with Resized Image */}
          <img
            src="https://img.freepik.com/free-vector/tiny-business-people-with-giant-faq-letters-gadget-users-searching-instructions-useful-information-flat-vector-illustration-customer-support-solution-concept-banner-landing-web-page_74855-23409.jpg?t=st=1727665300~exp=1727668900~hmac=c49ebf6da1b5510046b0a36386ececbc63d4710224bc6e2614aec6d1bf59d688&w=900"
            alt="FAQ Illustration"
            className="w-96 h-30" // Tailwind class for controlling width
          />
        </div>
      </div>
    </div>
  );
}

export default AddFAQ;
