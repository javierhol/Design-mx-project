import { useState, useEffect } from "react";
import axios from "axios";
import HeaderUser from "./HeaderUser";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { API_HISTOTY_INVEST } from "../../config/api";

function HistorialRecargas() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const offset = (currentPage - 1) * pageSize;

  const user = localStorage.getItem("id");

  const [historyInvestment, setHistoryInvestment] = useState([]);

  if (user !== null) {
    useEffect(() => {
      axios
        .get(API_HISTOTY_INVEST + user)
        .then((response) => {
          setHistoryInvestment(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  }

  const totalPages = Math.ceil(historyInvestment.length / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="bg-fondo-user bg-cover bg-center h-screen  relative flex">
        <div className="z-30 xl:w-[30%] fixed top-0 left-0 right-10 lg:relative">
          <HeaderUser />
        </div>

        <div className="flex-1 w-screen bg-cover bg-center lg:h-screen overflow-y-auto justify-center ">
          <div className="w-[100%] flex flex-col items-center justify-center lg:pt-10">
            <h1 className="xl:text-4xl text-2xl mb-4 lg:mb-2 text-green-500 font-bold  pt-10 lg:pt-2">
              Historial de Recargas
            </h1>

            <div className="container  ">
              <div class="container flex flex-col justify-center items-center">
                {/* Tabla para dispositivos de escritorio */}

                <table class="hidden sm:table w-[80%] flex flex-row flex-no-wrap rounded-lg overflow-hidden sm:shadow-lg my-5 border border-collapse border-gray-300  text-center">
                  <thead class="text-white bg-gray-800">
                    <tr class="flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                      <th class="p-3 ">Hash</th>
                      <th class="p-3 ">Monto</th>
                      <th class="p-3 ">Fecha</th>
                      <th class="p-3 ">Estado</th>
                    </tr>
                  </thead>
                  <tbody class="flex-1 sm:flex-none">
                    {historyInvestment
                      .slice(offset, offset + pageSize)
                      .map((history) => (
                        <tr
                          class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 border-t border-gray-300 hover:bg-gray-800 transition-all duration-200"
                          key={history.user_id}
                        >
                          <td class="border-r border-gray-300 p-3">
                            {history.hash}
                          </td>
                          <td class="border-r border-gray-300 p-3 truncate">
                            ${history.amount}
                          </td>
                          <td class="border-r border-gray-300 p-3 text- hover:underline cursor-pointer">
                            {history.formattedDate}
                          </td>
                          <td class="border-r border-gray-300 p-3">
                            <span
                              className={`text-${
                                history.status === "approved"
                                  ? "green"
                                  : history.status === "pending"
                                  ? "yellow"
                                  : "red"
                              }-500 hover:font-medium cursor-pointer`}
                            >
                              {history.status === "approved"
                                ? "Aprobado"
                                : history.status === "pending"
                                ? "En espera"
                                : history.status === "rejected"
                                ? "Rechazado"
                                : "Sin definir"}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="flex hidden sm:table w-[80%]">
                  <div className="flex flex-col items-center justify-between mt-4 ">
                    <div className="flex items-center">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mr-2 px-4 py-2 border rounded-lg transition-colors duration-300 ease-in-out focus:outline-none focus:shadow-outline-blue active:bg-gray-700 hover:bg-gray-800"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-5 w-5 inline-block -mt-1 mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        Anterior
                      </button>
                      <span className="text-green-600">
                        Página {currentPage} de {totalPages}
                      </span>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="ml-2 px-4 py-2 border rounded-lg transition-colors duration-300 ease-in-out focus:outline-none focus:shadow-outline-blue active:bg-gray-700 hover:bg-gray-800"
                      >
                        Siguiente
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-5 w-5 inline-block -mb-1 ml-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tabla para dispositivos móviles */}
                <div class="sm:hidden container flex flex-col justify-center  items-center">
                  {historyInvestment.map((history) => (
                    <table class="w-[80%] flex flex-row flex-no-wrap  rounded-lg overflow-hidden sm:shadow-lg my-5">
                      <thead class="text-white">
                        <tr class="bg-gray-800 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                          <th class="p-3 text-center">Hash</th>
                          <th class="p-3 text-left">Monto</th>
                          <th class="p-3 text-left">Fecha</th>
                          <th class="p-3 text-left">Estado</th>
                        </tr>
                      </thead>
                      <tbody class="flex-1 sm:flex-none">
                        <tr
                          class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                          key={history.user_id}
                        >
                          <td class="border-grey-light border hover:bg-gray-500 p-3">
                            {history.hash}
                          </td>
                          <td class="border-grey-light border hover:bg-gray-500 p-3 truncate">
                            {history.amount}
                          </td>
                          <td class="border-grey-light border hover:bg-gray-500 p-3 text-white hover:text-white hover:font-medium cursor-pointer">
                            {history.formattedDate}
                          </td>
                          <td class="border-grey-light border hover:bg-gray-500 p-3 text-white hover:text-white hover:font-medium cursor-pointer">
                          <span
                              class={`text-${
                                history.status === "approved"
                                  ? "green"
                                  : history.status === "pending"
                                  ? "yellow"
                                  : "red"
                              }-500 hover:font-medium cursor-pointer`}
                            >
                              {history.status === "approved"
                                ? "Aprobado"
                                : history.status === "pending"
                                ? "En espera"
                                : history.status === "rejected"
                                ? "Rechazado"
                                : "Sin definir"}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistorialRecargas;
