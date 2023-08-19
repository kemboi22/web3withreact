import './App.css'
import Navbar from "./Components/Navbar.jsx";
import Welcome from "./Components/Welcome.jsx";
import Services from "./Components/Services.jsx";
import Transactions from "./Components/Transactions.jsx";
import Footer from "./Components/Footer.jsx";

const App = () => {

    return (
        <>
            <div className={"min-h-screen"}>
                <div className={"gradient-bg-welcome"}>
                    <Navbar/>
                    <Welcome/>
                </div>
                <Services/>
                <Transactions/>
                <Footer/>
            </div>
        </>
    )
}

export default App
