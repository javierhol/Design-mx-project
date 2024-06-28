import HeaderUser from "./HeaderUser";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_HISTORY_TRANSFER, API_HISTORY_WITHDRAWAL } from "../../config/api";

function Transacciones() {
  const user = localStorage.getItem("id");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Número de filas por página

  const [currentPage2, setCurrentPage2] = useState(1);
  const pageSize2 = 10; // Número de filas por página

  const [transferData, setTransferData] = useState([]);
  const [withdrawData, setWithdrawData] = useState([]);

  const offset = (currentPage - 1) * pageSize;
  const offset2 = (currentPage2 - 1) * pageSize2;

  useEffect(() => {
    if (user !== null) {
      fetchData(API_HISTORY_WITHDRAWAL, setWithdrawData, offset2, pageSize);
      fetchData(API_HISTORY_TRANSFER, setTransferData, offset, pageSize);
    }
  }, [user, currentPage, pageSize, currentPage2, pageSize2, offset, offset2]);

  const fetchData = async (apiEndpoint, setData, offset, limit) => {
    try {
      const response = await axios.get(`${apiEndpoint}${user}?offset=${offset}&limit=${limit}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = Math.ceil(transferData.length / pageSize);
  const totalPages2 = Math.ceil(withdrawData.length / pageSize2);


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageChange2 = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages2) {
      setCurrentPage2(newPage);
    }
  };

  return (
    <>
      <div
        className="bg-fondo-user bg-cover bg-center h-screen relative flex"
        style={{ height: "100%" }}
      >
        <div className="z-30 xl:w-[30%] fixed top-0 left-0 right-10 lg:relative">
          <HeaderUser />
        </div>
        <div className="flex-1 h-screen  bg-cover bg-center lg:h-screen overflow-y-auto">
          <div className="w-[100%] flex flex-col items-center justify-center">
            <h1 className="xl:text-5xl text-4xl  mt-20 lg:mb-6 text-green-500 font-bold  pt-10 lg:pt-2">
              Transferencias
            </h1>
            <div className="container">
              <div className="hidden sm:flex flex-col justify-center items-center w-[80%] sm:w-auto">
                <table className="w-full lg:w-[80%] flex flex-row flex-no-wrap rounded-lg overflow-hidden sm:shadow-lg my-5b ">
                  <thead className="text-white ">
                    <tr className="bg-gray-800 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                      <th className="p-3 ">ID transaccion</th>
                      <th className="p-3 ">Monto</th>
                      <th className="p-3 ">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="flex-1 sm:flex-none text-center">
                    {transferData
                      .slice(offset, offset + pageSize)
                      .map((transfer) => (
                        <tr
                          className="flex flex-col flex-no wrap lg:table-row mb-2 lg:mb-0"
                         key={`transfer_${transfer.id}`}
                        >
                          <td className="border-grey-light border hover:bg-gray-500 p-5 truncate">
                            {transfer.id}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-5 truncate">
                            {transfer.amount}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-5 text-white hover:text-white hover:font-medium ">
                            {transfer.fecha}
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
                        className="mr-2 px-4 py-2 border rounded-lg transition-colors duration-300 font-bold ease-in-out focus:outline-none focus:shadow-outline-blue active:bg-gray-700 hover:bg-gray-800"
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
                      <span className="text-green-600 font-semibold">
                        Página {currentPage} de {totalPages}
                      </span>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="ml-2 px-4 py-2 border rounded-lg transition-colors duration-300 font-bold ease-in-out focus:outline-none focus:shadow-outline-blue active:bg-gray-700 hover:bg-gray-800"
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
              </div>

              {/* Contenido para dispositivos móviles */}
              <div className="sm:hidden container flex flex-col items-center justify-center">
                {transferData.map((transfer) => (
                  <div className="w-[80%] flex flex-col justify-center items-center my-5">
                    {/* Tabla para dispositivos móviles */}
                    <table className="w-full flex flex-row flex-no-wrap rounded-lg overflow-hidden sm:shadow-lg">
                      <thead className="text-white">
                        <tr className="bg-gray-800 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                          <th className="p-3 text-left">ID transaccion</th>
                          <th className="p-3 text-left">Monto</th>
                          <th className="p-3 text-left">Fecha</th>
                        </tr>
                      </thead>
                      <tbody className="flex-1 sm:flex-none">
                        <tr
                          className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                          key={`transfer_${transfer.id}`}
                        >
                          <td className="border-grey-light border hover:bg-gray-500 p-3">
                            {transfer.id}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3 truncate">
                            {transfer.amount}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3 text-white hover:text-white hover:font-medium cursor-pointer">
                            {transfer.fecha}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className=" h-[50%] flex flex-col items-center ">
            <div className=" xl:w-[38%] flex mt-20 mb-6 justify-center mx-3">
              <h1 className=" xl:text-5xl text-4xl text-green-500 font-bold ">
                Retiros
              </h1>
            </div>
            <div className="container">
              <div className="hidden  sm:flex flex-col justify-center items-center w-[80%] sm:w-auto">
                <table className="w-full lg:w-[80%] flex flex-row flex-no-wrap rounded-lg overflow-hidden sm:shadow-lg my-5">
                  <thead className="text-white">
                    <tr className="bg-gray-800 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                      <th className="p-3 ">Referencia</th>
                      <th className="p-3 ">Wallet</th>
                      <th className="p-3 ">Monto</th>
                      <th className="p-3 ">Fecha</th>
                      <th className="p-3 ">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="flex-1 sm:flex-none text-center">
                    {withdrawData
                      .slice(offset2, offset2 + pageSize2)
                      .map((withdraw) => (
                        <tr
                          className="flex flex-col flex-no wrap lg:table-row mb-2 lg:mb-0  hover:bg-gray-800 transition-all duration-200"
                          key={`withdraw_${withdraw.id}`}
                        >
                          <td className="border-grey-light border p-3">
                            {withdraw.id}
                          </td>
                          <td className="border-grey-light border  p-3">
                            {withdraw.wallet}
                          </td>
                          <td className="border-grey-light border  p-3 truncate">
                            {withdraw.amount}
                          </td>
                          <td className="border-grey-light border  p-3 text-white hover:text-white hover:font-medium cursor-pointer">
                            {withdraw.formattedDate}
                          </td>
                          <td className="border-grey-light border p-3 text-white hover:text-white hover:font-medium cursor-pointer">
                          <span
                              className={`text-${
                                withdraw.status === "approved"
                                  ? "green"
                                  : withdraw.status === "pending"
                                  ? "yellow"
                                  : "red"
                              }-500 hover:font-medium cursor-pointer`}
                            >
                              {withdraw.status === "approved"
                                ? "Aprobado"
                                : withdraw.status === "pending"
                                ? "En espera"
                                : withdraw.status === "rejected"
                                ? "Rechazado"
                                : "Sin definir"}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="flex hidden sm:table w-[80%]">
                    <div className="flex flex-col items-center justify-between mt-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => handlePageChange2(currentPage2 - 1)}
                          disabled={currentPage2 === 1}
                          className="mr-2 px-4 py-2 border rounded-lg transition-colors duration-300 font-bold ease-in-out focus:outline-none focus:shadow-outline-blue active:bg-gray-700 hover:bg-gray-800"
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
                        <span className="text-green-600 font-semibold">
                          Página {currentPage2} de {totalPages2}
                        </span>
                        <button
                          onClick={() => handlePageChange2(currentPage2 + 1)}
                          disabled={currentPage2 === totalPages2}
                          className="ml-2 px-4 py-2 border rounded-lg transition-colors  font-bold duration-300 ease-in-out focus:outline-none focus:shadow-outline-blue active:bg-gray-700 hover:bg-gray-800"
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
              </div>

              {/* Contenido para dispositivos móviles */}
              <div className="sm:hidden container flex flex-col items-center justify-center">
                {withdrawData.map((withdraw) => (
                  <div className="w-[80%] flex flex-col justify-center items-center my-5">
                    {/* Tabla para dispositivos móviles */}
                    <table className="w-full flex flex-row flex-no-wrap rounded-lg overflow-hidden sm:shadow-lg">
                      <thead className="text-white">
                        <tr className="bg-gray-800 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                          <th className="p-3 text-left">Referencia</th>
                          <th className="p-3 text-left">Wallet</th>
                          <th className="p-3 text-left">Monto</th>
                          <th className="p-3 text-left">Fecha</th>
                          <th className="p-3 text-left">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="flex-1 sm:flex-none">
                        <tr
                          className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                          key={`withdraw_${withdraw.id}`}
                        >
                          <td className="border-grey-light border hover:bg-gray-500 p-3">
                            {withdraw.id}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3">
                            {withdraw.wallet}
                          </td>
                          <td className="border-grey-light border hover-bg-gray-500 p-3 truncate">
                            {withdraw.amount}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3 text-white hover:text-white hover:font-medium cursor-pointer">
                            {withdraw.formattedDate}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3 text-white hover:text-white hover:font-medium cursor-pointer">
                          <span
                              className={`text-${
                                withdraw.status === "approved"
                                  ? "green"
                                  : withdraw.status === "pending"
                                  ? "yellow"
                                  : "red"
                              }-500 hover:font-medium cursor-pointer`}
                            >
                              {withdraw.status === "approved"
                                ? "Aprobado"
                                : withdraw.status === "pending"
                                ? "En espera"
                                : withdraw.status === "rejected"
                                ? "Rechazado"
                                : "Sin definir"}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transacciones;
