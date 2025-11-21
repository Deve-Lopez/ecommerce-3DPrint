import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [orden, setOrden] = useState("Relevante")
 
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch("http://localhost/3dprint/server/get_product.php");
                if (!response.ok) throw new Error("Error al cargar los productos");
                const data = await response.json();
                setProductos(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchProductos();
    }, []);

    const handleOrdenChange = (e) =>{
        setOrden(e.target.value);
    }

    const productosOrdenados = [...productos].sort((a,b) => {
        if(orden === "Precio: Menor a Mayor"){
            return a.precio - b.precio
        } if (orden === "Precio: Mayor a Menor"){
            return b.precio - a.precio
        }
        return 0;
    });

    return (
        <div className="shop-layout">
            {/* Sidebar de Filtros */}
            <aside className="sidebar">
                <h2 className="sidebar__title">Filtros</h2>
                <div className="filter-group">
                    <h3 className="filter-group__title">Categorías</h3>
                    {["Filamentos", "Resinas", "Impresoras", "Escáner 3D", "Repuestos", "Herramientas"].map((cat) => (
                        <label key={cat} className="filter-option">
                            <input type="checkbox" />
                            <span>{cat}</span>
                        </label>
                    ))}
                </div>
            </aside>

            {/* Área Principal */}
            <main className="main-content">
                <header className="content-header">
                    <h2 className="content-header__title">Todos los productos</h2>
                    <div className="sort-control">
                        <label>Ordenar por:</label>
                        <select onChange={handleOrdenChange} value={orden}>
                            <option>Relevante</option>
                            <option>Precio: Menor a Mayor</option>
                            <option>Precio: Mayor a Menor</option>
                        </select>
                    </div>
                </header>

                <div className="product-grid">
                    {error ? (
                        <p className="error-message">{error}</p>
                    ) : (
                        productosOrdenados.map((producto) => (
                            /* Aquí llamamos al componente hijo */
                            <ProductCard key={producto.id} producto={producto} />
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProductList;