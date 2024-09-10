const ItemBox = ({ item, handleDelete }) => {
  const isInStock = item.inStock > 0

  return (
    <div className="bg-100 p-6 mb-3 w-full max-w-xl flex items-start space-x-4">
      <div className="flex-shrink-0">
        <img src={item.image} alt="item-image" className="w-36 h-28 object-contain rounded"></img>
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <p className="text-gray-600"><b>Price:</b> Rs.{item.price.toFixed(2)}</p>
        <p className="text-gray-600">
          <b>Available:</b> {""}
          <span className={isInStock ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
            { isInStock ? "Yes" : "Out of Stock" }
          </span>
        </p>
        <p className="text-gray-600"><b>Shop:</b> {item.shopName}</p>
        <p className="text-gray-600"><b>Floor:</b> {item.shopFloorNo}</p>
        <button
          onClick={() => { handleDelete(item.itemId) }}
          className="py-1 px-2 bg-red-500 text-white hover:bg-red-700 rounded-md"
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default ItemBox