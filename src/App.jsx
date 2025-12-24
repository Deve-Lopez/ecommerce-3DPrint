import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import DetailsProduct from "./Components/DetailsProduct/DetailsProduct"
import MiCuenta from "./Components/MiCuenta/MiCuenta"
import Register from "./Components/Register/Register"
import Home from "./Components/Home/Home"
import Contacto from "./Components/Contacto/Contacto" 

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={ <Home/> }/> 
          <Route path="/producto/:id" element={<DetailsProduct />} />
          <Route path="/micuenta" element={<MiCuenta />} />           
          <Route path="/registro" element={<Register />} />
          <Route path="/contacto" element={<Contacto/>}/> 

        </Routes>
      </Router>
    </>
  )
}

export default App