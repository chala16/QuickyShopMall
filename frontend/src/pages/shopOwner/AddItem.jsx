import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Navbar from "../../components/home/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import bg from "../../images/viewAdminBG.jpg";
import upload from "../../images/upload.jpg";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AddItem = () => {
  const { user } = useAuthContext();
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
    setPostImage( base64 );
  };

  const handleAddItem = (event) => {
    event.preventDefault();
    if (!user) {
      setError("You must be logged in");
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
        navigate("/shopOwner/dashboard");
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "50% 10%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Navbar />
      <div className=" h-[100vh] px-44">
        <div className="flex mt-8 justify-between p-6 mb-6 mr-[820px] rounded-xl bg-client-brown">
          <h2 className="text-3xl font-bold text-white ">Add a item</h2>
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
                  className="text-lg text-white"
                />
              </div>
              <TextInput
                id="name"
                name="name"
                type="text"
                placeholder="Item name"
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
                  className="text-lg text-white"
                />
              </div>
              <TextInput id="qty" name="qty" type="number" required />
            </div>
          </div>

          {/* second row */}
          <div className="flex gap-8">
            <div className="lg:w-1/2">
              <div className="block mb-2">
                <Label
                  htmlFor="price"
                  value="Item Price"
                  className="text-lg text-white"
                />
              </div>
              <TextInput
                id="price"
                name="price"
                type="number"
                placeholder="Item price"
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
                  className="text-lg text-white"
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
                  className="text-lg text-white"
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
              />
            </div>
            <div className="lg:w-1/2">
              <div className="block mt-10 mb-2">
                <Label
                  htmlFor="file-upload"
                  className="m-auto custom-file-upload"
                >
                  <img className="w-16" src={upload} alt="" />
                </Label>
                <input
                  className="mt-4 text-white bg-black"
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

          <Button type="submit" className="mt-5 bg-red-500">
            <p className="text-lg font-bold">Add Item</p>
          </Button>

          <Button className="bg-blue-600 ">
            <Link to={`/shopOwner/dashboard`}>
              <p className="text-lg font-bold">Go Back</p>
            </Link>
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
