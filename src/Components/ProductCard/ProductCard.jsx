import { useState } from "react";
import "./ProductCard.css";
// ❌ IMPORTANTE: Eliminamos la importación de `useNavigate` ya que el padre maneja la navegación.

const BASE_IMAGEN_URL = "http://localhost/3dprint/images/";

// 🟢 CORREGIDO: Recibimos 'onImageClick' como prop del componente padre
const ProductCard = ({ producto, onImageClick }) => {
    
    // ❌ Eliminamos la línea: const navigate = useNavigate()
    
    const [cantidad, setCantidad] = useState(0);

    // Variables de estado
    const isAvailable = producto.stock > 0;
    // const isOutOfStock = producto.stock === 0; // Se puede simplificar

    // Funciones de control de cantidad
    const handleIncrement = () => setCantidad(prev => prev + 1);
    const handleDecrement = () => setCantidad(prev => (prev > 0 ? prev - 1 : 0));

    // ❌ Eliminamos la función handleImagenClick interna

    return (
        <article className="product-card">
            
            <div className="product-card__image-wrapper">
                <img
                    src={`${BASE_IMAGEN_URL}${producto.imagen_url}`}
                    alt={producto.nombre}
                    className="product-card__image"
                    // 🟢 CORRECCIÓN CLAVE: Llamamos a la función recibida por prop
                    // Esta función (onImageClick) es la que hace el `Maps()`
                    onClick={() => onImageClick(producto.id)} 
                />
            </div>

            <div className="product-card__info">
                <h3 className="product-card__title">{producto.nombre}</h3>
                <p className="product-card__price">{producto.precio}€</p>

                <div className="quantity-selector">
                    <span className="quantity-selector__label">Cantidad:</span>
                    <div className="quantity-selector__controls">

                        <button
                            onClick={handleDecrement}
                            className="btn-quantity"
                            // Deshabilitado si no hay stock O si la cantidad es 0
                            disabled={!isAvailable || cantidad === 0} 
                        >
                            -
                        </button>

                        <span className="quantity-display">{cantidad}</span>

                        <button
                            onClick={handleIncrement}
                            className="btn-quantity"
                            // Deshabilitado si no hay stock O si ya alcanzó el stock máximo
                            disabled={!isAvailable || cantidad >= producto.stock} 
                        >
                            +
                        </button>

                        
                    </div>
                </div>

                <div className="stock-alert">
                    {producto.stock === 0 ? (
                        // CAMINO 1: Agotado
                        <p className="no-stock">
                            ¡Agotado!
                        </p>
                    ) : producto.stock === 1 ? (
                        // CAMINO 2: Última Unidad
                        <p className="low-stock">
                            ¡ÚLTIMA UNIDAD!
                        </p>
                    ) : producto.stock > 1 && producto.stock < 10 ? (
                        // CAMINO 3: Stock bajo
                        <p className="low-stock">
                            ¡Solo quedan {producto.stock} unidades!
                        </p>
                    ) : (
                        // CAMINO 4: Stock suficiente
                        null)}
                </div>
            </div>
        </article>
    );
};

export default ProductCard;