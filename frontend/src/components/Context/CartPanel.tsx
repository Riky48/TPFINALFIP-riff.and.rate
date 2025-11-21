import React, { useEffect } from "react";
import { useCart } from "./CartContext";
import "./CartPanel.css"; 
import { createPedido } from "../../services/api";

type CartPanelProps = {
  onClose: () => void;
  open: boolean;
  userId: number;
  onBuy: () => void;
};

export default function CartPanel({ onClose, open, onBuy, userId }: CartPanelProps) {
  const { cart, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const total = cart.reduce(
    (suma, item) => suma + item.precio * item.cantidad,
    0
  );

  const handleBuy = async () => {
    try {
      const data = {
        productos: cart.map(item => ({
          id: item.id,
          cantidad: item.cantidad,
        })),
        total,
      };

      await createPedido(userId);

      clearCart();
      alert("Compra realizada con éxito");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al procesar la compra");
    }
  };

  return (
    <>
      <div
        className={`cart-overlay ${open ? "show" : ""}`}
        onClick={onClose}
      />

      <aside className={`cart-panel ${open ? "open" : ""}`}>
        <button className="close-cart" onClick={onClose}>✕</button>

        <h2>Tu carrito</h2>

        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.id} className="cart-item">
                <img src={item.img} alt={item.nombre} />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.nombre}</div>
                  <div className="cart-item-meta">
                    x{item.cantidad} • $
                    {item.precio.toLocaleString("es-AR")}
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  ➖
                </button>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <>
            <p className="total">
              Total: ${total.toLocaleString("es-AR")}
            </p>
            <button className="clear-cart" onClick={clearCart}>
              Vaciar carrito
            </button>
            <button className="buy-cart" onClick={handleBuy}>
              Comprar Todo
            </button>
          </>
        )}
      </aside>
    </>
  );
}
