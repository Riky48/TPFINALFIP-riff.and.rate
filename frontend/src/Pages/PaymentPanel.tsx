import React from "react";
import { useCart } from "../components/Context/CartContext";
import "./PaymentPanel.css";

type PaymentPanelProps = {
  open: boolean;
  onClose: () => void;
};

export default function PaymentPanel({ open, onClose }: PaymentPanelProps) {
  const { cart, clearCart } = useCart();

  const total = cart.reduce((suma, item) => suma + item.precio * item.cantidad, 0);

  if (!open) return null;

  const handlePayment = (method: string) => {
    alert(`Pago con ${method} realizado`);
    clearCart(); // vacía el carrito
    onClose();   // cierra el PaymentPanel
  };

  return (
    <>
      {/* Fondo oscuro */}
      <div className="payment-overlay" onClick={onClose} />

      {/* Modal centrado */}
      <div className="payment-panel">
        <button className="close-payment" onClick={onClose}>✕</button>
        <h2>Confirmar Compra</h2>

        {/* Listado de productos */}
        <ul className="payment-list">
          {cart.map(item => (
            <li key={item.id} className="payment-item">
              <img src={item.img} alt={item.nombre} width={50} />
              <div className="payment-item-info">
                <span>{item.nombre}</span>
                <span>x{item.cantidad} • ${item.precio.toLocaleString("es-AR")}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Total */}
        <p className="payment-total">Total: ${total.toLocaleString("es-AR")}</p>

        {/* Botones de método de pago */}
        <div className="payment-methods">
          <button onClick={() => handlePayment("Tarjeta de Crédito")}>Tarjeta de Crédito</button>
          <button onClick={() => handlePayment("Tarjeta de Débito")}>Tarjeta de Débito</button>
          <button onClick={() => handlePayment("MercadoPago")}>MercadoPago</button>
        </div>
      </div>
    </>
  );
}
