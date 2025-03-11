import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Links from "./components/Links";
import Messages from "./components/Messages";

function App() {
  return (
    <Router>
      <Header />
      <SearchBar />
      <Links />
      <Messages />
    </Router>
  );
}

export default App;