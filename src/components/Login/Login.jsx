import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../Firebase/firebase.config";
import { useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 

const handleLogin = (e) => {
      e.preventDefault(); 
      const email = e.target.email.value; 
      const password = e.target.password.value;

      console.log(email, password);

      setError(""); 
      setSuccess(""); 

      signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        setSuccess("Successfully signed in"); 
        console.log(result.user)
      })
      .catch(error => {
        console.log(error.message);
        if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
          setError("Invalid email or password. Please try again.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      })
}

    return (
        <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-5">Login now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
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
          <div>New to this website? Please 
            <Link className="cursor-pointer underline ml-2 text-red-700" to="/register">Register</Link>
          </div>
          {
            success && <p className="text-green-700"> {success}</p>
          }
          {
            error && <p className="text-red-700">{error}</p>
          }
        </div>
      </div>
    );
};

export default Login;