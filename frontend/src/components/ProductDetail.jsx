import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/temp";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchCartCount } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
useEffect(() => {
  if (product) {
    document.title = `${product.name} - amazon.in`;
  }
}, [product]);
  // 🔹 FETCH PRODUCT
  useEffect(() => {
    fetch(`https://amazon-clone-backend-a7zs.onrender.com/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  // 🔹 ADD TO CART
  const addToCart = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("https://amazon-clone-backend-a7zs.onrender.com/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: product.id,
        quantity: 1,
      }),
    });

    const data = await res.json();

    if (data.error) {
      localStorage.clear();
      navigate("/login");
      return;
    }

    fetchCartCount();
  };

  const buyNow = async () => {
    await addToCart();
    navigate("/cart");
  };

  if (loading) return <h2>Loading...</h2>;

  // 🔥 IMAGE ARRAY (TEMP)
  const images = [
  product.image_url,
  product.image_url + "?v=1",
  product.image_url + "?v=2"
];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div style={{
      display: "flex",
      padding: "30px",
      gap: "40px",
      background: "#eaeded",
      minHeight: "100vh"
    }}>

      {/* 🔥 LEFT - CAROUSEL */}
      <div style={{
        flex: 1,
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center"
      }}>

        {/* MAIN IMAGE */}
        <div style={{ position: "relative" }}>
          <img
            src={images[currentImage]}
            alt="product"
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "contain"
            }}
          />

          {/* LEFT BUTTON */}
          <button
            onClick={prevImage}
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)",
              color: "white",
              border: "none",
              padding: "10px",
              cursor: "pointer"
            }}
          >
            ‹
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={nextImage}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)",
              color: "white",
              border: "none",
              padding: "10px",
              cursor: "pointer"
            }}
          >
            ›
          </button>
        </div>

        {/* 🔥 THUMBNAILS */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          gap: "10px"
        }}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              onClick={() => setCurrentImage(index)}
              style={{
                width: "60px",
                height: "60px",
                objectFit: "contain",
                cursor: "pointer",
                border: currentImage === index
                  ? "2px solid orange"
                  : "1px solid #ccc"
              }}
            />
          ))}
        </div>

      </div>

      {/* 🔹 MIDDLE */}
      <div style={{ flex: 2 }}>
        <h2>{product.name}</h2>

        <h3>₹{product.price}</h3>

        <p style={{ color: "green" }}>In Stock</p>

       <h3>About this item</h3>

<p style={{ marginTop: "10px", lineHeight: "1.6" }}>
  {product.description || "No description available"}
</p>
      </div>

      {/* 🔹 RIGHT */}
      <div style={{
        flex: 1,
        background: "white",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <h2>₹{product.price}</h2>

        <button
          onClick={addToCart}
          style={{
            width: "100%",
            marginTop: "10px",
            background: "#ffd814",
            padding: "10px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Add to Cart
        </button>

        <button
          onClick={buyNow}
          style={{
            width: "100%",
            marginTop: "10px",
            background: "#ffa41c",
            padding: "10px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Buy Now
        </button>
      </div>
      

    </div>
  );
}

export default ProductDetail;