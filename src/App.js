import logo from './logo.svg';
import './App.css';
import {Route,Routes} from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./components/shop/shop.component";
import Header from "./components/header/header.component";
import SingInAndSignUpPage from "./pages/sign-in-and-sing-up/sign-in-and-sing-up.component";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
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
       this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
            // this.setState({currentUser:user});
          if (userAuth){
              const userRef = await createUserProfileDocument(userAuth)

              userRef.onSnapshot(snapshot => {
                  this.setState({
                      currentUser:{
                          id:snapshot.id,
                          ...snapshot.data()
                      }
                  });
                  console.log(this.state)
              })
          }
          else this.setState({currentUser:userAuth})
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
