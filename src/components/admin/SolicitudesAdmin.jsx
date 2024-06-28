import React, { useState, useEffect } from "react";
import HeaderAdmin from "./HeaderAdmin";
import axios from "axios";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import "./css/style.css";
import {
  API_REQUEST_INVEST,
  API_REQUEST_WITHDRAWALS,
  API_APPROVE_INVEST,
  API_APPROVE_WITHDRAWAL,
  API_REJECT_INVEST,
  API_REJECT_WITHDRAWAL,
} from "../../config/api";

const SolicitudesAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [withdraws, setWithdraw] = useState([]);

  //Declaración de estados para la paginación depositos
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const offset = (currentPage - 1) * pageSize;

  //Declaración de estados para la paginación retiros
  const [searchTerm1, setSearchTerm1] = useState("");
  const [currentPage1, setCurrentPage1] = useState(1);
  const pageSize1 = 10;
  const offset1 = (currentPage1 - 1) * pageSize1;

  useEffect(() => {
    axios
      .get(API_REQUEST_INVEST)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(API_REQUEST_WITHDRAWALS)
      .then((response) => {
        setWithdraw(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (e, acceptData) => {
    e.preventDefault();
    try {
      const response = await axios.put(API_APPROVE_INVEST + acceptData);

      console.log(response.data);
      if (response.status === 200) {
        toast.success("Inversión aprobada", {
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
          window.location.reload();
        }, 2000);
      } else {
        toast.warning("Error al aprobar");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const rejectInvest = async (e, reject) => {
    e.preventDefault();
    try {
      const response = await axios.put(API_REJECT_INVEST + reject);

      console.log(response.data);
      if (response.status === 200) {
        toast.error("Inversión rechazada", {
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
          window.location.reload();
        }, 2000);
      } else {
        toast.warning("Error al rechazar");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const aprroveWitdraw = async (e, accept) => {
    e.preventDefault();
    try {
      const response = await axios.put(API_APPROVE_WITHDRAWAL + accept);

      console.log(response.data);
      if (response.status === 200) {
        toast.success("Retiro aprobado", {
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
          window.location.reload();
        }, 2000);
      } else {
        toast.warning("Error al aprobar");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const rejectWithdraw = async (e, reject) => {
    e.preventDefault();
    try {
      const response = await axios.put(API_REJECT_WITHDRAWAL + reject);

      if (response.status === 200) {
        toast.error("Retiro rechazado", {
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
          window.location.reload();
        }, 2000);
      } else {
        toast.warning("Error al rechazar");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //Paginación depositos
  const filteredInvestData = requests.filter((invest) => {
    const searchableProperties = ["hash", "user.fullName", "amount"];

    return searchableProperties.some((property) => {
      const value = getNestedPropertyValue(invest, property);
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  // Función auxiliar para acceder a propiedades anidadas
  function getNestedPropertyValue(obj, path) {
    const properties = path.split(".");
    return properties.reduce((acc, prop) => acc && acc[prop], obj);
  }

  const totalPages = Math.ceil(requests.length / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  //Paginación retiros
  const filteredWithdrawData = withdraws.filter((withdraw) => {
    const searchableProperties = ["wallet", "user.fullName", "amount"];

    return searchableProperties.some((property) => {
      const value = getNestedPropertyValue1(withdraw, property);
      return String(value).toLowerCase().includes(searchTerm1.toLowerCase());
    });
  });

  function getNestedPropertyValue1(obj, path) {
    const properties = path.split(".");
    return properties.reduce((acc, prop) => acc && acc[prop], obj);
  }

  const totalPages1 = Math.ceil(withdraws.length / pageSize1);

  const handlePageChange1 = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages1) {
      setCurrentPage1(newPage);
    }
  };

  return (
    <>
      <div
        className="bg-fondo-user bg-cover bg-center h-screen relative flex"
        style={{ height: "100%" }}
      >
        <div className="z-30 xl:w-[30%] fixed top-0 left-0 right-10 lg:relative">
          <HeaderAdmin />
        </div>
        <div className="flex-1 w-screen  bg-cover bg-center lg:h-screen overflow-y-auto">
          <div className="w-[100%] flex flex-col items-center justify-center">
            <h1 className="xl:text-4xl text-2xl mb-4 lg:mb-10 text-green-500 font-bold  pt-10 lg:pt-2">
              Solicitudes de deposito
            </h1>
            <div className="container">
              {/* Contenido para dispositivos de escritorio */}
              <div className="hidden sm:flex flex-col justify-center items-center w-[80%] sm:w-auto">
                {/* Tabla para dispositivos de escritorio */}

                <div className="relative flex items-center mt-5 md:mt-0">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.7"
                      stroke="currentColor"
                      className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />{" "}
                </div>

                <table className="w-full lg:w-[80%] flex flex-row flex-no-wrap rounded-lg overflow-hidden sm:shadow-lg my-5">
                  <thead className="text-white">
                    <tr className="bg-gray-800 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                      <th className="p-3 ">Fecha</th>
                      <th className="p-3 ">Referencia</th>
                      <th className="p-3 ">Nombre</th>
                      <th className="p-3 ">Monto</th>
                      <th className="p-3 ">Estado</th>
                      <th className="p-3 " height="52px">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="flex-1 sm:flex-none">
                    {filteredInvestData
                      .slice(offset, offset + pageSize)
                      .map((solicitudes) => (
                        <tr
                          className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 text-center"
                          key={solicitudes.id}
                        >
                          <td className="border-grey-light border hover:bg-gray-500 p-3">
                            {solicitudes.formattedDate}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3 truncate">
                            {solicitudes.hash}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3  hover:font-medium cursor-pointer capitalize">
                            {solicitudes.user.fullName}
                          </td>

                          <td className="border-grey-light border hover:bg-gray-500 p-3  hover:font-medium cursor-pointer">
                            {solicitudes.amount}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3 hover:font-medium cursor-pointer">
                            {solicitudes.status === "approved"
                              ? "Aprobado"
                              : solicitudes.status === "pending"
                              ? "En espera"
                              : solicitudes.status === "rejected"
                              ? "Rechazado"
                              : "Sin definir"}
                          </td>

                          <td className="border-grey-light border hover:bg-green-200 p-3  hover:font-medium cursor-pointer">
                            <div className="flex justify-around">
                              <Icon
                                className="cursor-pointer"
                                onClick={(e) =>
                                  handleSubmit(e, solicitudes.user.id)
                                }
                                icon="mdi:check-bold"
                                color="#3AE98F"
                                width="30"
                                height="30"
                              />
                              <Icon
                                className="cursor-pointer"
                                onClick={(e) =>
                                  rejectInvest(e, solicitudes.user.id)
                                }
                                icon="foundation:x"
                                color="A81D07"
                                width="30"
                                height="30"
                              />
                            </div>
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
              </div>

              {/* Contenido para dispositivos móviles */}
              <div className="sm:hidden container flex flex-col items-center justify-center">
                {requests.map((solicitudes, index) => (
                  <div
                    className="w-[80%] flex flex-col justify-center items-center my-5"
                    key={`${solicitudes.id}_${index}`}
                  >
                    {/* Tabla para dispositivos móviles */}
                    <table className="w-full flex flex-row flex-no-wrap rounded-lg overflow-hidden sm:shadow-lg">
                      <thead className="text-white">
                        <tr className="bg-gray-800 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                          <th className="p-3 text-left">Fecha</th>
                          <th className="p-3 text-left">Referencia</th>
                          <th className="p-3 text-left">Nombre</th>
                          <th className="p-3 text-left">Monto</th>
                          <th className="p-3 text-left">Estado</th>
                          <th className="p-3 text-left" height="52px">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="flex-1 sm:flex-none">
                        <tr
                          className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                          key={`${solicitudes.id}_${index}`}
                        >
                          <td className="border-grey-light border hover:bg-gray-500 p-3">
                            {solicitudes.formattedDate}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3 truncate">
                            {solicitudes.hash}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3  hover:font-medium cursor-pointer">
                            {solicitudes.user.fullName}
                          </td>

                          <td className="border-grey-light border hover:bg-gray-500 p-3  hover:font-medium cursor-pointer">
                            {solicitudes.amount}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3 hover:font-medium cursor-pointer">
                            {solicitudes.status === "approved"
                              ? "Aprobado"
                              : solicitudes.status === "pending"
                              ? "En espera"
                              : solicitudes.status === "rejected"
                              ? "Rechazado"
                              : "Sin definir"}
                          </td>

                          <td className="border-grey-light border hover:bg-green-200 p-3  hover:font-medium cursor-pointer">
                            <div className="flex justify-around">
                              <Icon
                                className="cursor-pointer"
                                onClick={(e) =>
                                  handleSubmit(e, solicitudes.user.id)
                                }
                                icon="mdi:check-bold"
                                color="#3AE98F"
                                width="30"
                                height="30"
                              />
                              <Icon
                                className="cursor-pointer"
                                onClick={(e) =>
                                  rejectInvest(e, solicitudes.user.id)
                                }
                                icon="foundation:x"
                                color="A81D07"
                                width="30"
                                height="30"
                              />
                            </div>
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
            <div className="  xl:w-[38%] flex mt-10 mb-10 justify-center mx-3">
              <h1 className=" xl:text-4xl text-2xl text-green-500 font-bold ">
                Solicitudes de retiro
              </h1>
            </div>
            <div className="container">
              {/* Contenido para dispositivos de escritorio */}
              <div className="hidden  sm:flex flex-col justify-center items-center w-[80%] sm:w-auto">
                {/* Tabla para dispositivos de escritorio */}
                <div className="relative flex items-center mt-4 md:mt-0">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.7"
                      stroke="currentColor"
                      className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm1}
                    className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={(e) => setSearchTerm1(e.target.value)}
                  />{" "}
                </div>
                <table className="w-full lg:w-[80%] flex flex-row flex-no-wrap rounded-lg overflow-hidden sm:shadow-lg my-5">
                  <thead className="text-white">
                    <tr className="bg-gray-800 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                      <th className="p-3">Fecha</th>
                      <th className="p-3">Wallet</th>
                      <th className="p-3">Nombre</th>
                      <th className="p-3">Monto</th>
                      <th className="p-3">Estado</th>
                      <th className="p-3" height="52px">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="flex-1 sm:flex-none">
                    {filteredWithdrawData
                      .slice(offset1, offset1 + pageSize1)
                      .map((withdraw) => (
                        <tr
                          className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 text-center"
                          key={withdraw.id}
                        >
                          <td className="border-grey-light border hover:bg-gray-500 p-3">
                            {withdraw.formattedDate}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3 truncate">
                            {withdraw.wallet}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3  hover:font-medium cursor-pointer capitalize">
                            {withdraw.user.fullName}
                          </td>

                          <td className="border-grey-light border hover:bg-gray-500 p-3  hover:font-medium cursor-pointer">
                            {withdraw.amount}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3  hover:font-medium cursor-pointer">
                            {withdraw.status === "approved"
                              ? "Aprobado"
                              : withdraw.status === "pending"
                              ? "En espera"
                              : withdraw.status === "rejected"
                              ? "Rechazado"
                              : "Sin definir"}
                          </td>

                          <td className="border-grey-light border hover:bg-green-200 p-3  hover:font-medium cursor-pointer">
                            <div className="flex justify-around">
                              <Icon
                                className="cursor-pointer"
                                onClick={(e) =>
                                  aprroveWitdraw(e, withdraw.user.id)
                                }
                                icon="mdi:check-bold"
                                color="#3AE98F"
                                width="30"
                                height="30"
                              />
                              <Icon
                                className="cursor-pointer"
                                onClick={(e) =>
                                  rejectWithdraw(e, withdraw.user.id)
                                }
                                icon="foundation:x"
                                color="A81D07"
                                width="30"
                                height="30"
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="flex hidden sm:table w-[80%]">
                  <div className="flex flex-col items-center justify-between mt-4 ">
                    <div className="flex items-center">
                      <button
                        onClick={() => handlePageChange1(currentPage1 - 1)}
                        disabled={currentPage1 === 1}
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
                        Página {currentPage1} de {totalPages1}
                      </span>
                      <button
                        onClick={() => handlePageChange1(currentPage1 + 1)}
                        disabled={currentPage1 === totalPages1}
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
              </div>

              {/* Contenido para dispositivos móviles */}
              <div className="sm:hidden container flex flex-col items-center justify-center">
                {withdraws.map((withdraw) => (
                  <div className="w-[80%] flex flex-col justify-center items-center my-5">
                    {/* Tabla para dispositivos móviles */}
                    <table className="w-full flex flex-row flex-no-wrap rounded-lg overflow-hidden sm:shadow-lg">
                      <thead className="text-white">
                        <tr className="bg-gray-800 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                          <th className="p-3 text-left">Fecha</th>
                          <th className="p-3 text-left">Wallet</th>
                          <th className="p-3 text-left">Nombre</th>
                          <th className="p-3 text-left">Monto</th>
                          <th className="p-3 text-left">Estado</th>
                          <th className="p-3 text-left" height="52px">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="flex-1 sm:flex-none">
                        <tr
                          className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                          key={withdraw.id}
                        >
                          <td className="border-grey-light border hover:bg-gray-500 p-3">
                            {withdraw.formattedDate}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3 truncate">
                            {withdraw.wallet}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3  hover:font-medium cursor-pointer">
                            {withdraw.user.fullName}
                          </td>

                          <td className="border-grey-light border hover:bg-gray-500 p-3  hover:font-medium cursor-pointer">
                            {withdraw.amount}
                          </td>
                          <td className="border-grey-light border hover:bg-gray-500 p-3  hover:font-medium cursor-pointer">
                            {withdraw.status === "approved"
                              ? "Aprobado"
                              : withdraw.status === "pending"
                              ? "En espera"
                              : withdraw.status === "rejected"
                              ? "Rechazado"
                              : "Sin definir"}
                          </td>

                          <td className="border-grey-light border hover:bg-green-200 p-3  hover:font-medium cursor-pointer">
                            <div className="flex justify-around">
                              <Icon
                                className="cursor-pointer"
                                onClick={(e) =>
                                  aprroveWitdraw(e, withdraw.user.id)
                                }
                                icon="mdi:check-bold"
                                color="#3AE98F"
                                width="30"
                                height="30"
                              />
                              <Icon
                                className="cursor-pointer"
                                onClick={(e) =>
                                  rejectWithdraw(e, withdraw.user.id)
                                }
                                icon="foundation:x"
                                color="A81D07"
                                width="30"
                                height="30"
                              />
                            </div>
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
};

export default SolicitudesAdmin;
