import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { SocketProvider } from "./socketContext";
import "./index.css"

function App() {
  return(
    <SocketProvider>
      <Header />
      <Main />
      <Footer />
    </SocketProvider>
  )
}

export default App