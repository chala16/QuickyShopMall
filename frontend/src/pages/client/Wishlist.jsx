import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Import components
import NavBar from "../../components/home/Navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ItemBox from "../../components/wishlist/ItemBox";

const Wishlist = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");

    // Redirect to login page if user is not logged in
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    const fetchItems = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/wishlist/read", {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (response.ok) {
        setItems(json.items);
      } else {
        console.log("Something went wrong while fetching Wishlist items");
      }
    };

    fetchItems();
  }, []);

  // Handle deleting an item from the wishlist
  const handleDelete = async (itemId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3000/api/wishlist/delete-item/${itemId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Remove the deleted item from the state
        setItems((prevItems) =>
          prevItems.filter((item) => item.itemId !== itemId)
        );
      } else {
        console.log("Failed to delete the item (frontend)");
      }
    } catch (error) {
      console.log("Error while deleting the item:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <main className="flex justify-center py-8">
          <div className="space-y-4">
            {/* Add a check to ensure `items` is an array before mapping */}
            {Array.isArray(items) && items.length > 0 ? (
              items.map((item) => (
                <ItemBox
                  key={item.itemId}
                  item={item}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <div className="flex flex-col items-center p-4 space-y-2 text-center md:space-y-4">
                <p className="text-sm sm:text-base md:text-lg">
                  Your wishlist is as empty as my coffee cup—time to fill it up!
                  ☕
                </p>
                <a
                  href="/client/dashboard/shops"
                  className="text-blue-500 hover:underline"
                >
                  ➡️ Explore the shops
                </a>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
