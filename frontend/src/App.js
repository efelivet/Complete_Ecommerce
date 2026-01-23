import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Checkout from "./Checkout";
import PaymentSuccess from "./PaymentSuccess";
import SingleProduct from "./SingleProduct";
import Register from "./Register"
import Login from "./Login"
function App() {
  return (
   <BrowserRouter>
     <Routes>
      <Route path="/" element={  <Home/>} />
       <Route path="/checkout" element={<Checkout />} />
       <Route path="/paymentsuccess" element={<PaymentSuccess />} />
       <Route path="/singleproduct/:id" element={<SingleProduct />} />
       <Route path="/register" element={<Register />} />
       <Route path="/login" element={<Login />} />
     </Routes>
    
    </BrowserRouter>
  );
}

export default App;
