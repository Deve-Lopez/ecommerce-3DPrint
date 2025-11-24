import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// ❌ ELIMINAR: import Home from "./Components/Home/Home" 
// 🟢 AÑADIR:
import ProductList from "./Components/ProductList/ProductList" 
import Navbar from "./Components/Navbar/Navbar"
import DetailsProduct from "./Components/DetailsProduct/DetailsProduct"


function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={ <ProductList/> }/> 
          
          <Route path="/producto/:id" element={<DetailsProduct />} />
          
        </Routes>
      </Router>
    </>
  )
}

export default App