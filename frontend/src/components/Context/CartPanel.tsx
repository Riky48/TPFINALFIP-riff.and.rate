import React, { useEffect } from "react";
import { useCart } from "./CartContext";
import "./CartPanel.css"; // <- IMPORTAR obligatoriamente

type CartPanelProps = {
  onClose: () => void;
  open: boolean;
};

export default function CartPanel({ onClose, open }: CartPanelProps) {
  const { cart, removeFromCart, clearCart } = useCart();

  // debug rápido: ver estado en consola al abrir/cerrar
  useEffect(() => {
    console.log("CartPanel open:", open, "cart length:", cart.length);
  }, [open, cart.length]);

  // cerrar con ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`cart-overlay ${open ? "show" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        className={`cart-panel ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <button
          className="close-cart"
          onClick={() => {
            console.log("close clicked");
            onClose();
          }}
          aria-label="Cerrar carrito"
        >
          ✕
        </button>

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
                  <div className="cart-item-meta">x{item.cantidad} • ${item.precio}</div>
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
          <button className="clear-cart" onClick={clearCart}>
            Vaciar carrito
          </button>
        )}
      </aside>
    </>
  );
}
