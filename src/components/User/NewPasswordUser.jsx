import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { faAngleLeft, faUser, faKey, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { API_RESET_PASSWORD_USER } from "../../config/api";
import axios from "axios";
import SvgShaper from "../SvgShaper";

function NewPasswordUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen relative  dark:bg-gradient-to-r from-[#163b59] from-10%
    via-[#18324f] via-30% to-[#121b2e] to-90% ">
      <ToastContainer />

      <div className="flex dark:bg-[#37415197] dark:text-white dark:border-none  bg-white w-full border-b justify-between items-center">
        <div className="flex items-center  ">
          <Link
            to={"/RecoveryPassUser"}
            className="items-center flex dark:bg-[#37415197] dark:text-white bg-gray-200 m-1 rounded text-white py-2 px-3"
          >
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="text-2xl dark:text-white text-gray-700"
            />
            <span className="pl-2 text-gray-700 dark:text-white">Volver</span>
          </Link>
          <span className="text-2xl text-[#0099FF] mx-2 font-bold"></span>
        </div>
        {/* <div className="flex items-center">
          <span className="mx-2 hidden sm:block">
            ¿Deseas crear una cuenta?{" "}
          </span>
          <div className="flex items-center  ">
            <Link
              to={"/register"}
              className="items-center mr-2 flex bg-[#0099FF] m-1 rounded text-white py-2 px-3"
            >
              <FontAwesomeIcon icon={faUser} className="text-xl sm:text-2xl" />
              <span className="pl-2">Crear cuenta</span>
            </Link>
          </div>
        </div> */}
      </div>

      <div className="bg-white dark:bg-[#37415197] w-4/5 sm:w-[30rem] rounded m-auto p-1 my-3 ">
        <div className="py-2 sm:text-xl font-semibold px-3 border-b">
          Ingrese la nueva contraseña
        </div>
        <div className="text-gray-600 my-3 dark:text-white mx-2">
          Ya casi terminamos ingresa tu nueva contraseña para que puedas acceder a tu cuenta
        </div>

        <Formik
          initialValues={{
            password: "",
            password2: "",
          }}
          validationSchema={Yup.object({
            password: Yup.string().min(6, "La contraseña debe tener más de 6 caracteres").required("El campo no puede estar vacío"),
            password2: Yup.string().min(6, "La contraseña debe tener más de 6 caracteres").required("El campo no puede estar vacío").oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden"),
          })}
          onSubmit={async (values) => {
            let email = localStorage.getItem("email");

            const response = await axios.post(API_RESET_PASSWORD_USER, {
              email: email,
              newPassword: values.password2,
            });
            if (response.status === 201) {
              toast.success("Contraseña cambiada correctamente",{
                autoClose: 1500,
                theme: "dark",
              });
              localStorage.removeItem("codigo");
              localStorage.removeItem("email");
              setLoading(!loading);
              setTimeout(() => {
                window.location.href = "/login";
              }, 2000);
            } else {
              toast.error("Error al cambiar la contraseña");
              setLoading(!loading);
            }
          }}
        >
          <Form>
            <div className="relative">
              <div className="Fiel-email bg-white dark:bg-transparent dark:border-[#019afa] flex items-center mx-2 my-1 border-solid border rounded transition-200">
                <div className="icons sm:py-4 py-2 px-2 text-gray-400">
                  <FontAwesomeIcon icon={faKey} className="mx-1 text-xl" />
                </div>
                <div className="email w-full relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Ingrese la nueva contraseña"
                    className="w-full block dark:bg-transparent dark:text-white outline-none pr-10"
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>
              <ErrorMessage
                component="p"
                className="mx-2 block text-red-600 animate__animated animate__fadeInUp"
                name="password"
              />
            </div>

            <div className="relative">
              <div className="Fiel-email bg-white dark:bg-transparent dark:border-[#019afa] flex items-center mx-2 my-1 border-solid border rounded transition-200">
                <div className="icons sm:py-4 py-2 px-2 text-gray-400">
                  <FontAwesomeIcon icon={faKey} className="mx-1 text-xl" />
                </div>
                <div className="email w-full relative">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    name="password2"
                    placeholder="Confirmar contraseña"
                    className="w-full block dark:bg-transparent dark:text-white outline-none pr-10"
                  />
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEye : faEyeSlash}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>
              </div>
              <ErrorMessage
                component="p"
                className="mx-2 block text-red-600 animate__animated animate__fadeInUp"
                name="password2"
              />
            </div>

            <div className="relative">
              <div className={loading ? "loading" : "loadingblovk"}>
                <button
                  type="submit"
                  className="bg-[#0099FF] text-white rounded-full relative p-1 py-3 w-5/6 mx-auto my-3 hover:opacity-[0.85] transition flex justify-center cursor-pointer"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
      <div className="absolute w-full bottom-0">
        <SvgShaper />
      </div>

    </div>
  );
}

export default NewPasswordUser;
