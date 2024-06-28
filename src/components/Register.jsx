// Register.js
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { API_REGISTER } from "../config/api";
import Loader from "./Loader";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    fullName: "",
    invitacionCode: "",
  });

  const handleInputChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const validatePassword = () => {
    // Add your password validation criteria here
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (
      !passwordRegex.test(form.password) ||
      !passwordRegex.test(form.passwordConfirm)
    ) {
      toast.error(
        "La contraseña debe contener al menos 8 caracteres y una mayúscula",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate the password before submitting
    if (!validatePassword()) {
      setLoading(false);
      return;
    }

    try {
      
      if (form.invitacionCode === undefined || form.invitacionCode.trim() === "") {
        delete form.invitacionCode;
      }
      console.log(form)

      const response = await axios.post(API_REGISTER, form);
      console.log(response)
      

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.fullName);

      if (response.data.status === 201) {
        toast.success("Registro exitoso", {
          position: "top-left",
          autoClose: 2000,
          theme: "dark",
        });
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      } else if(response.data.status === 417){
        toast.error("El correo ya existe en otra cuenta", {
          position: "top-left",
          autoClose: 2000,
          theme: "dark",
        });
      }
      else if(response.data.status === 401){
        toast.error("Las contraseñas no coinciden", {
          position: "top-left",
          autoClose: 1500,
          theme: "dark",
        });
      }
      else if(response.data.status === 400){
        toast.error("El código de invitación no existe", {
          position: "top-left",
          autoClose: 1500,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Registro fallido", {
        position: "top-left",
        autoClose: 2000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />

      <div
        className="bg-fondo-user bg-cover bg-center h-screen relative flex items-center justify-center"
        id="seccion-register"
      >
        <form
          class="p-5 rounded-2xl bg-gray-700 w-[320px] lg:w-auto lg:p-10 border-t-4 border-green-400"
          onSubmit={handleSubmit}
        >
          <div className="">
            <div className="flex justify-between mb-3 items-center">
              <Link class="bg-gray-800 rounded-full lg:p-2" to="/login">
                <Icon icon="akar-icons:arrow-left" width="25" />
              </Link>
            </div>

            <div className=""></div>
            <h1 class="text-center mb-7 text-2xl text-green-400 font-bold">
              Registrate
            </h1>

            <div class="flex flex-col">
              <div class="relative">
                <span class="absolute  -left-2 top-3 flex items-center pl-5">
                  <Icon icon="ic:baseline-email" color="#4ade80" />
                </span>
                <input
                  class="p-2 w-72  lg:w-96 lg:text-xl text-sm mb-5 rounded-xl pl-10 bg-gray-800"
                  type="text"
                  placeholder="Ingrese su correo"
                  name="email"
                  required
                  onChange={handleInputChange}
                />
              </div>

              <div class="relative">
                <span class="absolute top-3 -left-2 flex items-center pl-5">
                  <Icon icon="uis:padlock" color="#4ade80" />
                </span>
                <input
                  class="p-2 w-72  lg:w-96 lg:text-xl text-sm pl-10 rounded-xl mb-5 bg-gray-800"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese la contraseña"
                  name="password"
                  required
                  onChange={handleInputChange}
                />
                <span class="absolute top-2 right-0 flex items-center pr-3 ">
                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <Icon icon="ph:eye" width="25" />
                    ) : (
                      <Icon icon="quill:eye-closed" width="25" />
                    )}
                  </span>
                </span>
              </div>
              <div class="relative">
                <span class="absolute  -left-2 top-3 flex items-center pl-5">
                  <Icon icon="uis:padlock" color="#4ade80" />
                </span>
                <input
                  class="p-2 w-72  lg:w-96 lg:text-xl text-sm mb-5 rounded-xl pl-10 bg-gray-800"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirma la contraseña"
                  name="passwordConfirm"
                  required
                  autoComplete="off"
                  onChange={handleInputChange}
                />
              </div>
              <div class="relative">
                <span class="absolute  -left-2 top-3 flex items-center pl-5">
                  <Icon icon="mdi:user" color="#4ade80"/>
                </span>
                <input
                  class="p-2 w-72  lg:w-96 lg:text-xl text-sm mb-5 rounded-xl pl-10 bg-gray-800"
                  placeholder="Ingrese su nombre de usuario"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="off"
                  onChange={handleInputChange}
                />
              </div>
              <div class="relative">
                <span class="absolute  -left-2 top-3 flex items-center pl-5">
                  <Icon icon="ic:outline-numbers" color="#4ade80" />
                </span>
                <input
                  class="p-2 w-72  lg:w-96 lg:text-xl text-sm mb-5 rounded-xl pl-10 bg-gray-800"
                  placeholder="Ingrese el codigo de invitación"
                  name="invitacionCode"
                  type="text"
                  autoComplete="off"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div class="flex justify-center lg:mt-5 text-sm lg:text-xl">
              <strong>¿Ya tienes una cuenta?</strong>
              <br />
              <Link class="ml-2 text-teal-300 font-bold" to="/Login">
                <a>Iniciar sesión</a>
              </Link>
            </div>
            <div class="flex justify-center ">
              <button class="mt-5 cursor-pointer text-sm bg-gray-800 rounded-xl p-2 border-r-4 border-green-400 lg:text-xl flex flex-row items-center gap-2" disabled={loading}>
                {loading ? <Loader /> : 'Registrar'}
                <span> <Icon icon="akar-icons:arrow-right" width="25"/> </span>
              </button>
            </div>

            <p>{registrationStatus}</p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
