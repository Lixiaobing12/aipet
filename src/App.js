import WalletContextProvider from "./contexts/WalletContextProvider";
import AppLayout from "./layout/AppLayout";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <WalletContextProvider>
        <AppLayout />
      </WalletContextProvider>
    </div>
  );
}

export default App;
