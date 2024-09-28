import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FAQsPage = () => {
  const { shopId, shopName } = useParams(); 
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/faq/faqs/${shopId}`)
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(error => console.error('Error fetching FAQs:', error));
  }, [shopId]);

  return (
    <div
      className="p-8 min-h-screen"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1491895200222-0fc4a4c35e18?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className="text-2xl font-bold flex-col items-center justify-center text-center mb-10 text-amber-900 ">
        FAQs for Shop: {shopName}
      </h1>
      <ul>
        {faqs.length > 0 ? (
          faqs.map(faq => (
            <li
              key={faq._id}
              className="w-1/2 mx-auto p-8 mb-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col items-center justify-center text-center border border-gray-200"
            >
              <div className="mb-3 text-lg font-medium text-gray-800">
                <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-md">
                  Question
                </span>
                <p className="mt-2">{faq.question}</p>
              </div>

              <div className="mt-2 text-gray-600">
                <span className="inline-block px-2 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-md">
                  Answer
                </span>
                <p className="mt-2">{faq.answer}</p>  
              </div>
            </li>
          ))
        ) : (
          <p>No FAQs available for this shop.</p>
        )}
      </ul>
    </div>
  );
};

export default FAQsPage;
