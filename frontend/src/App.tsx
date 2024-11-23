import "./global.css";

import { AuthProvider } from "./contexts/auth";
import { AppRouter } from "./routes";

function App() {
  return (
    <>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </>
  );
}

export default App;
