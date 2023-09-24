import AppLayout from "./layout/AppLayout";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";
import WalletContextProvider from "./contexts/WalletContextProvider";

function App() {
  return (
    <div
      className="App"
      style={{ background: "rgb(2,12,34)", minHeight: "100vh" }}
    >
      <WalletContextProvider>
        <AppLayout />
      </WalletContextProvider>
    </div>
  );
}

export default App;
