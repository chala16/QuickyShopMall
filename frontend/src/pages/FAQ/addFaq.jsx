import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Label, TextInput, Button } from 'flowbite-react';
import Navbar from "../../components/home/Navbar/Navbar";
import { Link, useParams } from 'react-router-dom'; // Import useParams to get URL parameters
import { IconContext } from 'react-icons';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { useAuthContext } from "../../hooks/useAuthContext";
import { toast } from 'react-toastify'; 


const AddFAQ = () => {
  const { user } = useAuthContext();
  const { shopId } = useParams(); // Use useParams to get shopId from URL
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [faqs, setFaqs] = useState([]);

// Function to fetch FAQs from the backend
const fetchFAQs = async () => {
  try {
    const response = await axios.get('http://localhost:3000/inventory/get-faqs', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if using authentication
      },
    });
    setFaqs(response.data);
  } catch (err) {
    setError(err.response ? err.response.data.message : 'Error fetching FAQs');
  }
};

// Use useEffect to fetch FAQs when the component mounts
useEffect(() => {
  fetchFAQs();
}, []);

const handleDelete = async (id) => {
  // Show confirmation dialog before proceeding with the deletion
  const confirmed = window.confirm("Are you sure you want to delete this FAQ?");

  if (confirmed) {
    try {
      const response = await fetch(`http://localhost:3000/api/faq/faqs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Check for a 204 status code (No Content)
        if (response.status === 204) {
          console.log('FAQ deleted successfully'); // Log success message
          toast.success('FAQ deleted successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // Update the state to remove the deleted FAQ
          setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq._id !== id));
        } else {
          const data = await response.json();
          console.log(data.message); // Log success message for other responses
          // Update the state to remove the deleted FAQ
          setFaqs((prevFaqs) => prevFaqs.filter((faq) => faq._id !== id));
        }
      } else {
        const errorData = await response.json();
        console.error('Error deleting FAQ:', errorData.message);
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error.message);
    }
  } else {
    console.log('Deletion canceled');
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the user is authenticated before proceeding
    if (!user) {
      setError('User not authenticated');
      return; // Return early to prevent submitting the form
    }
  
    try {
      const response = await axios.post(
        'http://localhost:3000/inventory/create-faq',
        {
          question,
          answer
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Ensure user.token is passed here
          }
        }
      );
  
      console.log('FAQ added successfully:', response.data);
      setQuestion('');
      setAnswer('');
      setError(null); // Clear any previous errors

      toast.success('FAQ added successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      fetchFAQs();
    } catch (error) {
      console.error('Error adding FAQ', error);
      setError('Error adding FAQ');
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
  
            <Button type="submit" className="px-2 py-1 w-40 text-sm font-medium text-white bg-indigo-500 rounded-lg shadow-lg mt-4">
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
      <div className="container mx-auto mt-5 p-4">
  <h1 className="text-2xl font-bold flex-col items-center justify-center text-center mb-10 text-amber-900">Frequently Asked Questions</h1>
  {error && <p className="text-red-500 text-center">{error}</p>}
  {faqs && faqs.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-green-400 text-white">
          <tr>
            <th className="py-3 px-4 text-left text-sm font-semibold">Question</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Answer</th>
            <th className="py-3 px-4 text-left text-sm font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {faqs.map((faq) => (
            <tr key={faq._id} className="hover:bg-gray-100 transition-colors duration-200">
              <td className="py-3 px-4">{faq.question}</td>
              <td className="py-3 px-4">{faq.answer}</td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleDelete(faq._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-center">No FAQs found for this shop.</p>
  )}
</div>

    </div>
  );
}

export default AddFAQ;
