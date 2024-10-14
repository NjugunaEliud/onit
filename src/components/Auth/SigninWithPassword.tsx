"use client";
import React, { useState ,useEffect} from "react";
import Link from "next/link";
import { Visibility, VisibilityOff } from '@mui/icons-material'; 
import axios from "axios";
import Swal from "sweetalert2";
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";



export default function SigninWithPassword() {
  const [data, setData] = useState({
    remember: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false); 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberme, setRememberMe] = useState<boolean>(false);
  const router = useRouter();
  useEffect(()=>{
   const email =  window.localStorage.getItem("adminEmail");
   const password = window.localStorage.getItem("adminPassword");
   if(email && password){
    setEmail(JSON.parse(email));
    setPassword(password);
    setRememberMe(true);
   }
  },[])
  const handleLogin = async (e: any) => {
    if (!email) {
      Swal.fire({
        icon: "info",
        iconColor: "#53b94c",
        text: `email is required`,
        width: 600,
        padding: "3em",
        color: "black",
        background: "#fff",
        confirmButtonColor: "#53b94c",
        showConfirmButton: true,
        backdrop: `
          rgba(83, 185, 76,0.4)
          url("/images/logo/logos.png")
          left top
          no-repeat
        `,
      });
      return;
    }
    if (!password) {
      Swal.fire({
        icon: "info",
        iconColor: "#53b94c",
        text: `password is required`,
        width: 600,
        padding: "3em",
        color: "black",
        background: "#fff",
        confirmButtonColor: "#53b94c",
        showConfirmButton: true,
        backdrop: `
          rgba(83, 185, 76,0.4)
          url("/images/logo/logos.png")
          left top
          no-repeat
        `,
      });
      return;
    }
    e.preventDefault();
    try {
      const  response  =  await axios.post('https://us-central1-go-green-436010.cloudfunctions.net/subadmin_auth',{
        email: email,
        password: password,
    
      });
      if(response.data.statusCode == 200){
        toast.success(`Welcome Back ${response.data.payload.name}!`, {
          icon: '👏',
        });        
        if(rememberme == true){
          window.localStorage.setItem("adminEmail",JSON.stringify(response.data.payload.email));
          window.localStorage.setItem("adminPassword",password);
        }
        window.localStorage.setItem('AdminData', JSON.stringify(response.data.payload));
        if(response.data.payload.utype=="admin"){
          router.push('/');
        }
        if(response.data.payload.utype=="subadmin"){
          router.push('/');
        }
      }
      else{
        Swal.fire({
          icon: "error",
          iconColor: "#53b94c",
          text: `Something wrong happened`,
          width: 600,
          padding: "3em",
          color: "black",
          background: "#fff",
          confirmButtonColor: "red",
          showConfirmButton: true,
          backdrop: `
            rgba(83, 185, 76,0.4)
            url("/images/logo/logos.png")
            left top
            no-repeat
          `,
        });

      }
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        iconColor: "#53b94c",
        text: `please check your internet`,
        width: 600,
        padding: "3em",
        color: "black",
        background: "#fff",
        confirmButtonColor: "red",
        showConfirmButton: true,
        backdrop: `
          rgba(83, 185, 76,0.4)
          url("/images/logo/logos.png")
          left top
          no-repeat
        `,
      });
    } 
    
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form>
      <Toaster/>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Email
        </label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            name="email"
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-btnColor active:border-btnColor focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
      </div>

      <div className="w-full xl:w-full mb-4 relative">
        <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
          Password <span className="text-red">*</span>
        </label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-btnColor active:border-btnColor disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
        />
        <span
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-10 cursor-pointer"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </span>
      </div>

      <div className="mb-6 flex items-center justify-between gap-2 py-2">
        <label
          htmlFor="remember"
          className="flex cursor-pointer select-none items-center font-satoshi text-base font-medium text-dark dark:text-white"
        >
          <input
            type="checkbox"
            name="remember"
            id="remember"
            checked={rememberme}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="peer sr-only"
          />
          <span
            className={`mr-2.5 inline-flex h-5.5 w-5.5 items-center justify-center rounded-md border border-stroke bg-white text-white text-opacity-0 peer-checked:border-btnColor peer-checked:bg-btnColor peer-checked:text-opacity-100 dark:border-stroke-dark dark:bg-white/5 ${data.remember ? "bg-primary" : ""
              }`}
          >
            <svg
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.70692 0.292787C9.89439 0.480314 9.99971 0.734622 9.99971 0.999786C9.99971 1.26495 9.89439 1.51926 9.70692 1.70679L4.70692 6.70679C4.51939 6.89426 4.26508 6.99957 3.99992 6.99957C3.73475 6.99957 3.48045 6.89426 3.29292 6.70679L0.292919 3.70679C0.110761 3.51818 0.00996641 3.26558 0.0122448 3.00339C0.0145233 2.74119 0.119692 2.49038 0.3051 2.30497C0.490508 2.11956 0.741321 2.01439 1.00352 2.01211C1.26571 2.00983 1.51832 2.11063 1.70692 2.29279L3.99992 4.58579L8.29292 0.292787C8.48045 0.105316 8.73475 0 8.99992 0C9.26508 0 9.51939 0.105316 9.70692 0.292787Z"
                fill="currentColor"
              />
            </svg>
          </span>
          Remember me
        </label>
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          onClick={(e) => handleLogin(e)}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-btnColor p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          Sign In
        </button>
      </div>
    </form>
  );
}
