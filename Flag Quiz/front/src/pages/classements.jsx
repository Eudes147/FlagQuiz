import { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from '../contexts/UserContext';
// pages/Quiz.jsx
function Classements() {
    const [users,setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        fetch("http://192.168.100.3:8000/auth/dashboard/")
        .then(res=>{
            return res.json();
        })
        .then(data=>{
            setUsers(data);
            console.log(data);
        })
        .catch(error=>alert("Chargement..."))
    },[])
    return (
    <div>
        <h1 className="text-2xl font-sans absolute top-2 left-2 sm:top-7 left-7 font-bold"><span className="loading loading-infinity loading-xl"></span>FLAGQUIZZ.</h1>
        <div className="flex items-center justify-center mt-25 flex-col">
            <h1 className="font-bold text-2xl">Classements</h1>
            <ul className="list bg-base-100 rounded-box shadow-md w-150 max-sm:w-[100vw] max-sm:px-3 mt-5   ">
                <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Best Players</li>
                {users.map((user,index)=>(
                    <li key={user.id} className="list-row">
                        <div className="text-2xl max-[350px]:text-lg font-semibold 2xl tabular-nums">{(index+1).toString().padStart(2,'0')}</div>
                        <div><img className="size-10 max-[350px]:size-5 rounded-box" src="https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"/></div>
                        <div className="list-col-grow">
                            <div className="text-lg max-[350px]:text-base">{user.surname} {user.name}.</div>
                            <div className="text-xs font-semibold text-black-500">@{user.username}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{user.points} points</div>
                        </div>
                        <button className="btn btn-square btn-ghost">
                        <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M6 3L20 12 6 21 6 3z"></path></g></svg>
                        </button>
                    </li>
                )
                )}
  
            </ul>
        <button className="btn btn-warning mt-5" onClick={()=>navigate("/login")}>Retour au Login</button>
        </div>
    </div>
  );
}

export default Classements;
