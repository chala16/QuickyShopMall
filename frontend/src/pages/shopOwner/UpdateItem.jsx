import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/home/Navbar/Navbar";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconContext } from "react-icons";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaBoxArchive } from "react-icons/fa6";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { Spinner } from "flowbite-react";

const UpdateItem = () => {
  const { user } = useAuthContext();
  const [errors, setErrors] = useState({});
  const [postImage, setPostImage] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const showSuccess = () => {
    toast.success("Item is updated successfully!", {
      position: "bottom-right",
      theme: "colored",
    });
  };

  const category = [
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

  const [selectedCategory, setSelectedCategory] = useState(category[0]);

  useEffect(() => {
    fetch(`http://localhost:3000/inventory/get-item/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setItemDetails(data);
        setSelectedCategory(data.category);
        setPostImage(data.image);
      })
      .catch((error) => {
        console.error("Error fetching item details", error);
        toast.error("Failed to fetch item details");
      });
  }, [id, user.token]);

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

  const handleUpdateItem = (event) => {
    event.preventDefault();
    if (!user) {
      toast.error("You must be logged in");
      return;
    }
    const form = event.target;

    const name = form.name.value.trim();
    const category = form.category.value;
    const description = form.description.value.trim();
    const price = parseFloat(form.price.value);
    const quantity = parseInt(form.qty.value, 10);
    const image = postImage;

    const itemObj = {
      name,
      category,
      description,
      price,
      quantity,
      image,
    };

    fetch(`http://localhost:3000/inventory/update-item/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(itemObj),
    })
      .then((res) => res.json())
      .then((data) => {
        showSuccess();
        navigate("/shopOwner/dashboard/view-items");
      })
      .catch((error) => {
        console.error("Error updating item", error);
        toast.error("Failed to update item");
      });
  };

  if (!itemDetails) {
    return <div>Loading...</div>;
  }

  //Validations
  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "Name cannot be empty";
        break;
      case "qty":
        if (value < 0 || value > 99999)
          error = "Enter a valid quantity (1-99999)";
        break;
      case "price":
        if (value <= 0 || value > 999999999999)
          error = "Enter a valid price (1-999999999999)";
        break;
      case "description":
        if (!value) error = "Description cannot be empty";
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
        <div className="w-8 pt-8 mt-8">
          <Link to={`/shopOwner/dashboard/view-items`}>
            <IconContext.Provider value={{ color: "green", size: "40px" }}>
              <IoArrowBackCircleSharp />
            </IconContext.Provider>
          </Link>
        </div>
        <div className="flex p-6 pt-0 rounded-xl">
          <IconContext.Provider value={{ color: "blue", size: "24px" }}>
            <FaBoxArchive className="mt-8 mr-4" />
          </IconContext.Provider>
          <h2 className="mt-6 text-3xl font-bold">Update Product</h2>
        </div>

        <form
          onSubmit={handleUpdateItem}
          className="flex flex-col flex-wrap gap-4 m-auto"
        >
          {/* first row */}
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <div className="block mb-2">
                <Label
                  htmlFor="itemName"
                  value="Item name"
                  className="text-lg "
                />
              </div>
              <TextInput
                id="name"
                name="name"
                type="text"
                defaultValue={itemDetails.name}
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
              <div className="block mb-2">
                <Label
                  htmlFor="qty"
                  value="Item Quantity"
                  className="text-lg "
                />
              </div>
              <TextInput
                id="qty"
                name="qty"
                type="number"
                onChange={(e) => validateInput("qty", e.target.value)}
                defaultValue={itemDetails.quantity}
                required
              />
              {errors.qty && (
                <div className="font-semibold text-red-600">{errors.qty}</div>
              )}
            </div>
          </div>

          {/* second row */}
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <div className="block mb-2">
                <Label
                  htmlFor="price"
                  value="Item Price"
                  className="text-lg "
                />
              </div>
              <TextInput
                id="price"
                name="price"
                type="number"
                placeholder="Item price"
                defaultValue={itemDetails.price}
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
              <div className="block mb-2">
                <Label
                  htmlFor="category"
                  value="Category type"
                  className="text-lg "
                />
              </div>

              <Select
                id="category"
                name="category"
                className="w-full rounded"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {category.map((option) => (
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
              <div className="block mb-2">
                <Label
                  htmlFor="itemDescription"
                  value="Item Description"
                  className="text-lg "
                />
              </div>
              <Textarea
                id="description"
                name="description"
                placeholder="Write your item description..."
                required
                className="w-40%"
                rows={5}
                maxLength={1000}
                onChange={(e) => validateInput("description", e.target.value)}
                defaultValue={itemDetails.description}
              />
              {errors.description && (
                <div className="font-semibold text-red-600">
                  {errors.description}
                </div>
              )}
            </div>
            <div className="lg:w-1/2">
              <div className="block mb-2">
                <Label
                  htmlFor="image"
                  value="Item Image"
                  className="text-lg "
                />
                <div>
                  {/* Show the current image if exists */}
                  {postImage && (
                    <div className="mb-4">
                      <img
                        src={postImage}
                        alt="Current item"
                        className="object-cover w-20 h-20 rounded-md shadow-lg"
                      />
                    </div>
                  )}
                  <input
                    className="bg-black "
                    type="file"
                    label="Image"
                    name="image"
                    id="file-upload"
                    accept=".jpeg,.png,.jpg"
                    onChange={(e) => handleFileUpload(e)}
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
              !postImage ||
              loading ||
              Object.keys(errors).some((key) => errors[key])
            }
            className="w-40 bg-red-500 shadow-lg"
          >
            <p className="text-lg font-bold">Update Item</p>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
