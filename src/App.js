import logo from './logo.svg';
import './App.css';
import {Route,Routes} from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./components/shop/shop.component";
import Header from "./components/header/header.component";
import SingInAndSignUpPage from "./pages/sign-in-and-sing-up/sign-in-and-sing-up.component";



function App() {
  return (
    <div className="App">
        <Header/>
    <Routes>
        <Route  path="/" element={<HomePage/>}/>
        <Route  path="/shop" element={<ShopPage/>}/>
        <Route  path="/signIn" element={<SingInAndSignUpPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
