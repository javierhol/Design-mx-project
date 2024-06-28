import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_LOGIN } from "../config/api";
function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validatePassword = () => {
      // Add your password validation criteria here
      const passwordRegex =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

      if (!passwordRegex.test(form.password)) {
        toast.error(
          "La contraseña debe contener al menos 8 caracteres, una mayúscula, un número y un carácter especial",
          {
            position: "top-left",
            autoClose: 6000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          }
        );
        return false;
      }

      return true;
    };

    try {
      const response = await axios.post(API_LOGIN, form);
      console.log(response.data)

      if (response.data.status === 200) {
        console.log('entraaaa')
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.fullName);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("rol", response.data.roles[0]);

        toast.success("Inicio de sesión correcto", {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          navigate("/dashboardUser");
        }, 1500);
        
     
      }
         else if(response.data.status === 401){
        console.log('entraaaa2')
        toast.error("En estos momentos no puedes acceder a tu cuenta, comunicate con el administrador", {
          position: "top-left",
          autoClose: 3500,
          theme: "dark",
        });
      }
    } catch (error) {

      console.log('error', error)
      toast.error("Error! Intente de nuevo", {
        position: "top-left",
        autoClose: 1500,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        class="bg-fondo-user bg-cover bg-center h-screen relative flex items-center justify-center"
        id="seccionLogin"
      >
        <form
          class="p-5 rounded-2xl bg-gray-700 w-[300px] lg:w-auto lg:p-10 border-t-4 border-green-400"
          onSubmit={handleSubmit}
        >
          <div class="">
            <div class="flex justify-between mb-3 items-center">
              <Link class="bg-gray-800 rounded-full lg:p-2" to="/">
                <Icon icon="fluent:arrow-left-12-filled" width="25" />
              </Link>
              <div class="text-green-400 text-2xl ">
                <Link to="/LoginAdmin">
                  <Icon class="" icon="tabler:device-analytics" />
                </Link>
              </div>
            </div>
            <h1 class="text-center mb-4 lg:mb-7 text-xl lg:text-2xl text-green-400 lg:font-bold">
              Iniciar Sesión
            </h1>
            <div className="">
              <div class="relative">
                <span class="absolute  -left-2 top-3 flex items-center pl-5">
                  <Icon icon="mdi:user" color="#4ade80" width="15"  />
                </span>
                <input
                  className="p-2  w-64 lg:w-80 mb-5 rounded-xl pl-10 bg-gray-800 text-sm lg:text-xl"
                  type="text"
                  placeholder="Ingrese su correo"
                  name="email"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div class="relative">
                <span class="absolute top-3 -left-2 flex items-center pl-5">
                  <Icon icon="uis:padlock" color="#4ade80" width="15"/>
                </span>
                <input
                  className="p-2 w-64 lg:w-80 pl-10 rounded-xl bg-gray-800 text-sm lg:text-xl"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese la contraseña"
                  name="password"
                  required
                  onChange={handleInputChange}
                />
                <span class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Icon icon="ph:eye" width="25" />
                    ) : (
                      <Icon icon="quill:eye-closed" width="25" />
                    )}
                  </span>
                </span>
              </div>
            </div>
            <div class="flex justify-center items-center mt-5 text-sm lg:text-xl">
              <strong className=" text-xs text-center lg:text-xl">
                ¿No tienes una cuenta?
              </strong>
              <br />
              <Link class="ml-2 text-teal-300" to="/Register">
                <a className="font-bold">Registrate</a>
              </Link>
            </div>
            <div class="flex justify-center ">
              <button class="mt-5 cursor-pointer bg-gray-800 rounded-xl p-2 border-r-4 border-green-400 text-sm lg:text-xl flex flex-row items-center gap-2">
                Iniciar Sesión<span className="text-2xl"> <Icon icon="fluent:arrow-right-12-filled" /> </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
