import React, { useState } from "react";
import { API_CREATE_WITHDRAW } from "../../config/api";
import axios from "axios";
import { toast } from "react-toastify";

const ConfirmKeyWithdrawal = ({ isDialogOpen, onClose, dataWithdrawal }) => {
  const [form, setForm] = useState({
    key: "",
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let key = parseInt(form.key);

    const { amount, wallet, investmentId, userId } = dataWithdrawal;

    const body = {
      amount,
      wallet,
      investmentId,
      userId,
      key,
    };

    console.log(body);

    try {
      const res = await axios.post(API_CREATE_WITHDRAW, body);

      console.log(res);
      if (res.data.status === 200) {
        toast.success("Retiro realizado con éxito", {
          position: "top-left",
          autoClose: 1500,
          theme: "dark",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      } else if (res.data.status === 406) {
        toast.error("La clave es incorrecta, inténtelo nuevamente", {
          position: "top-left",
          autoClose: 2500,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al retirar", {
        position: "top-left",
        autoClose: 2500,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
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
              <div className="relative bg-gradient-to-bl from-blue-500 via-slate-600 to-black rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-bold text-white dark:text-white ">
                    Confirma tu clave de retiro
                  </h3>
                  <button
                    type="button"
                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                        Tu clave
                      </label>
                      <input
                        type="number"
                        name="key"
                        className="bg-gray-700 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-white dark:text-white"
                        placeholder="1234..."
                        required
                        onChange={handleForm}
                      />
                    </div>

                    <div className="flex justify-between">
                      <a
                       href="/RecoveryKey"
                        className="text-sm text-white hover:underline dark:text-blue-500"
                      >
                        ¿Has olvidado tu clave?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Retirar
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

export default ConfirmKeyWithdrawal;
