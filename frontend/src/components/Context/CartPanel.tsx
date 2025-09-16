import { useCart } from "./CartContext";

type CartPanelProps = {
  onClose: () => void;
};

export default function CartPanel({ onClose }: CartPanelProps) {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="cart-panel">
      <h2>Tu carrito</h2>

      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              <img src={item.img} alt={item.nombre} width={50} />
              <span>{item.nombre}</span>
              <span>Cant: {item.cantidad}</span>
              <span>{item.precio}</span>
              <button onClick={() => removeFromCart(item.id)}>➖</button>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <button onClick={clearCart}>Vaciar carrito</button>
      )}

      <button onClick={onClose}>Cerrar carrito</button>
    </div>
  );
}
