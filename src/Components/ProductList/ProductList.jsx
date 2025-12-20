import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  const [orden, setOrden] = useState("Relevante");
  const [filtros, setFiltros] = useState({ categorias: [] });

  // Paginación
  const [pagina, setPagina] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 15;

  const navigate = useNavigate();

  /* ===============================
     FETCH PRODUCTOS
  ================================ */
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // Convertimos los filtros en query string
        const categoriasQuery = filtros.categorias.join(",");
        const url = `http://localhost/3dprint/server/get_product.php?page=${pagina}&limit=${limit}&categorias=${categoriasQuery}`;

        const response = await fetch(url);

        if (!response.ok) throw new Error("Error al cargar los productos");

        const data = await response.json();

        setProductos(data.productos);
        setTotal(data.total);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProductos();
  }, [pagina, filtros]); // 🔹 Dependencias: pagina y filtros

  /* ===============================
     FILTROS
  ================================ */
  const toggleFiltros = (tipoFiltro, valor) => {
    setFiltros((prev) => {
      const nuevosFiltros = {
        ...prev,
        [tipoFiltro]: prev[tipoFiltro].includes(valor)
          ? prev[tipoFiltro].filter((item) => item !== valor)
          : [...prev[tipoFiltro], valor],
      };

      setPagina(1); // 🔹 Reset de página al cambiar filtro
      return nuevosFiltros;
    });
  };

  /* ===============================
     ORDENACIÓN
  ================================ */
  const handleOrdenChange = (e) => {
    setOrden(e.target.value);
  };

  const productosOrdenados = [...productos].sort((a, b) => {
    if (orden === "Precio: Menor a Mayor") return a.precio - b.precio;
    if (orden === "Precio: Mayor a Menor") return b.precio - a.precio;
    return 0;
  });

  /* ===============================
     NAVEGACIÓN
  ================================ */
  const handleImageclick = (id) => {
    navigate(`/producto/${id}`);
  };

  const totalPaginas = Math.ceil(total / limit);

  /* ===============================
     RENDER
  ================================ */
  return (
    <div className="shop-layout">
      {/* Sidebar de Filtros */}
      <aside className="sidebar">
        <h2 className="sidebar__title">Filtros</h2>
        <div className="filter-group">
          <h3 className="filter-group__title">Categorías</h3>
          {["Filamentos", "Resinas", "Impresoras", "Escaner 3d", "Repuestos", "Herramientas"].map((cat) => (
            <label key={cat} className="filter-option">
              <input
                type="checkbox"
                checked={filtros.categorias.includes(cat)}
                onChange={() => toggleFiltros("categorias", cat)}
              />
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
              <ProductCard
                key={producto.id}
                producto={producto}
                onImageClick={handleImageclick}
              />
            ))
          )}
        </div>

        {/* Paginación */}
        <div className="pagination">
          <button
            disabled={pagina === 1}
            onClick={() => setPagina(pagina - 1)}
          >
            Anterior
          </button>

          <span>
            Página {pagina} de {totalPaginas}
          </span>

          <button
            disabled={pagina === totalPaginas}
            onClick={() => setPagina(pagina + 1)}
          >
            Siguiente
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProductList;
