import { useState } from "react";
import "./ProductCard.css";

const BASE_IMAGEN_URL = "http://localhost/3dprint/images/";

const ProductCard = ({ producto }) => {
    const [cantidad, setCantidad] = useState(0);

    // 🎯 NUEVA VARIABLE para verificar si hay stock
    const isAvailable = producto.stock > 0;
    // 🎯 NUEVA VARIABLE para verificar si está agotado
    const isOutOfStock = producto.stock === 0;

    // Las funciones de incremento/decremento se mantienen igual.
    const handleIncrement = () => setCantidad(prev => prev + 1);
    const handleDecrement = () => setCantidad(prev => (prev > 0 ? prev - 1 : 0));

    // Si el producto está agotado, forzamos la cantidad a 0 al renderizar.
    // Esto es una medida de seguridad, aunque el UI lo maneje.
    // Aunque técnicamente no es necesario forzar la cantidad a 0 aquí si se usa bien el 'disabled'.

    return (
        <article className="product-card">
            {/* ... Imagen y Títulos ... */}
            <div className="product-card__image-wrapper">
                <img
                    src={`${BASE_IMAGEN_URL}${producto.imagen_url}`}
                    alt={producto.nombre}
                    className="product-card__image"
                />
            </div>

            <div className="product-card__info">
                <h3 className="product-card__title">{producto.nombre}</h3>
                <p className="product-card__price">{producto.precio}€</p>

                <div className="quantity-selector">
                    <span className="quantity-selector__label">Cantidad:</span>
                    <div className="quantity-selector__controls">

                        {/* 🎯 CAMBIO CLAVE: Aplicamos la propiedad 'disabled' */}
                        <button
                            onClick={handleDecrement}
                            className="btn-quantity"
                            disabled={!isAvailable || cantidad === 0} // Deshabilitado si no está disponible O si la cantidad es 0
                        >
                            -
                        </button>

                        <span className="quantity-display">{cantidad}</span>

                        {/* 🎯 CAMBIO CLAVE: Aplicamos la propiedad 'disabled' */}
                        <button
                            onClick={handleIncrement}
                            className="btn-quantity"
                            disabled={!isAvailable || cantidad >= producto.stock} // Deshabilitado si no está disponible O si la cantidad ya es el stock máximo
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="stock-alert">
{producto.stock === 0 ? (
        // CAMINO 1: Agotado (Stock es 0)
        <p className="no-stock">
            ¡Agotado!
        </p>
    ) : producto.stock === 1 ? (
        // CAMINO 2: Última Unidad (Stock es 1)
        <p className="low-stock">
            ¡ÚLTIMA UNIDAD!
        </p>
    ) : producto.stock > 1 && producto.stock < 10 ? (
        // CAMINO 3: Stock bajo (Stock es entre 2 y 9)
        <p className="low-stock">
            ¡Solo quedan {producto.stock} unidades!
        </p>
    ) : (
        // CAMINO 4: Stock suficiente (Stock >= 10)
        null                    )}
                </div>            </div>
        </article>
    );
};

export default ProductCard;