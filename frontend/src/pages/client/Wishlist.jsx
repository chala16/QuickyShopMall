import { useEffect, useState } from "react"
import { useNavigate } from "react-router";

// Import components
import NavBar from "../../components/home/Navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ItemBox from "../../components/wishlist/ItemBox";

const Wishlist = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState(null)

    useEffect(() => {
        const user = localStorage.getItem('user')

        // Redirect to login page if user is not logged in
        if (!user) {
            navigate('/login', { replace: true })
            return
        }

        const fetchItems = async () => {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:3000/api/wishlist/read', {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()

            if (response.ok) {
                setItems(json.items)
            } else {
                console.log('Something went wrong while fetching Wishlist items')
            }
        }

        fetchItems()
    }, [])

    return (
        <div>
            <NavBar />
            <main className="flex justify-center py-6">
                <div className="space-y-4">
                    {/* Add a check to ensure `items` is an array before mapping */}
                    {Array.isArray(items) && items.length > 0 ? (
                        items.map((item) => (
                            <ItemBox key={item.name} item={item} />
                        ))
                    ) : (
                        <p>No items in your wishlist.</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Wishlist