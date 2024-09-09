import React, { useEffect, useState } from 'react';
import Navbar from "../../components/home/Navbar/Navbar";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../hooks/useAuthContext";
import axios from "axios";

const UpdatePromotion = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // For previewing the image
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
                setImage(null); // Clear image state as it should not be a Base64 string
                setImagePreview(data.image || null); // Set the existing image for preview
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                toast.error("Failed to fetch item details");
            });
        }
    }, [id, user]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file)); // Preview the uploaded image
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert image to Base64 if it exists
        let imageBase64 = null;
        if (image) {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = async () => {
                imageBase64 = reader.result;

                const promotionDetails = {
                    email: user.email,
                    title,
                    description,
                    image: imageBase64,
                };

                try {
                    const response = await axios.patch(`http://localhost:3000/api/promotions/${id}`, promotionDetails, {
                        headers: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    });
                    console.log("Promotion updated successfully", response);
                    toast.success("Promotion updated successfully");
                } catch (error) {
                    console.error("Error updating promotion", error);
                    toast.error("Failed to update promotion");
                }
            };
        } else {
            // If no image is selected, proceed without it
            const promotionDetails = {
                email: user.email,
                title,
                description,
                image: null,
            };

            try {
                const response = await axios.patch(`http://localhost:3000/api/promotions/${id}`, promotionDetails, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                console.log("Promotion updated successfully", response);
                toast.success("Promotion updated successfully");
            } catch (error) {
                console.error("Error updating promotion", error);
                toast.error("Failed to update promotion");
            }
        }
    };

    if (!data) {
        return <div>Loading...</div>;
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
                            {/* Display image preview */}
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Promotion"
                                    style={{
                                        width: "100%", 
                                        maxWidth: "600px", 
                                        height: "auto",
                                        marginTop: "-100px" 
                                    }}
                                />
                            )}
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
                                Update Promotion
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
    );
};

export default UpdatePromotion;
