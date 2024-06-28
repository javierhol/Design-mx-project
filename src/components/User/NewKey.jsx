import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { faAngleLeft, faUser, faKey, faAd} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Field, Form} from "formik";
import { API_RESET_KEY } from "../../config/api";
import axios from "axios";
import SvgShaper from "../SvgShaper";

function NewKey() {

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
          Ingrese la nueva clave de retiro
        </div>
        <div className="text-gray-600 my-3 dark:text-white mx-2">
          Ya casi terminamos ingresa tu nueva clave para que puedas realizar retiros
        </div>

        <Formik
          initialValues={{
            key: "",
          }}
          onSubmit={async (values) => {
            let email = localStorage.getItem("email");

            const response = await axios.post(API_RESET_KEY, {
              email: email,
              newKey: values.key,
            });
            if (response.status === 201) {
              toast.success("Clave de retiro cambiada",{
                autoClose: 1500,
                theme: "dark",
              });
              localStorage.removeItem("codigo");
              localStorage.removeItem("email");
              setLoading(!loading);
              setTimeout(() => {
                window.location.href = "/Ajustes";
              }, 2000);
            } else {
              toast.error("Error al cambiar la clave de retiro");
              setLoading(!loading);
            }
          }}
        >
          <Form>
          
            <div className="relative">
              <div className="Fiel-email bg-white dark:bg-transparent dark:border-[#019afa] flex items-center mx-2 my-1 border-solid border rounded transition-200">
                <div className="icons sm:py-4 py-2 px-2 text-gray-400">
                  <FontAwesomeIcon icon={faAd} className="mx-1 text-xl" />
                </div>
                <div className="email w-full relative">
                  <Field
                    type="number"
                    name="key"
                    placeholder="Nueva clave de retiro"
                    className="w-full block dark:bg-transparent dark:text-white outline-none pr-10"
                  />
                </div>
              </div>
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

export default NewKey;
