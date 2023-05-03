import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate} from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  }, [user, loading]);
  
  return (
    <section class="bg-gray-50 dark:bg-gray-900">
    <div  class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Frost  
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create and account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label for="Name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                  <input
                    type="text"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Full Name" required=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
              </div>
              <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input
                    type="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    required=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                   
                  />
              </div>
      
       
              <button class="w-full text-white bg-primary-600 hover:bg-primary-700 
              focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg 
              text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 
              dark:focus:ring-primary-800" onClick={register}>
                Register
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link class="font-medium text-primary-600 hover:underline dark:text-primary-500" to="/">Login</Link>
              </p>
        </form>
      </div>
      </div>
    </div>
  </section>
  );
}
export default Register;

