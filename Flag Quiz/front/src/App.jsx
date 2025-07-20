// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext, UserProvider, useUser } from "./contexts/UserContext.jsx";
import Quiz from "./pages/quiz";
import Login from "./pages/login";
import Signin from "./pages/signin";
import Classements from "./pages/classements";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Signin />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/classements" element={<Classements />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
