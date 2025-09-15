import { useCart } from "./CartContext";
import "../../styles/Cart.css";

export function CartPanel() {
  const { cart, removeFromCart } = useCart();

  const handleCheckout = () => {
    alert("Gracias por tu compra 🥁🎸 (todavía no está conectado a un backend)");
  };

  return (
    <div className="cart-panel">
      <h3>Tu Carrito</h3>
      {cart.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.img} alt={item.nombre} />
                <div>
                  <p>{item.nombre}</p>
                  <p>${item.precio}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)}>❌</button>
              </li>
            ))}
          </ul>
          <hr />
          <div className="cart-footer">
            <p>
              <strong>Total:</strong> $
              {cart.reduce((total, item) => total + item.precio, 0)}
            </p>
            <button className="checkout-btn" onClick={handleCheckout}>
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}
