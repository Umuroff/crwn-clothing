import logo from './logo.svg';
import './App.css';
import {Route,Routes} from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";

const HatsPage = props => (

    <div>
        <h1>Home page</h1>
    </div>
    )





function App() {
  return (
    <div className="App">
    <Routes>
        <Route  path="/" element={<HomePage/>}/>
        <Route  path="/hats" element={<HatsPage/>}/>
    </Routes>
    </div>
  );
}

export default App;
