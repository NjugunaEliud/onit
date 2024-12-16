"use client";
import React, { useState, useEffect } from "react";
import { Visibility, VisibilityOff } from '@mui/icons-material'; 
import axios from "axios";
import Swal from "sweetalert2";
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";

export default function SigninWithPhone() {
  const [data, setData] = useState({
    remember: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false); 
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberme, setRememberMe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const storedPhone = window.localStorage.getItem("adminPhone");
    const storedPassword = window.localStorage.getItem("adminPassword");
    if (storedPhone && storedPassword) {
      setPhone(JSON.parse(storedPhone));
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    // Validate phone input
    if (!phone) {
      Swal.fire({
        icon: "info",
        text: `Phone number is required`,
        confirmButtonColor: "#53b94c",
      });
      return;
    }

    // Validate password input
    if (!password) {
      Swal.fire({
        icon: "info",
        text: `Password is required`,
        confirmButtonColor: "#53b94c",
      });
      return;
    }

    e.preventDefault();

    setLoading(true)
    try {
      const response = await axios.post('https://us-central1-onit-439704.cloudfunctions.net/signin', {
        phone: phone,
        password: password,
      });
      console.log("Login details",response.data)
      if (response.data && response.data.payload && response.data.payload.token) {
        toast.success(`Welcome Back ${response.data.payload.user.role}!`, {
          icon: '👏',
        });        

        if (rememberme) {
          window.localStorage.setItem("adminPhone", JSON.stringify(response.data.payload.user.phone));
          window.localStorage.setItem("adminPassword", password);
        }

        window.localStorage.setItem('AdminData', JSON.stringify(response.data.payload.user));
        window.localStorage.setItem('token', response.data.payload.token);
        window.localStorage.setItem('companyId', response.data.payload.user.company_id);
        window.localStorage.setItem('email', response.data.payload.user.email);
        window.localStorage.setItem('phone', response.data.payload.user.phone);
        window.localStorage.setItem('role', response.data.payload.user.role);
        window.localStorage.setItem('id', response.data.payload.user.id);

  
          router.push('/');
 
      } else {
        Swal.fire({
          icon: "error",
          text: `Login failed: Invalid response from server`,
          confirmButtonColor: "red",
        });
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Login failed';
        Swal.fire({
          icon: "error",
          text: errorMessage,
          confirmButtonColor: "red",
        });
      } else {
        Swal.fire({
          icon: "error",
          text: `Login error: Please check your internet connection`,
          confirmButtonColor: "red",
        });
      }
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
          htmlFor="phone"
          className="mb-2.5 block font-medium text-dark dark:text-white"
        >
          Phone Number
        </label>
        <div className="relative">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            name="phone"
            className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-[#056cf2] active:border-[#056cf2] focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
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
          className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-[#056cf2] active:border-[#056cf2] disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
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
            className={`mr-2.5 inline-flex h-5.5 w-5.5 items-center justify-center rounded-md border border-stroke bg-white text-white text-opacity-0 peer-checked:border-[#056cf2] peer-checked:bg-[#056cf2] peer-checked:text-opacity-100 dark:border-stroke-dark dark:bg-white/5 ${data.remember ? "bg-primary" : ""
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
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#056cf2] p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          {!loading ? 'Sign In' : 'Signing in ...'}
        </button>
      </div>
    </form>
  );
}