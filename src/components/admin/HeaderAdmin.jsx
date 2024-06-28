import React, { useEffect, useState } from "react";
import "../../index.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { FaBars, FaTimes } from "react-icons/fa";
import RevenueButton from "./RevenueButton";

function HeaderAdmin() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogoClick = () => {
    window.location.reload();
  };

  localStorage.removeItem("token");
  const handleLogout = () => {
    toast.success("Cerrando sesión", {
      position: "top-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    localStorage.clear();

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };
  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <div className="h-auto ">
        {/* Mobile Menu */}
        <div className="sm:hidden">
          <button onClick={handleOpen} className="text-3xl text-white py-6 px-3 ">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden sm:block bg-opacity-50 bg-black w-[350px] h-screen">
          <div className="">
            <div className="h-auto">
              <div>
                <div className="flex items-center ">
                  <div className="" onClick={handleLogoClick}>
                    <img
                      src="/assets/img/logo.png"
                      alt=""
                      className="sm:h-16"
                    />
                  </div>
                  <div className="sm:text-xl font-bold">T-Trading</div>
                </div>
                <div className="flex">
                  <button>
                    <svg
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M3 12h18M3 6h18M3 18h18" />
                    </svg>
                  </button>

                  <div className="pl-6">
                    <div className="flex items-center">
                      <Icon icon="mdi:user" width="24" height="24" />
                      <h4 className="sm:text-white sm:text-2xl sm:p-2">
                        Admin
                      </h4>
                    </div>
                    <h2 className="text-uppercase uppercase font-bold ">
                      Admin
                    </h2>
                  </div>
                </div>
              </div>
              <div className="flex flex-col h-[85%] lg:h-[570px] justify-between p-4 ">
                <div className="w-full  lg:h-[250px] lg:flex lg:flex-col lg:justify-end">
                  <Link to="/UsuariosAdmin">
                    <div className=" mt-2 cursor-pointer bg-gray-900 rounded-lg p-2 py-3 border-r-4 border-green-400 transform hover:scale-105 transition-transform duration-300 ">
                      <div className="flex items-center">
                        <Icon icon="mdi:user" />
                        <p className="ml-2">Usuarios</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/SolicitudesUsuarios">
                    <div className="mt-2 cursor-pointer bg-gray-900 rounded-lg  p-2 border-r-4 border-green-400 py-3 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center">
                        <Icon icon="mdi:message-notification" className="" />
                        <p className="ml-2">Solicitudes</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/AjustesAdmin">
                    <div className="mt-2 cursor-pointer bg-gray-900 rounded-lg  p-2 border-r-4 border-green-400 py-3 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center">
                        <Icon
                          icon="material-symbols:settings"
                          className=" text-green-400"
                        />
                        <p className="ml-2">Ajustes</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="https://t.me/TTrading_Soporte" target="blank">
                    <div className="mt-2 cursor-pointer bg-gray-900 rounded-lg  p-2 border-r-4 border-green-400 py-3 transform hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center">
                        <Icon icon="fluent:person-support-20-filled" />

                        <p className="ml-2">Soporte</p>
                      </div>
                    </div>
                  </Link>
                </div>

                <RevenueButton />

                <div className="bg-red flex justify-center ">
                  <button
                    className="mb-16 cursor-pointer bg-red-600 rounded-lg  p-2 border-r-4 border-red-700 flex items-center transform hover:scale-105 transition-transform duration-300 "
                    type="button"
                    onClick={handleLogout}
                  >
                    <Icon icon="majesticons:logout" />
                    <p className="ml-2 font-bold ">Cerrar Sesión</p>
                  </button>
                </div>
              </div>
            </div>
            {/* ... (rest of your desktop header code) */}
          </div>
        </div>

        {/* Mobile Menu Content */}
        {open && (
          <div className="sm:hidden">
            <div className="  bg-gray-800 p-2  bg-opacity-50 backdrop-blur-md">
              <div className="h-auto">
                <div>
                  <div class="flex items-center ">
                    <div class="" onClick={handleLogoClick}>
                      <img src="/assets/img/logo.png" alt="" class="h-24" />
                    </div>
                    <div className="sm:text-2xl font-bold">T-Trading</div>
                  </div>
                  <div class="flex">
                    <button>
                      <svg
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 12h18M3 6h18M3 18h18" />
                      </svg>
                    </button>

                    <div className="pl-6">
                      <div class="flex items-center">
                        <Icon icon="mdi:user" width="24" height="24" />
                        <h4 class="sm:text-white sm:text-2xl sm:p-2">Admin</h4>
                      </div>
                      <h2 class="text-uppercase uppercase font-bold ">Admin</h2>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col h-[65%] justify-between p-4">
                  <div class="w-full ">
                    <Link to="/UsuariosAdmin">
                      <div class=" mt-2 cursor-pointer bg-gray-900 rounded-lg p-2 py-3 border-r-4 border-green-400">
                        <div class="flex items-center">
                          <Icon icon="mdi:user" />
                          <p class="ml-2">Usuarios</p>
                        </div>
                      </div>
                    </Link>
                    <Link to="/SolicitudesUsuarios">
                      <div class="mt-2 cursor-pointer bg-gray-900 rounded-lg  p-2 border-r-4 border-green-400 py-3">
                        <div class="flex items-center">
                          <Icon icon="mdi:message-notification" class="" />
                          <p class="ml-2">Solicitudes</p>
                        </div>
                      </div>
                    </Link>
                    <Link to="/AjustesAdmin">
                      <div class="mt-2 cursor-pointer bg-gray-900 rounded-lg  p-2 border-r-4 border-green-400 py-3">
                        <div class="flex items-center">
                          <Icon
                            icon="material-symbols:settings"
                            class=" text-green-400"
                          />
                          <p class="ml-2">Ajustes</p>
                        </div>
                      </div>
                    </Link>
                    <Link to="https://t.me/TTrading_Soporte" target="blank">
                      <div class="mt-2 cursor-pointer bg-gray-900 rounded-lg  p-2 border-r-4 border-green-400 py-3">
                        <div class="flex items-center">
                          <Icon icon="fluent:person-support-20-filled" />

                          <p class="ml-2">Soporte</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="mt-5">
                    {" "}
                    <RevenueButton />
                  </div>

                  <div class="bg-red  h-20 flex items-end justify-center">
                    <button
                      class=" cursor-pointer bg-red-600 rounded-lg  p-2 border-r-4 border-red-700 flex items-center"
                      type="button"
                      onClick={handleLogout}
                    >
                      <Icon icon="majesticons:logout" />
                      <p class="ml-2">Cerrar Sesión</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default HeaderAdmin;
