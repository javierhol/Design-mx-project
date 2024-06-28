import HeaderUser from "./HeaderUser";
import { useState, useEffect } from "react";

import { API_REFERS } from "../../config/api";
import axios from "axios";

function Referencias() {
  const user = localStorage.getItem("id");

  const [refers, setRefers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const offset = (currentPage - 1) * pageSize;

  if (user !== null) {
    useEffect(() => {
      axios
        .get(API_REFERS + user)
        .then((response) => {
          setRefers(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  }

  const totalPages = Math.ceil(refers.length / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="bg-fondo-user bg-cover bg-center h-screen relative flex">
        <div className="z-30 xl:w-[30%] fixed top-0 left-0 right-10 lg:relative">
          <HeaderUser />
        </div>

        <div className="flex-1 w-screen bg-cover bg-center lg:h-screen overflow-y-auto  flex ">
          <div className="w-[100%] flex flex-col items-center justify-center">
            <h1 className="xl:text-4xl text-2xl mb-4 lg:mb-2 text-green-500 font-bold  pt-10 lg:pt-2">
              Referidos
            </h1>
            <div className="container  ">
              <div class="container flex justify-center items-center">
                {/* Tabla para dispositivos de escritorio */}
                <table class="hidden sm:table w-[80%] flex flex-row flex-no-wrap rounded-lg overflow-hidden sm:shadow-lg my-5">
                  <thead class="text-white">
                    <tr class="bg-gray-800 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                      <th class="p-3 text-left">Codigo REF</th>
                      <th class="p-3 text-left">Nombre</th>
                      <th class="p-3 text-left">Fecha</th>
                    </tr>
                  </thead>
                  <tbody class="flex-1 sm:flex-none">
                    {refers.map((refer) => (
                      <tr
                        class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                        key={refer.id}
                      >
                        <td class="border-grey-light border hover:bg-gray-500 p-3 truncate">
                          {refer.code}
                        </td>
                        <td class="border-grey-light border hover:bg-gray-500 p-3 truncate">
                          {refer.nombre}
                        </td>
                        <td class="border-grey-light border hover:bg-gray-500 p-3 text-white hover:text-white hover:font-medium cursor-pointer">
                          {refer.fecha}
                        </td>
                      </tr>
                    ))}
                    <div className="flex flex-col items-end mt-4">
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
                  </tbody>
                </table>

                {/* Tabla para dispositivos móviles */}
                <div class="sm:hidden container flex items-center  justify-center">
                  {refers.map((refer) => (
                    <table class="w-[80%] flex flex-row flex-no-wrap  rounded-lg overflow-hidden sm:shadow-lg my-5">
                      <thead class="text-white">
                        <tr class="bg-gray-800 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                          <th class="p-3 ">Codigo REF</th>
                          <th class="p-3 ">Nombre</th>
                          <th class="p-3 ">Fecha</th>
                        </tr>
                      </thead>
                      <tbody class="flex-1 sm:flex-none">
                        <tr
                          class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 text-center"
                          key={refer.id}
                        >
                          <td class="border-grey-light border hover:bg-gray-500 p-3">
                            {refer.code}
                          </td>
                          <td class="border-grey-light border hover:bg-gray-500 p-3 truncate">
                            {refer.nombre}
                          </td>
                          <td class="border-grey-light border hover:bg-gray-500 p-3 text-white hover:text-gray-500 hover:font-medium cursor-pointer">
                            {refer.fecha}
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

export default Referencias;
