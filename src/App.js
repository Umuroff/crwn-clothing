import logo from './logo.svg';
import './App.css';
import {Route,Routes} from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./components/shop/shop.component";
import Header from "./components/header/header.component";
import SingInAndSignUpPage from "./pages/sign-in-and-sing-up/sign-in-and-sing-up.component";
import {auth} from "./firebase/firebase.utils";
import {Component} from "react";



class App extends Component {
    constructor() {
        super();
        this.state = {
            currentUser:null
        }
    }
    unsubscribeFromAuth = null

    componentDidMount() {
       this.unsubscribeFromAuth = auth.onAuthStateChanged(user =>{
            this.setState({currentUser:user});

            console.log(user)
        })
    }
    componentWillUnmount() {
        this.unsubscribeFromAuth()
    }

    render() {
        return (
            <div className="App">
                <Header currentUser={this.state.currentUser}/>
                <Routes>
                    <Route  path="/" element={<HomePage/>}/>
                    <Route  path="/shop" element={<ShopPage/>}/>
                    <Route  path="/signIn" element={<SingInAndSignUpPage/>}/>
                </Routes>
            </div>
        );
    }
}

export default App;
