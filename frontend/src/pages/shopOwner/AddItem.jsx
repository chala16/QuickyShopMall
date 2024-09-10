import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/home/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import upload from "../../images/upload.jpg";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { FaBoxArchive } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const AddItem = () => {
  const { user } = useAuthContext();
  const [itemNameError,setItemNameError]=useState();
  const [itemQtyError,setItemQtyError]=useState();
  const [itemPriceError,setItemPriceError]=useState();
  const [descriptionError,setDescriptionError]=useState();
  const [postImage, setPostImage] = useState();
  const [fileUploaded, setFileUploaded] = useState(false);
  const navigate = useNavigate();

  const showSuccess = () => {
    toast.success("Item is added successfully!", {
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

  const handleFileUpload = async (e) => {
    setFileUploaded(true);

    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage(base64);
  };

  const handleAddItem = (event) => {
    event.preventDefault();
    if (!user) {
      setError("You must be logged in");
    }
    const form = event.target;

    const name = form.name.value.trim();
    const category = form.category.value;
    const description = form.description.value.trim();
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

    fetch("http://localhost:3000/inventory/add-item", {
      method: "POST",
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
      });
  };

  //Validations
  const handleItemName = (event) => {
    const inputValue = event.target.value.trim();
    if (!inputValue) {
      setDescriptionError("Cannot be empty");
    } else {
      setDescriptionError("");
    }
  };

  const handleQty = (event) => {
    const inputValue = event.target.value.trim();
    if (inputValue<0 || inputValue>99999 ||inputValue==0) {
      setItemQtyError(
        "Cannot be minus value or enter below 100000 quantity"
      );
    } else {
      setItemQtyError("");
    }
  };

  const handlePrice = (event) => {
    const inputValue = event.target.value.trim();
    if (inputValue<0 || inputValue>999999999999 ||inputValue==0) {
      setItemPriceError(
        "Cannot be minus value or enter below Rs.1000000000000 price"
      );
    } else {
      setItemPriceError("");
    }
  };

  const handleDescription = (event) => {
    const inputValue = event.target.value.trim();
    if (!inputValue) {
      setDescriptionError(
        "Cannot be empty"
      );
    } else {
      setDescriptionError("");
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
              <div className="block mb-2">
                <Label
                  htmlFor="itemName"
                  value="Item name"
                  className="text-lg"
                />
              </div>
              <TextInput
                id="name"
                name="name"
                type="text"
                placeholder="Item name"
                required
                onChange={handleItemName}
                minLength={3}
                maxLength={30}
              />
               {itemNameError && (
                <div className="font-semibold text-red-600 ">{itemNameError}</div>
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
              <TextInput onChange={handleQty} id="qty" name="qty" type="number" required />
              {itemQtyError && (
                <div className="font-semibold text-red-600 ">{itemQtyError}</div>
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
                onChange={handlePrice}
                placeholder="Item price"
                required
                minLength={1}
                maxLength={10}
              />
              {itemPriceError && (
                <div className="font-semibold text-red-600 ">{itemPriceError}</div>
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
                onChange={handleDescription}
                rows={5}
                maxLength={1000}
              />
              {descriptionError && (
                <div className="font-semibold text-red-600 ">{descriptionError}</div>
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

          <Button type="submit" disabled={!fileUploaded || itemNameError || itemQtyError || itemPriceError || descriptionError} className="w-40 bg-red-500 shadow-lg ">
            <p className="text-lg font-bold">Add Product</p>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;

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
