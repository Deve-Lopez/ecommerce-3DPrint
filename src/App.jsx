import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import ProductList from "./Components/ProductList/ProductList" 
import DetailsProduct from "./Components/DetailsProduct/DetailsProduct"
import MiCuenta from "./Components/MiCuenta/MiCuenta"
import Register from "./Components/Register/Register" 

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={ <ProductList/> }/> 
          <Route path="/producto/:id" element={<DetailsProduct />} />
          <Route path="/micuenta" element={<MiCuenta />} />           
          <Route path="/registro" element={<Register />} /> 

        </Routes>
      </Router>
    </>
  )
}

export default App