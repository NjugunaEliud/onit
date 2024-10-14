"use client";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useState } from "react";
import Swal from "sweetalert2";
import { Visibility, VisibilityOff } from '@mui/icons-material'; 
import axios from 'axios';

const CalendarPage = () => {
  const [adminName, setAdminName] = useState<string>("");
  const [adminEmail, setAdminEmail] = useState<string>("");
  const [adminPhoneNumber, setAdminPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  
    const formData = {
      adminName,
      adminEmail,
      adminPhoneNumber,
      password,
      confirmPassword,
    };

    if (!formData.adminName) {
      Swal.fire({
        icon: "info",
        iconColor: "#53b94c",
        text: `Admin name is required`,
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

    if (!formData.adminEmail) {
      Swal.fire({
        icon: "info",
        iconColor: "#53b94c",
        text: `Admin email is required`,
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

    if (!formData.adminPhoneNumber) {
      Swal.fire({
        icon: "info",
        iconColor: "#53b94c",
        text: `Admin phone number is required`,
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

    if (!formData.password) {
      Swal.fire({
        icon: "info",
        iconColor: "#53b94c",
        text: `Password is required`,
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

    if (!formData.confirmPassword) {
      Swal.fire({
        icon: "info",
        iconColor: "#53b94c",
        text: `Confirm password is required`,
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
    if (confirmPassword !== password) {
      Swal.fire({
        icon: "info",
        iconColor: "#53b94c",
        text: `password didn't match`,
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
    try {
      const  response  =  await axios.post('https://us-central1-go-green-436010.cloudfunctions.net/subadmin_reg',{
        name: adminName,
        email: adminEmail,
        phone: adminPhoneNumber,
        password: password,
        confirmPassword: confirmPassword,
        utype: "subadmin"
      });
      if(response.data.statusCode == 200){
        Swal.fire({
          icon: "success",
          iconColor: "#53b94c",
          text: `Sub admin added successfully`,
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
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Register Sub Admin" />
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
          <div className="flex flex-col">
            {/* <!-- Contact Form --> */}
            <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                <h3 className="font-semibold text-dark dark:text-white">
                  Add New Sub Admin
                </h3>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="p-6.5">
                  <div className="mb-4.5">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Admin Name <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      placeholder="Enter admin name"
                  
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-btnColor active:border-btnColor disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Admin Email <span className="text-red">*</span>
                    </label>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="Enter email"
      
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-btnColor active:border-btnColor disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                      Admin Phone Number <span className="text-red">*</span>
                    </label>
                    <input
                      type="text"
                      value={adminPhoneNumber}
                      onChange={(e) => setAdminPhoneNumber(e.target.value)}
                      placeholder="Enter phone number"
          
                      className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-btnColor active:border-btnColor disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="mb-4.5 flex flex-col gap-4.5 xl:flex-row">
                    <div className="w-full xl:w-1/2 relative"> 
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

                    <div className="w-full xl:w-1/2 relative"> 
                      <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                        Confirm Password <span className="text-red">*</span>
                      </label>
                      <input
                        type={showPassword ? "text" : "password"} 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm password"
  
                        className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-btnColor active:border-btnColor disabled:cursor-default dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                      />
                      <span
                        onClick={togglePasswordVisibility}
                        className="absolute right-4 top-10 cursor-pointer" 
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />} 
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-[7px] bg-btnColor mt-6 p-[13px] font-medium text-white hover:bg-opacity-90"
                  >
                    Register Sub Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
