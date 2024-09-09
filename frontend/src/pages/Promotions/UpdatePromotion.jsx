import React from 'react'
import Navbar from "../../components/home/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

const UpdatePromotion = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const { user } = useAuthContext();

    useEffect(() => {
        if (user && id) {
          fetch(`http://localhost:3000/api/promotions/get-promotion/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setData(data);
              setTitle(data.title || "");
              setDescription(data.description || "");
              setImage(data.image || null);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              toast.error("Failed to fetch item details");
            });
        }
      }, [id, user]);

      const handleSubmit = (e) => {
        e.preventDefault();
    
        const promotionDetails = {
          email: user.email,
          title,
          description,
          image
        };
        console.log(promotionDetails);
        axios
          .patch(`http://localhost:3000/api/promotion/${id}`, promotionDetails, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((response) => {
            console.log("Promotion added successfully", response);
            toast.success("Promotion added successfully");
          })
          .catch((error) => {
            console.error("Error adding promotion", error);
            toast.error("Failed to add promotion");
          });
      };

      const handleImageChange = (e) => {
        setImage(e.target.files[0]);
      };

      if (!data) {
        return <div>Loading...</div>; // Handle loading state
      }

  return (
    <div>
        <Navbar />
      <section className="bg-white dark:bg-gray-900 mt-28">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1
              className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
              style={{ fontSize: "3rem" }}
            >
              <img
                value={image}
                onChange={(e) => setImage(e.target.value)}
                style={{
                  marginTop: "-100px",
                  marginLeft: "-75px",
                  width: "600px",
                  height: "400px",
                }}
              />
            </h1>
          </div>

          <div
            className="hidden lg:mt-0 lg:col-span-5 lg:flex"
            style={{
              marginTop: "-30px",
            }}
          >
            <form className="max-w-md mx-auto" style={{ width: "100%" }} onSubmit={handleSubmit}>
              <h1
                className="max-w-1xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white"
                style={{ fontSize: "2rem" }}
              >
                Add Promotion
              </h1>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  id="title"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <label
                  htmlFor="title"
                  className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Title
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group pb-4">
                <textarea
                  id="description"
                  rows="4"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
                <label
                  htmlFor="description"
                  className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Description
                </label>
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer mt-6"
                  onChange={handleImageChange}
                  required
                />
                <label
                  htmlFor="image"
                  className="absolute text-1xl text-gray-500 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  style={{
                    marginTop: "-10px",
                    marginBottom: "20px",
                  }}
                >
                  Upload Image
                </label>
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UpdatePromotion