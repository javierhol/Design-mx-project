import React, { useState } from "react";
import { API_SAVE_CODE_WITHDRAWAL } from "../../config/api";
import { toast } from "react-toastify";
import axios from "axios";
const KeyWithdrawal = ({ isDialogOpen, onClose }) => {
  const [keyPrevious, setPreviousKey] = useState("");
  const [showPreviousKeyPrompt, setShowPreviousKeyPrompt] = useState(false);
  const [keyValue, setKeyValue] = useState(""); 

  const user = localStorage.getItem("id");
  const handleForm = async (e) => {
    e.preventDefault();

    const key = e.target.key.value;
    if (key === "") {
      return toast.error("Por favor ingrese todos los campos");
    } else {
      setKeyValue(key);
      let data = {
        user,
        key,
        keyPrevious,
      };
      try {
        console.log("dataaaaaa",data)
        const response = await axios.post(API_SAVE_CODE_WITHDRAWAL, data);
        setPreviousKey("");
        console.log(response);
        if (response.data.status === 200) {
          toast.success("Llave de retiro creada", {
            theme: "dark",
            autoClose: 1500,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (response.data.status === 409) {
          if (!showPreviousKeyPrompt) {
            setShowPreviousKeyPrompt(true);
            return; // Evita cerrar la ventana emergente en este punto
          }
        } else if(response.data.status === 417){
          toast.error("La clave ingresada no coincide con la anterior");

        
        } else if(response.data.status === 403){
          toast.error("Se requiere una clave anterior para crear una nueva");

        }else {
          toast.error("Error al crear la clave de retiro");
        }
      } catch (error) {
        toast.error("Opps.. ocurrio un error");
      }
    }
  };

  const handlePreviousKeyPrompt = (input) => {
    console.log("input", input)
    setPreviousKey(input);
    console.log("previousKey", keyPrevious)

    // Create a synthetic event object
    const syntheticEvent = {
      preventDefault: () => {},
      target: {
        key: {
          value: keyValue,
        },
      },
    };
    console.log("syntheticEvent", syntheticEvent)
    // Vuelve a enviar el formulario con la clave anterior
    handleForm(syntheticEvent);
  };

  return (
    <>
      <div>
        {isDialogOpen && (
          <div
            id="authentication-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="overflow-y-auto overflow-x-hidden bg-opacity-50 backdrop-filter backdrop-blur-lg fixed top-0 right-0 left-0 z-50 w-full h-full flex items-center justify-center"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-gray-900 rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-bold text-white dark:text-white ">
                    Crea tu clave de retiro
                  </h3>
                  <button
                    type="button"
                    className="end-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                    onClick={onClose}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only"></span>
                  </button>
                </div>

                <div className="p-4 md:p-5">
                  <form className="space-y-4" onSubmit={handleForm}>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white dark:text-white text-center">
                        Tu clave
                      </label>
                      <input
                        type="number"
                        name="key"
                        className="bg-gray-500 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-white dark:text-white"
                        placeholder="1234.."
                        required
                        value={keyValue} // Asigna el valor del estado
                        onChange={(e) => setKeyValue(e.target.value)} // Actualiza el estado cuando cambia el valor
                      />
                    </div>

                    <div className="flex justify-between">
                      <a
                        href="/RecoveryKey"
                        className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                      >
                        ¿Has olvidado tu clave?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Crear
                    </button>
                  </form>
                </div>
              </div>
            </div>
         
          </div>
        )}
           {showPreviousKeyPrompt && (
              <div
              id="authentication-modal"
              tabIndex={-1}
              aria-hidden="true"
              className="overflow-y-auto overflow-x-hidden bg-opacity-50 backdrop-filter backdrop-blur-lg fixed top-0 right-0 left-0 z-50 w-full h-full flex items-center justify-center"
            >
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-blue-400 rounded-lg shadow dark:bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-bold text-white dark:text-white ">
                      Crea tu clave de retiro
                    </h3>
                    <button
                      type="button"
                      className="end-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="authentication-modal"
                      onClick={onClose}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only"></span>
                    </button>
                  </div>
  
                  <div className="p-4 md:p-5">
                    <form className="space-y-4" onSubmit={handlePreviousKeyPrompt}>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-white dark:text-white text-center">
                          Tu clave anterior
                        </label>
                        <input
                          type="number"
                          name="keyPrevious"
                          className="bg-gray-500 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-white dark:text-white"
                          placeholder="1234.."
                          required
                          value={keyPrevious} // Asigna el valor del estado
                          onChange={(e) => setPreviousKey(e.target.value)} // Actualiza el estado cuando cambia el valor
                        />
                      </div>
  
                      <div className="flex justify-between">
                        <a
                          href="/RecoveryKey"
                          className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                        >
                          ¿Has olvidado tu clave?
                        </a>
                      </div>
                      <button
                        type="submit"
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Enviar
                      </button>
                    </form>
                  </div>
                </div>
              </div>
           
            </div>
            )}
      </div>
    </>
  );
};

export default KeyWithdrawal;
