import { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from '../contexts/UserContext';

// pages/Quiz.jsx
function Quiz() {
    const [country,setCountry] = useState({});
    const [allInfos,setInfos] = useState([]);
    const [countryName,setCountryName] = useState('');
    const [showAlert,setAlert] = useState(false);
    const { user } = useUser();
    const [counter, setCounter] = useState(20);
    const [validate,setValidate] = useState(false);
    const [points, setPoints] = useState(0);
    const [prevName,setprevName] = useState("");
    const [tour,setTour] = useState(0);
    const [chances ,setChances] = useState(5);
    const [region,setregion] = useState("africa");
    const navigate = useNavigate()
    let maxTry;
    let regions;
    maxTry = 20;
    regions = ["africa","europe","america","asia"]

    const updatePoints = ()=>{
        fetch(`http://192.168.100.3:8000/auth/changParams/${user.username}/`,
            {
                method:"PUT",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(
                    {
                        id:user.id,
                        username:user.username,
                        name:user.name,
                        surname:user.surname,
                        points:points
                    }
                )
            }
        ).then(res=>res.json())
        .then(data=>console.log(data))  
        
       
    }
    function validateGame(){
        if(showAlert){
            navigate("/classements");
        }
    }
    function findCountry(){
        fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then(response=>response.json())
        .then(data=>{
            let pays;
            if (data) {
                pays = data[Math.floor(Math.random()*data.length)];
            }
            setCountry(pays);
            setCounter(20);
            setValidate(false);
        })
    }
    useEffect(()=>{
        findCountry();
    },[]) // Lancement au démarrage
    useEffect(()=>{
        if (counter === 0){
            setTour(tour+1);
            setChances(chances-1);
            setprevName(country?.translations?.fra?.common)
            if (chances == 1){
                updatePoints();
                setAlert(true);
            }
            if(tour+1==maxTry){
                setTour(0);
                setregion(regions[Math.floor(Math.random()*regions.length)]);
                setChances(5);
                setprevName("");
                setCounter(30);
            }
            return;
        }
        const timer = setTimeout(()=>{
            setCounter(prevCounter=>prevCounter - 1);
        },1000);

        return ()=>clearTimeout(timer);

    },[counter]) // Counter
    useEffect(()=>{
        if (counter === 0 || validate === true ){   
            findCountry();
        }
    },[counter,validate])
    function validerRightName(){
        setCountryName('');
        if (country.translations.fra.common.toLowerCase() === countryName.toLowerCase()){
            setPoints(points+1);
            setTour(tour+1);
            setValidate(true);
        }
        else{
            alert("Faux");
            setCountryName(country.translations.fra.common[0]);
        }
    }
    return (
        <div>
            {showAlert && 
            <div role="alert" className="alert alert-vertical sm:alert-horizontal fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-fit shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info h-6 w-6 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Bien Joué joueur { user.username }. Tu as totalisé {points}. </span>
                <div>
                    <button className="btn btn-sm" onClick={()=>validateGame()}>OK</button>
                </div>
            </div>}
            { showAlert==false && 
            <div>
                <div className="navbar bg-base-100 shadow-sm max-[430px]:flex-col">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">
                        <h1 className="text-2xl font-sans font-bold"><span className="loading loading-infinity loading-xl"></span>FLAGQUIZZ.</h1>
                    </a>
                </div>
                <div className="flex gap-2 rating gap-1 items-center">
                    <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" aria-label="1 star" checked={chances >= 1} readOnly />
                    <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" aria-label="2 star" checked={chances >= 2} readOnly />
                    <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" aria-label="3 star" checked={chances >= 3} readOnly />
                    <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" aria-label="4 star" checked={chances >= 4} readOnly />
                    <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" aria-label="5 star" checked={chances >= 5} readOnly />
                    
                    <div role="button" className="btn btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex items-center justify-center mt-10 flex-col">
                <h1 className="text-2xl font-sans mb-5">Bonjour Mr { user.surname } { user.name }.</h1>
                {prevName !="" && <p>C'était {prevName}.</p>}
                <p className="text-bold text-red-500">Points: {points} </p>
                <div className="card bg-base-100 w-150 max-sm:w-[100vw] max-sm:px-3 shadow-lg indicato">
                    <span className="indicator-item badge badge-neutral">{ tour }/20</span>
                    <figure>
                        <img
                            src={country?.flags?.png}
                            alt="Country..." />
                    </figure>
                    <div className="card-body max-[430px]:p-3 max-[310px]:p-0">
                        <h2 className="card-title">Country Card</h2>
                        <p className="text-center"><input type="text" placeholder="Country's Name" onKeyDown={e=>{
                            if (e.key === 'Enter') {
                                validerRightName();
                            }
                        }} className="input focus:outline-none" value={countryName} onChange={(e)=>setCountryName(e.target.value)} /></p>
                        <div className="grid grid-cols-2 justify-items-center items-center p-3 mt-3 max-[310px]:p-0 max-[310px]:mt-0">
                            <p className="justify-self-start"><span className="font-semibold">Region: </span>{ country?.region }</p>
                            <p className="capital justify-self-end"><span className="font-semibold">Monnaie: </span>{ Object.keys(country?.currencies || {})[0] }</p>
                        </div>
                        <div className="grid grid-cols-2 justify-items-center items-center p-3 max-[310px]:p-0 max-[310px]:mt-0">
                            <p className="justify-self-start region"><span className="font-semibold">Capital: </span>{ country.capital }</p>
                            <p className="capital justify-self-end"><span className="font-semibold">Langue: </span>{ Object.values(country?.languages || {})[0] }</p>
                        </div>
                        <div>
                            <p className="text-center">You have {counter} seconds to answer</p>
                            <div className="flex justify-center">
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>
                        </div>
                        <div className="card-actions justify-center text-center">
                            <button className="btn btn-neutral" onClick={()=>{validerRightName();}} disabled={ countryName.trim() == "" }>Validate</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            }
        </div>           
    );
}

export default Quiz;
