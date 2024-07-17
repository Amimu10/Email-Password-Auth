import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import auth from "../../Firebase/firebase.config";


const Register = () => {
    const [user, setUser] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); 
    // const [passwordError, setPasswordError] = useState("");

   const handleRegister = (e) => {
    e.preventDefault();
     const email = e.target.email.value; 
     const password = e.target.password.value;
     if(password.length < 6) {
      setError("Password must be at least 6 characters or longer")
      return; 
     }
     else if(!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) {
       setError("Password must be at least one uppercase & one lowercase characters")
       return; 
     }
        console.log("form submitted", email, password); 

        setError(""); 
        setSuccess(""); 

        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const loggedUser = result.user; 
            setUser(loggedUser); 
            setSuccess("User Created Successfully"); 
            console.log(result.user);
        })
        .catch((error) => {
          setError("Email already in use");
            console.log(error.message);
        })
   }

    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center ">
            <h1 className="text-3xl font-bold mb-5">Register now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            
          </div>
          {
              error && <p className="text-red-800">{error}</p>
          }
          {
            success && <p className="text-green-800">{success}</p>
          }
        </div>
      </div>
    );
};

export default Register;