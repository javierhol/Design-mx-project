import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { usePostAuth } from "../hooks/context/UserContextData";
import * as Yup from "yup";
import {
  faEnvelope,
  faAngleLeft,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { API_SEND_CODE } from "../../config/api";
import axios from "axios";
import SvgShaper from "../SvgShaper";
// import logo from "../assets/logo/logo peque.png";
function RecoveryPassAdmin() {
  //   const { recoveryPasssword } = usePostAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 min-h-screen  dark:bg-gradient-to-r from-[#163b59] from-10%
    via-[#18324f] via-30% to-[#121b2e] to-90%  relative">
      <ToastContainer />
      <div className="flex dark:bg-[#37415197] dark:text-white dark:border-none  bg-white w-full border-b justify-between items-center">
        <div className="flex items-center  ">
          <Link
            to={"/AjustesAdmin"}
            className="items-center flex dark:text-white dark:bg-[#37415197]  bg-gray-200 m-1 rounded text-white py-2 px-3"
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="text-xl text-gray-700 dark:text-white"
            />
            <span className="pl-2 text-gray-700 dark:text-white">Volver</span>
          </Link>
          <span className="text-2xl text-[#0099FF] mx-2 font-bold ">
            <div className="self_t lg:mr-4">
              <Link to="/">
                <LazyLoadImage src="" alt="" width={70} className="py-1" />
              </Link>
            </div>
          </span>
        </div>
        {/* <div className="flex items-center">
          <span className="mx-2 hidden sm:block">
            ¿Deseas crear una cuenta?{" "}
          </span>
          <div className="flex items-center  ">
            <Link
              to={"/signup"}
              className="items-center mr-2 flex bg-[#0099FF] m-1 rounded text-white py-2 px-3"
            >
              <FontAwesomeIcon icon={faUser} className="  " />
              <span className="pl-2">Crear cuenta</span>
            </Link>
          </div>
        </div> */}
      </div>

      <div className="bg-white dark:bg-[#37415197] dark:text-white w-4/5 sm:w-[30rem] rounded mt-9 mx-auto p-1  my-3">
        <div className="py-2 sm:text-xl font-semibold  px-3 border-b">
          Recuperar contraseña
        </div>
        <div className="text-gray-600 dark:text-white my-3 mx-2">
          Ingrese su correo electronico para la solicitud de tu cuenta y
          recuperacion de contraseña
        </div>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("El email no es valido")
              .required("El campo no puede estar vacio"),
          })}
          onSubmit={async (values) => {
            
            let emailString = values.email.toString(); 
           
            const response = await axios.post(API_SEND_CODE, { email: emailString });

            console.log(response)

            if (response.data.status === 200) {
              toast.success("Código enviado",{
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark", 
                autoClose: 1000
              });
              localStorage.setItem("email", values.email);
              setLoading(!loading);
              navigate("/VerifyCodeAdmin");
            }
            if (response.data.status === 404) {
              toast.error("Este correo no existe", {
                position: toast.POSITION.TOP_RIGHT,
                theme: "dark",
              });
              setLoading(!loading);
            }
          }}
        >
          <Form>
            <div className="Fiel-email bg-white dark:bg-transparent dark:border-[#019afa] flex items-center mx-2 my-1 border-solid border rounded transition-200">
              <div className="icons sm:py-4 py-2 px-2 text-gray-400">
                <FontAwesomeIcon icon={faEnvelope} className="mx-1 text-xl" />
              </div>
              <div className="email w-full">
                <Field
                  type="email"
                  name="email"
                  placeholder="Correo electronico"
                  className="w-full block outline-none dark:bg-transparent dark:text-white "
                />
              </div>
            </div>
            <div className="error">
              <ErrorMessage
                component="p"
                className="mx-2 block text-red-600 animate__animated animate__fadeInUp "
                name="email"
              />
            </div>
            <div className="relative">
              <div className={loading ? "loading" : "loadingblovk"}>
                <button
                  onClick={() => setLoading(!loading)}
                  type="submit"
                  className="bg-[#0099FF] text-white rounded-full relative p-1 sm:py-3 w-5/6 mx-auto my-3 hover:opacity-[0.85] transition flex justify-center cursor-pointer"
                >
                  Continuar
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
      <div className="absolute w-full bottom-0">
          <SvgShaper/>
      </div>
    </div>
  );
}

export default RecoveryPassAdmin;
