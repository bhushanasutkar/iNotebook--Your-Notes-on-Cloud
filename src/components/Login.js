import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const [credentials, setcredentials] = useState({email: "", password: "" })

    let history= useHistory();
    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST', 

            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
         localStorage.setItem('token',json.authtoken)
         history.push("/");
        }
        else{
            alert("Invalid Credentials");
        }
    }
    const handleonchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={handleonchange} className="form-control" value={credentials.email} name="email" id="email" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" onChange={handleonchange} className="form-control" value={credentials.password} name="password" id="password" />
                </div>

                <button type="submit" onSubmit={handlesubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
