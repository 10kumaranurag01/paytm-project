import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Sendmoney from "./pages/Sendmoney";
import { Button } from "./components/Button";
import { useNavigate } from "react-router-dom";

function App() {
  function NavigationButton() {
    const navigate = useNavigate();
    return (
      <div className="h-full flex justify-center align-middle w-20">
        <Button
          label={"Get Started"}
          onClick={() => {
            navigate("/signup");
          }}
        />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationButton />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sendmoney" element={<Sendmoney />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
