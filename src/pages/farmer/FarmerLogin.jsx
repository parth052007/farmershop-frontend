import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FarmerLogin() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav = useNavigate();

  const login = async () => {
    const res = await fetch("https://farmer-shop-backend.onrender.com",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({email,password})
    });
    const farmer = await res.json();
    localStorage.setItem("farmer", JSON.stringify(farmer));
    nav("/farmer/dashboard");
  };

  return (
    <div>
      <h2>Farmer Login</h2>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} /><br/>
      <button onClick={login}>Login</button>
    </div>
  );
}
