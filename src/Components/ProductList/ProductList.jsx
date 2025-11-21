import { useEffect, useState } from "react"
import "./ProductList.css"

const BASE_IMAGEN_URL = "http://localhost/3dprint/images/";


const ProductList = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchProductos = async () => {
            try{
                const response = await fetch("http://localhost/3dprint/server/get_product.php");
                if(!response.ok){
                    throw new Error("Error al cargar los productos");
                }
                const data = await response.json();
                setProductos(data);
            }catch(err){
                setError(err.message)
            }
        }
        fetchProductos();
    },[]);


  return (
    <section className="main-content">
        <aside className="filters">
            <h2>Filtros</h2>
            <div className="filters-category">
                <div className="filter-category">
                    <h3>Categorias</h3>
                    <label>
                        <input type="checkbox"/>
                        <span>Filamentos</span>
                    </label>
                    <label>
                        <input type="checkbox"/>
                        <span>Resinas</span>
                    </label>                    
                    <label>
                        <input type="checkbox"/>
                        <span>Impresoras</span>
                    </label>
                    <label>
                        <input type="checkbox"/>
                        <span>Escáner 3D</span>
                    </label>
                    <label>
                        <input type="checkbox"/>
                        <span>Respuestos</span>
                    </label>
                    <label>
                        <input type="checkbox"/>
                        <span>Herramientas</span>
                    </label>
                </div>
            </div>
        </aside>
        <main className="collections">
            <div className="options">
                <h2>TODOS LOS PRODUCTOS</h2>
                <div className="sort-options">
                    <label>
                        Ordenar por:
                        <select>
                            <option>Relevante</option>
                            <option>Precio: Menor a Mayor</option>
                            <option>Precio: Mayor a Menor</option>
                        </select>                    
                    </label>
                </div>
            </div>

            <div className="products">
                {error ? (
                    <p className="error-message">{error}</p>
                ):(
                    productos.map((producto) => (
                        <div className="product-card" key={producto.id}>
                            <img src={`${BASE_IMAGEN_URL}${producto.imagen_url}`} 
                            alt={producto.nombre}
                            className="product-image"
                            />

                            <h3>{producto.nombre}</h3>
                            <p>{producto.precio}€</p>
                        </div>
                    ))
                )}
            </div>

        </main>
    </section>
  )
}

export default ProductList