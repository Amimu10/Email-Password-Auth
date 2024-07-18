import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import auth from "../../Firebase/firebase.config";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";


const Register = () => {
    const [user, setUser] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); 
    const [showPassword, setShowPassword] = useState(false);

   const handleRegister = (e) => {
    e.preventDefault();
     const email = e.target.email.value; 
     const password = e.target.password.value;
     const terms = e.target.terms.checked;
     if(password.length < 6) {
      setError("Password must be at least 6 characters or longer")
      return; 
     }
     else if(!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) {
       setError("Password must be at least one uppercase & one lowercase characters")
       return; 
     }
     else if (!terms ){
       setError("Please accept our terms & conditions ");  
      return; 
     }
        console.log("form submitted", email, password, terms); 

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
             <div className="relative flex items-center">
             <input type={ showPassword? "text" : "password"} placeholder="password" name="password" className="input input-bordered" required /> 
                <span className="cursor-pointer absolute right-0 px-3" onClick={() =>setShowPassword(!showPassword)}>
                  {
                    showPassword ? <FaEyeSlash /> : <FaEye />
                  }</span>
             </div>
            
             <div className="form-control">
               <div className="flex mt-3">
               <label className="label">
               <input type="checkbox" defaultChecked name="terms" className="checkbox checkbox-xs" />
                  <span className="label-text ml-3">Please accept our terms</span>
                </label>
               </div>
              </div>

                <label className="label"> 
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            
          </div>
          <div>Already Have an account Please 
            <Link className="cursor-pointer underline ml-2 text-red-700" to="/login">Login</Link>
          </div>
          {
              error && <p className="text-red-800">{error}</p>
          }
          {
            success && <p className="text-green-800">{success}</p>
          }
          {}
        </div>
      </div>
    );
};

export default Register;