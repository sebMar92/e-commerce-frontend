import "./App.css";

import {Route, Routes, BrowserRouter} from "react-router-dom"
import Footer from "./Footer/Footer";
function App() {
  /* return <div className="App">TEST</div>; */
  return(
    <BrowserRouter>
    <div>
    <Routes>
      <Route exact path="/" element={<Footer/>}/>
    </Routes>
    </div>
    </BrowserRouter>

  )
}

export default App;
