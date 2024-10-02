import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/home/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaBoxArchive } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { Spinner } from "flowbite-react"; // Import Spinner

const AddItem = () => {
  const { user } = useAuthContext();
  const [errors, setErrors] = useState({});
  const [postImage, setPostImage] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const showSuccess = () => {
    toast.success("Item is added successfully!", {
      position: "bottom-right",
      theme: "colored",
    });
  };

  const categoryOptions = [
    "Cloths",
    "Electronics",
    "Foods & Beverages",
    "School items",
    "Furniture",
    "Mobile phones",
    "Musical Instruments",
    "Sport items",
    "Toys",
    "Medicines",
    "Audio & Headphones",
    "Laptops & Computers",
    "Beauty Tools",
    "Other items",
  ];

  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setLoading(true); // Start loading
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child(selectedFile.name);

      try {
        const snapshot = await fileRef.put(selectedFile);
        const downloadURL = await snapshot.ref.getDownloadURL();
        setPostImage(downloadURL);
        setFileUploaded(true);
        setLoading(false); // Stop loading when done
      } catch (error) {
        console.error("Error uploading file: ", error);
        setLoading(false); // Stop loading in case of error
      }
    } else {
      setErrors((prev) => ({ ...prev, file: "No file selected" }));
    }
  };

  const handleAddItem = async (event) => {
    event.preventDefault();
    if (!user) {
      setErrors((prev) => ({ ...prev, auth: "You must be logged in" }));
      return;
    }

    const form = event.target;
    const itemObj = {
      name: form.name.value.trim(),
      category: selectedCategory,
      description: form.description.value.trim(),
      price: parseFloat(form.price.value),
      quantity: parseInt(form.qty.value, 10),
      image: postImage,
    };

    try {
      const response = await fetch("http://localhost:3000/inventory/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(itemObj),
      });

      if (response.ok) {
        showSuccess();
        navigate("/shopOwner/dashboard/view-items");
      } else {
        setErrors((prev) => ({ ...prev, server: "Failed to add item" }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, server: "Server error occurred" }));
    }
  };

  // Consolidated Validation Handler
  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) // This checks for empty or only space
          error = "Name cannot be empty";
        break;
      case "qty":
        if (value <= 0 || value > 99999)
          error = "Enter a valid quantity (1-99999)";
        break;
      case "price":
        if (value <= 0 || value > 999999999999)
          error = "Enter a valid price (1-999999999999)";
        break;
      case "description":
        if (!value.trim()) // This checks for empty or only space in description
          error = "Description cannot be empty";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
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
          <IconContext.Provider value={{ color: "blue", size: "24px" }}>
            <FaBoxArchive className="mt-8 mr-4" />
          </IconContext.Provider>
          <h2 className="mt-6 text-3xl font-semibold">Add Product</h2>
        </div>

        <form
          onSubmit={handleAddItem}
          className="flex flex-col flex-wrap gap-4 m-auto"
        >
          {/* first row */}
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <Label htmlFor="name" value="Item Name" className="text-lg" />
              <TextInput
                id="name"
                name="name"
                type="text"
                placeholder="Item name"
                required
                onChange={(e) => validateInput("name", e.target.value)}
                minLength={3}
                maxLength={30}
              />
              {errors.name && (
                <div className="font-semibold text-red-600">{errors.name}</div>
              )}
            </div>

            <div className="lg:w-1/2">
              <Label htmlFor="qty" value="Item Quantity" className="text-lg" />
              <TextInput
                id="qty"
                name="qty"
                type="number"
                required
                onChange={(e) => validateInput("qty", e.target.value)}
              />
              {errors.qty && (
                <div className="font-semibold text-red-600">{errors.qty}</div>
              )}
            </div>
          </div>

          {/* second row */}
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <Label htmlFor="price" value="Item Price" className="text-lg" />
              <TextInput
                id="price"
                name="price"
                type="number"
                placeholder="Item price"
                required
                onChange={(e) => validateInput("price", e.target.value)}
                minLength={1}
                maxLength={10}
              />
              {errors.price && (
                <div className="font-semibold text-red-600">{errors.price}</div>
              )}
            </div>

            <div className="lg:w-1/2">
              <Label
                htmlFor="category"
                value="Category Type"
                className="text-lg"
              />
              <Select
                id="category"
                name="category"
                className="w-full rounded"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* last row */}
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <Label
                htmlFor="description"
                value="Item Description"
                className="text-lg"
              />
              <Textarea
                id="description"
                name="description"
                placeholder="Write your item description..."
                required
                onChange={(e) => validateInput("description", e.target.value)}
                rows={5}
                maxLength={1000}
              />
              {errors.description && (
                <div className="font-semibold text-red-600">
                  {errors.description}
                </div>
              )}
            </div>

            <div className="lg:w-1/2">
              <div className="block mb-2">
                <Label htmlFor="image" value="Item Image" className="text-lg" />
                <div>
                  <input
                    className="mt-4 bg-black"
                    type="file"
                    label="Image"
                    name="image"
                    id="file-upload"
                    accept=".jpeg,.png,.jpg"
                    onChange={handleFileUpload}
                  />
                  {loading && (
                    <div className="flex items-center mt-2">
                      <Spinner size="md" color="blue" />
                      <span className="ml-2">Uploading...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={
              !fileUploaded ||
              loading ||
              Object.keys(errors).some((key) => errors[key])
            }
            className="w-40 bg-red-500 shadow-lg"
          >
            <p className="text-lg font-bold">Add Product</p>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
