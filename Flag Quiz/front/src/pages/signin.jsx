import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from '../contexts/UserContext';

function SignIn() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const { setUser } = useUser();
  let isFormValid; 


  const navigate = useNavigate();

  const handleSign = () => {
    fetch("http://192.168.100.3:8000/auth/signin/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        name,
        surname,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'inscription");
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        navigate("/quiz");
      })
      .catch((error) => {
        alert(error);
        console.error("Erreur :", error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Sign In</legend>

        <label className="label">Username</label>
        <input
          type="text"
          className="input focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />

        <label className="label">Name</label>
        <input
          type="text"
          className="input focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <label className="label">Surname</label>
        <input
          type="text"
          className="input focus:outline-none"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Surname"
        />
        {isFormValid = username.trim()=="" && name.trim()=="" && surname.trim()==""}
        <button className="btn btn-neutral mt-4" onClick={handleSign} disabled={isFormValid}>
          Sign In
        </button>
      </fieldset>
      <span>
        I have an Account.{" "}
        <a
          href="/login"
          className="link link-neutral text-blue-500 hover:text-black dark:text-white-500"
        >
          Log In
        </a>
      </span>
    </div>
  );
}

export default SignIn;
