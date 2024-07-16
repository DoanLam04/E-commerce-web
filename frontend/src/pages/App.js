import "../assets/sass/app.scss";
import Footer from "../Layouts/Footer";
import Header from "../Layouts/Header";
import Nav from "../Layouts/Nav";
import Main from "../Layouts/Main";
import QuickView from "../pages/home/QuickView";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isCallbackRoute = location.pathname === "/login";
  return (
    <div>
      <QuickView />
      {!isCallbackRoute && <Header />}
      {!isCallbackRoute && <Nav />}
      <Main />
      {!isCallbackRoute && <Footer />}
    </div>
  );
}

export default App;
