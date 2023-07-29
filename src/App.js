import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import AppDashboard from "./components/AppDashboard";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Link to="/login">login</Link>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/user/:param" element={<AppDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
