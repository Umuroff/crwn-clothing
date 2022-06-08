import logo from './logo.svg';
import './App.css';
import {Route,Routes} from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./components/shop/shop.component";
import Header from "./components/header/header.component";
import SingInAndSignUpPage from "./pages/sign-in-and-sing-up/sign-in-and-sing-up.component";
import {auth, createUserProfileDocument} from "./firebase/firebase.utils";
import {Component} from "react";
import {connect} from "react-redux";
import {setCurrentUser} from "./redux/user/user.actions";


class App extends Component {

    unsubscribeFromAuth = null

    componentDidMount() {
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            }

            setCurrentUser(userAuth);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }


    render() {
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
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user =>dispatch(setCurrentUser(user))
})

export default connect(null,mapDispatchToProps)(App);
