import React from "react";
import HeaderAdmin from "./HeaderAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import "../User/estilos.css";
import { API_USERS_ADMIN, API_USERS_DELETE_ADMIN } from "../../config/api";
import Swal from "sweetalert2";
import EditUserModal from "./EditUserModal";

function UsuariosAdmin() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const offset = (currentPage - 1) * pageSize;
  useEffect(() => {
    axios
      .get(API_USERS_ADMIN)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredUserData = users.filter((user) => {
    const searchableProperties = [
      "id",
      "user_fullName",
      "email",
      "totalrevenue",
    ];

    return searchableProperties.some((property) => {
      const value = user[property];
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  const totalPages = Math.ceil(users.length / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleUpdateUser = (responseData) => {
    // Actualiza el estado de los usuarios
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === responseData.updatedUser.id ? responseData.updatedUser : u
      )
    );
    setSelectedUser(null);
  };

  //delete methods

  const handleDeleteUser = (id) => {
    console.log("Eliminar usuario con ID:", id);

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(API_USERS_DELETE_ADMIN + "/" + id)
          .then((response) => {
            console.log(response);
            setUsers(users.filter((user) => user.user_id !== id));

            Swal.fire(
              "Eliminado",
              "El usuario ha sido eliminado correctamente.",
              "success"
            );
          })
          .catch((error) => {
            console.log(error);
            Swal.fire(
              "Error",
              "Hubo un problema al intentar eliminar el usuario.",
              "error"
            );
          });
      }
    });
  };

  return (
    <>
      <div className="bg-fondo-user bg-cover bg-center h-screen  relative flex">
        <div className="z-30 xl:w-[30%] fixed top-0 left-0 right-10 lg:relative">
          <HeaderAdmin />
        </div>

        <div className="flex-1 w-screen bg-cover bg-center lg:h-screen overflow-y-auto justify-center ">
          <div className="w-[100%] flex flex-col items-center justify-center lg:pt-10">
            <h1 className="xl:text-4xl text-2xl mb-4 lg:mb-2 text-green-500 font-bold  pt-10 lg:pt-2">
              Usuarios
            </h1>

            {selectedUser && (
              <EditUserModal
                user={selectedUser}
                onClose={() => setSelectedUser(null)}
                onUpdate={(updatedUser) => handleUpdateUser(updatedUser)}
              />
            )}

            <div className="container  ">
              <div className="container flex flex-col justify-center items-center">
                {/* Search bar */}
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
                    value={searchTerm}
                    className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />{" "}
                </div>
                {/* Tabla para dispositivos de escritorio */}
                <table className="hidden sm:table w-[80%] flex flex-row flex-no-wrap rounded-lg overflow-hidden sm:shadow-lg my-5 ">
                  <thead className="text-white">
                    <tr className="bg-gray-800 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                      <th className="p-3  ">Referencia</th>
                      <th className="p-3  ">Nombre</th>
                      <th className="p-3 ">Email</th>
                      <th className="p-3 ">Inversión</th>
                      <th className="p-3 ">Ganancia</th>
                      <th className="p-3 ">Estado</th>
                      <th className="p-3 ">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="flex-1 sm:flex-none ">
                    {filteredUserData &&
                      filteredUserData
                        .slice(offset, offset + pageSize)
                        .map((user) => {
                          return (
                            <tr
                              className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0  hover:bg-gray-800 transition-all duration-200 text-center"
                              key={user?.user_id}
                            >
                              <td className="border-grey-light border  p-3">
                                {user.user_id}
                              </td>
                              <td className="border-grey-light border p-3 truncate capitalize">
                                {user.user_fullName}
                              </td>
                              <td className="border-grey-light border p-3 text-white  hover:font-medium cursor-pointer">
                                {user.user_email}
                              </td>

                              <td className="border-grey-light border p-3 text-white  hover:font-medium cursor-pointer">
                                {user.totalinvest}
                              </td>
                              <td className="border-grey-light border p-3 text-white  hover:font-medium cursor-pointer">
                                {user.totalrevenue}
                              </td>
                              <td className="border-grey-light border   p-3 text-white hover:font-medium cursor-pointer">
                                <span
                                  className={
                                    user.user_isActive
                                      ? "bg-green-500 text-white rounded-full px-2 py-1 text-xs font-bold"
                                      : "bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold"
                                  }
                                >
                                  {user.user_isActive ? "Activo" : "Inactivo"}
                                </span>
                              </td>
                              <td className="border-grey-light border p-3 text-white hover:font-medium cursor-pointer flex justify-center gap-2">
                                <button
                                  className="flex items-center bg-blue-700 hover:bg-blue-600 transition-colors duration-300 text-white font-bold py-1 px-2 rounded-full"
                                  onClick={() => setSelectedUser(user)}
                                >
                                  <svg
                                    class="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8Zm4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5L9 13Zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </button>

                                <button
                                  className="flex items-center bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white font-bold py-2 px-2  rounded-full"
                                  onClick={() => {
                                    handleDeleteUser(user.user_id);
                                  }}
                                >
                                  <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M16 12h4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1c0 .6-.4 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                  </svg>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
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
                <div className="sm:hidden container flex flex-col justify-center  items-center">
                  {filteredUserData.map((user, index) => (
                    <table
                      className="w-[80%] flex flex-row flex-no-wrap  rounded-lg overflow-hidden sm:shadow-lg my-5"
                      key={`${user?.user_id}_${index}`}
                    >
                      <thead className="text-white">
                        <tr className="bg-gray-800 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                          <th className="p-3 text-left ">Referencia</th>
                          <th className="p-3 text-left ">Nombre</th>
                          <th className="p-3 text-left">Email</th>
                          <th className="p-3 text-left">Inversión</th>
                          <th className="p-3 text-left">Ganancia</th>
                          <th className="p-3 text-left">Estado</th>
                          <th className="p-3 text-left">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="flex-1 sm:flex-none">
                        <tr
                          className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0  hover:bg-gray-800 transition-all duration-200"
                          key={user.user_id}
                        >
                          <td className="border-grey-light border  p-3 truncate">
                            {user.user_id}
                          </td>
                          <td className="border-grey-light border  p-3 truncate">
                            {user.user_fullName}
                          </td>
                          <td className="border-grey-light border p-3 text-white  hover:font-medium cursor-pointer">
                            {user.user_email}
                          </td>

                          <td className="border-grey-light border 0 p-3 text-white  hover:font-medium cursor-pointer">
                            {user.totalinvest}
                          </td>

                          <td className="border-grey-light border 0 p-3 text-white  hover:font-medium cursor-pointer">
                            {user.totalrevenue}
                          </td>
                          <td className="border-grey-light border  p-3 text-white  hover:font-medium cursor-pointer">
                            <span
                              className={
                                user.user_isActive
                                  ? "bg-green-500 text-white rounded-full px-2 py-1 text-xs font-bold"
                                  : "bg-red-500 text-white rounded-full px-2 py-1 text-xs font-bold"
                              }
                            >
                              {user.user_isActive ? "Activo" : "Inactivo"}
                            </span>
                          </td>
                          <td className="border-grey-light border  p-3 text-white hover:font-medium cursor-pointer flex gap-2 ">
                          <button
                                  className="flex items-center bg-blue-700 hover:bg-blue-600 transition-colors duration-300 text-white font-bold py-1 px-2 rounded-full"
                                  onClick={() => setSelectedUser(user)}
                                >
                                  <svg
                                    class="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M5 8a4 4 0 1 1 7.8 1.3l-2.5 2.5A4 4 0 0 1 5 8Zm4 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h2.2a3 3 0 0 1-.1-1.6l.6-3.4a3 3 0 0 1 .9-1.5L9 13Zm9-5a3 3 0 0 0-2 .9l-6 6a1 1 0 0 0-.3.5L9 18.8a1 1 0 0 0 1.2 1.2l3.4-.7c.2 0 .3-.1.5-.3l6-6a3 3 0 0 0-2-5Z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </button>

                                <button
                                  className="flex items-center bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white font-bold py-2 px-2  rounded-full"
                                  onClick={() => {
                                    handleDeleteUser(user.user_id);
                                  }}
                                >
                                  <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M16 12h4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1c0 .6-.4 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                  </svg>
                                </button>
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

export default UsuariosAdmin;
