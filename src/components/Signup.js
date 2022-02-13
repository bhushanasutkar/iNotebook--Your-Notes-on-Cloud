import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


const Signup = () => {
    const [credentials, setcredentials] = useState({name:"",email: "", password: "" ,cpassword:""})

    let history= useHistory();
    const handlesubmit = async (e) => {
        e.preventDefault();
       const {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
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
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text"   style={{backgroundColor:"rgb(176 161 180)"}} onChange={handleonchange} className="form-control" name="name" id="name" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email"  style={{backgroundColor:"rgb(176 161 180)"}} onChange={handleonchange} className="form-control"  name="email" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp"  className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"  style={{backgroundColor:"rgb(176 161 180)"}} onChange={handleonchange} name="password" className="form-control" id="password" />
                </div>

                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
                    <input type="password"  style={{backgroundColor:"rgb(176 161 180)"}} onChange={handleonchange}  name="cpassword"  className="form-control" id="cpassword" />
                </div>

                <button type="submit" style={{backgroundColor:"#2d172f"}} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
