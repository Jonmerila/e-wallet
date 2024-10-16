import Navigation from './components/Navigation'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePage';
import CardConfig from './components/CardConfig';
import CardPage from './components/CardPage';
import {Provider} from "react-redux";
import store from './redux/store';
import './App.css'

function App() {
  

  return (
    <>
    <Provider store={store}>
      <h1>E-wallet</h1>
      <Router>
        <Navigation/>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/addcard" element={<CardConfig/>}></Route>
          <Route path="/card/:id" element={<CardPage/>}></Route>
          {/* <Route path="/" element={}></Route> */}
        </Routes>

      </Router>
    </Provider>
    </>
  )
}

export default App
