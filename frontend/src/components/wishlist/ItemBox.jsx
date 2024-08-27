const ItemBox = ({ item }) => {
  return (
    <div className="bg-100 p-6 mb-4 w-full max-w-xl flex items-start space-x-4">
      <div className="flex-shrink-0">
        <img src={item.image} alt="item-image" className="w-24 h-24 object-cover rounded"></img>
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
        <p className="text-gray-600 mb-1">Price: Rs.{item.price.toFixed(2)}</p>
        <p className="text-gray-600 mb-1">Stock Available: {item.inStock}</p>
        <p className="text-gray-600">Shop: {item.shopName}</p>
        <p className="text-gray-600">Floor: {item.shopFloorNo}</p>
      </div>
    </div>
  )
}

export default ItemBox