import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/home/Navbar/Navbar";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import bg from "../../images/viewAdminBG.jpg";
import upload from "../../images/upload.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconContext } from "react-icons";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaBoxArchive } from "react-icons/fa6";

const UpdateItem = () => {
  const { user } = useAuthContext();
  const [postImage, setPostImage] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
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
    setFileUploaded(true);

    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage(base64);
  };

  const handleUpdateItem = (event) => {
    event.preventDefault();
    if (!user) {
      toast.error("You must be logged in");
      return;
    }
    const form = event.target;

    const name = form.name.value;
    const category = form.category.value;
    const description = form.description.value;
    const price = form.price.value;
    const quantity = form.qty.value;
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

  return (
    <div className="min-h-screen pb-16 bg-gray-100">
      <Navbar />
      <div className="px-20 pb-12 mt-16 bg-white shadow-xl rounded-3xl mx-44">
        <div className="pt-8 mt-8">
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
                minLength={3}
                maxLength={30}
              />
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
                defaultValue={itemDetails.quantity}
                required
              />
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
                minLength={1}
                maxLength={10}
              />
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
                defaultValue={itemDetails.description}
              />
            </div>
            <div className="lg:w-1/2">
            <div className="block mb-2">
                <Label
                  htmlFor="image"
                  value="Item Image"
                  className="text-lg "
                />
                <div>
                  <input
                    className="mt-4 bg-black"
                    type="file"
                    label="Image"
                    name="image"
                    id="file-upload"
                    accept=".jpeg,.png,.jpg"
                    onChange={(e) => handleFileUpload(e)}
                  />
                  </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-40 bg-red-500 shadow-lg ">
            <p className="text-lg font-bold">Update Item</p>
          </Button>

        </form>
      </div>
    </div>
  );
};

export default UpdateItem;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
