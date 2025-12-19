import { useParams } from "react-router-dom"
import "./DetailsProduct.css"
import { useEffect, useState } from "react"

const BASE_IMAGEN_URL = "http://localhost/3dprint/images/";

const DetailsProduct = () => {
    const { id } = useParams() 
    const [producto, setProducto] = useState(null)
    const [error, setError] = useState(null)
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        if (!id) {
            setError("Error: No se proporcionó ID del producto en la URL.");
            return;
        }

const fetchProducto = async () => {
            setError(null);
            try {
                const url = `http://localhost/3dprint/server/get_product_by_id.php?id=${id}`; 
                const response = await fetch(url);
                
                if (!response.ok) {
                    const errorData = await response.json(); 
                    throw new Error(errorData.mensaje || `Error ${response.status}: Falló la carga.`);
                }
                
                const data = await response.json();
                
                if (data.error || !data.id) { 
                    throw new Error(data.mensaje || "El producto no fue encontrado.");
                }

                setProducto(data);
                setCantidad(1); // Resetear la cantidad seleccionada al cargar un nuevo producto
            } catch (err) {
                setError(err.message);
                setProducto(null);
                setCantidad(0);
            }
        };
        fetchProducto();
    }, [id]);

    // 🟢 NUEVO: Funciones de control de cantidad
    const handleIncrement = () => {
        if (producto && cantidad < producto.stock) {
            setCantidad(prev => prev + 1);
        }
    };
    const handleDecrement = () => {
        if (cantidad > 1) {
            setCantidad(prev => prev - 1);
        }
    };
    
    // 🟢 NUEVO: Función para añadir al carrito (Placeholder)
    const handleAddToCart = () => {
        if (cantidad > 0) {
            console.log(`Añadiendo ${cantidad}x ${producto.nombre} (ID: ${producto.id}) al carrito.`);
            // Aquí iría la lógica real para añadir al estado global del carrito
        }
    };

    // 5. Renderizado de error
    if (error) {
        return <h2 className="error-message">Error: {error}</h2>
    }
    
    // Mostramos 'Cargando...'
    if (!producto) {
        return <p>Cargando producto ...</p>
    }

    const isAvailable = producto.stock > 0;
    const isLowStock = producto.stock > 0 && producto.stock < 10;
    const isOutOfStock = producto.stock === 0;

    // 6. Renderizado final (Solo una imagen)
// 6. Renderizado final
    return (
        <div className="product-details">
            <>
                {/* Imagen principal */}
                <img 
                    src={`${BASE_IMAGEN_URL}${producto.imagen_url}`} 
                    alt={producto.nombre} 
                    className="image-principal"
                />
                
                <div className="product-infos">
                    <h1 className="product-title">{producto.nombre}</h1>
                    <p className="product-id">SKU: {producto.sku}</p>
                    <p className="product-category">Categoría: {producto.categoria || 'Impresión 3D'}</p> 
                    
                    <p className="price">{producto.precio}€</p>
                    
                    <div className="stock-alert-details">
                        {isOutOfStock ? (
                            <p className="status-no-stock">¡AGOTADO!</p>
                        ) : producto.stock === 1 ? (
                            <p className="status-low-stock">¡ÚLTIMA UNIDAD!</p>
                        ) : isLowStock ? (
                            <p className="status-low-stock">¡Solo quedan {producto.stock} unidades!</p>
                        ) : (
                            <p className="status-in-stock">En Stock</p>
                        )}
                    </div>
                    
                    <p className="descripcion">{producto.descripcion}</p>

                    {/* 🟢 NUEVO: Selector de cantidad */}
                    {!isOutOfStock && (
                        <div className="quantity-and-add">
                            <div className="quantity-selector-details">
                                <button
                                    onClick={handleDecrement}
                                    className="btn-quantity-details"
                                    disabled={cantidad <= 1} 
                                >
                                    −
                                </button>
                                <span className="quantity-display-details">{cantidad}</span>
                                <button
                                    onClick={handleIncrement}
                                    className="btn-quantity-details"
                                    disabled={cantidad >= producto.stock} 
                                >
                                    +
                                </button>
                            </div>
                            
                            {/* 🟢 Botón Añadir al carrito */}
                            <button 
                                onClick={handleAddToCart}
                                className="add-to-cart-details"
                                disabled={cantidad === 0 || isOutOfStock}
                            >
                                Añadir {cantidad > 0 ? `(${cantidad})` : ''} al carrito
                            </button>
                        </div>
                    )}

                </div>
                
                <div className="note-details">
                    Producto 100% original. Envío rápido.
                </div>
            </>
        </div>
    )}

export default DetailsProduct;