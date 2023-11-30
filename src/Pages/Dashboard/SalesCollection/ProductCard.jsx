const ProductCard = ({ item, handleCart }) => {
  const { productName, _id, quantity, discount, sellingPrice, img } =
    item || {};
  return (
    <div className="card w-72 bg-base-100 text-white shadow-xl">
      <figure>
        <img className=" w-full h-40" src={img} alt="product" />
      </figure>
      <div className="card-body pl-4">
        <h2 className="card-title">{productName}</h2>
        <p>
          Product Id: <span className="text-xs">{_id}</span>
        </p>
        <p>Quantity: {quantity}</p>
        <p>Discount: {discount}%</p>
        <p>Price: Tk{sellingPrice}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleCart(item)}
            className="btn btn-outline bg-white text-black ml-3 btn-sm "
            type="submit"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
