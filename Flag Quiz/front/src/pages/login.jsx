import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../contexts/UserContext';


function Login() {
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = () => {
    fetch(`http://127.0.0.1:8000/auth/login/${username}/`, { method: "GET" })
      .then(res => res.json())
      .then(data => {
        setUser(data);      // On stocke l'utilisateur
        navigate("/quiz");   // Redirection vers la page quiz
      })
      .catch(error => {
        console.error("Erreur de login :", error);
        alert(`Utilisateur ${username} non trouvé.`);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Player</label>
        <input
          type="text"
          className="input focus:outline-none"
          value={username}
          onChange={(e) => setUserName(e.target.value)} // 🔧 lié à state
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          placeholder="Username"
        />

        <button onClick={handleLogin} className="btn btn-neutral mt-4" disabled={username.trim()==""}>
          Login
        </button>
      </fieldset>

      <span>
        I don't have an Account.{" "}
        <a href="/" className="link link-neutral text-blue-500 hover:text-black dark:text-white-500">Sign In</a>
      </span>
    </div>
  );
}

export default Login;
