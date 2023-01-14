import "./App.css";
import { Home, MyProfile, ListedItems } from "./Pages";
import { Navbar } from "./Components";
import { Routes, NavLink, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/listeditems" element={<ListedItems />} />
          <Route path="*" element={<div>
            <h1>404 Not Found</h1>
            <NavLink to="/">Go Home</NavLink>
            </div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
