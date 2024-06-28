import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";
import { API_INVESTMENTS, API_INVID, API_REVENUE } from "../../config/api";

function HeaderUser() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const [revenue, setRevenue] = useState([0]);
  const [invest, setInvest] = useState([0]);
  const [open, setOpen] = useState(false);
  const user = localStorage.getItem("id");
  const investId = localStorage.getItem("idInvest");


  useEffect(() => {
    axios
      .get(API_INVID + user)
      .then((response) => {
        setInvest(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (user !== null) {
    useEffect(() => {
      axios
        .get(API_REVENUE + user)
        .then((response) => {
          setRevenue(response.data);
          localStorage.setItem("idRevenue", response.data.userRevenue.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [investId]);
  }

  const handleLogoClick = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    toast.success("Cerrando sesión", {
      position: "top-left",
      autoClose: 1000,
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
    }, 2000);
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <div className="h-auto ">
        {/* Mobile Menu */}
        <div className="sm:hidden">
          <button onClick={handleOpen} className="text-4xl text-white py-4 px-4">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden sm:block bg-opacity-50 bg-black w-4/6 h-screen ">
          <div className="">
            <div className="h-auto">
              <div className="">
                <div className="flex items-center ">
                  <div className="" onClick={handleLogoClick}>
                    <img
                      src="/assets/img/logo.png"
                      alt=""
                      className="sm:h-16"
                    />
                  </div>
                  <div className="">
                    <Link to="/DashboardUser" className=" text-xl sm:text-xl">
                      T-Trading
                    </Link>
                  </div>
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

                  <div className="pl-7 flex gap-10 text-center items-center">
                    <div className="flex items-center">
                      <h4 className="sm:text-white sm:text-xl font-bold xl:text-xl ">
                        Usuario
                      </h4>
                    </div>
                    <h2 className="capitalize font-bold text-x flex gap-2">
                      <Icon
                        icon="mdi:user"
                        width="24"
                        height="24"
                        color="green"
                      />
                      {name}
                    </h2>
                  </div>
                </div>
                <div className=" p-4 ">
                  <div className="pl-2 font-semibold">
                    <h3>
                      Inversión:{" "}
                      {invest && invest.userRevenue && (
                        <span> ${invest.userRevenue.amount}</span>
                      )}{" "}
                      USD
                    </h3>
                    <h3 className="flex gap-2">
                      Ganancia:{" "}
                      {revenue && revenue.userRevenue && (
                        <p>${revenue.userRevenue.accumulatedRevenue} USD</p>
                      )}
                    </h3>
                  </div>
                  <div className="flex flex-col justify-around mt-2 w-[100%] items-center  ">
                    <Link to="/Recargar">
                      <button
                        className=" sm:text-sm sm:p-1 sm:mr-1  bg-green-500 p-2 rounded-lg xl:w-56 xl:text-lg sm:w-20 font-bold transform hover:scale-105 transition-transform duration-300 hover:bg-slate-300 hover:text-slate-950 hover:font-bold"
                        type="submit"
                        value=""
                      >
                        Recarga
                      </button>
                    </Link>
                    <Link to="/Retirar">
                      <button
                        className="sm:text-sm sm:p-1 sm:mr-1 bg-green-500 p-2 rounded-lg xl:w-56 xl:text-lg sm:w-20 mt-2  font-bold transform hover:scale-105 transition-transform duration-300  hover:bg-slate-300 hover:text-slate-950 hover:font-bold"
                        type="submit"
                        value=""
                      >
                        Retirar
                      </button>
                    </Link>
                    <Link to="/Transferir">
                      <button
                        className="sm:text-sm sm:p-1 bg-green-500 p-2 rounded-lg xl:w-56 xl:text-lg sm:w-20 mt-2  font-bold transform hover:scale-105 transition-transform duration-300  hover:bg-slate-300 hover:text-slate-950 hover:font-bold"
                        type="submit"
                        value=""
                      >
                        Transferir
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between px-4  ">
                <div className="w-full ">
                  <Link to="/HistorialRecargas">
                    <div className="mt-2 cursor-pointer bg-gray-900 rounded-lg  p-2 border-r-4 border-green-400 py-3 transform hover:scale-105 transition-transform duration-300 hover:bg-slate-300 hover:text-slate-950 hover:font-bold ">
                      <div className="flex items-center">
                        <Icon className="text-white" icon="mdi-cash-refund" />
                        <p className="ml-2">Historial de Recargas</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/Referencias">
                    <div className="mt-2 cursor-pointer bg-gray-900 rounded-lg  p-2 border-r-4 border-green-400 py-3 transform hover:scale-105 transition-transform duration-300  hover:bg-slate-300 hover:text-slate-950 hover:font-bold">
                      <div className="flex items-center">
                        <Icon icon="mdi-account-multiple-plus-outline" />
                        <p className="ml-2">Referencias</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/Transacciones">
                    <div className=" mt-2 cursor-pointer bg-gray-900 rounded-lg p-2 py-3 border-r-4 border-green-400 transform hover:scale-105 transition-transform duration-300  hover:bg-slate-300 hover:text-slate-950 hover:font-bold">
                      <div className="flex items-center">
                        <Icon icon="mdi-rotate-orbit" />
                        <p className="ml-2">Historial</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/Ajustes">
                    <div className="mt-2 cursor-pointer bg-gray-900 rounded-lg  p-2 border-r-4 border-green-400 py-3 transform hover:scale-105 transition-transform duration-300  hover:bg-slate-300 hover:text-slate-950 hover:font-bold">
                      <div className="flex items-center">
                        <Icon icon="material-symbols:settings" className="" />
                        <p className="ml-2">Ajustes</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="https://t.me/TTrading_Isma" target="_blank">
                    <div className="mt-2 cursor-pointer bg-gray-900 rounded-lg  p-2 border-r-4 border-green-400 py-3 transform hover:scale-105 transition-transform duration-300  hover:bg-slate-300 hover:text-slate-950 hover:font-bold">
                      <div className="flex items-center">
                        <Icon icon="fluent:person-support-20-filled" />
                        <p className="ml-2">Soporte</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="bg-red h-24 flex items-end justify-center ">
                  <button
                    className="mb-5 cursor-pointer bg-red-600 rounded-lg  p-2 border-r-4 border-red-700 flex items-center transform hover:scale-105 transition-transform duration-300 hover:font-bold"
                    type="button"
                    onClick={handleLogout}
                  >
                    <Icon icon="majesticons:logout" />
                    <p className="ml-2 font-bold">Cerrar Sesión</p>
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
            <div className=" bg-opacity-95 bg-gray-800 p-2 ">
              <div className="h-auto">
                <div className="">
                  <div className="flex items-center ">
                    <div className="" onClick={handleLogoClick}>
                      <img src="/assets/img/logo.png" alt="" className="h-16" />
                    </div>
                    <div className="flex justify-between">
                      <Link
                        to="/DashboardUser"
                        className=" lg:text-4xl text-xl"
                      >
                        T-Trading
                      </Link>
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

                        <div className="pl-7">
                          <div className="flex items-center">
                            <Icon icon="mdi:user" width="24" height="24" />
                            <h2 className="text-uppercase uppercase font-bold pl-">
                              {name}
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pl-7 font-semibold">
                    <h3>INVERSION: {invest && invest.userRevenue && (
                      <span> ${invest.userRevenue.amount}</span>
                    )}{" "}
                      USD</h3>
                    <h3 className="flex gap-2">
                      GANANCIA:{" "}
                      {revenue && revenue.userRevenue && (
                        <p>${revenue.userRevenue.accumulatedRevenue} USD</p>
                      )}
                    </h3>
                  </div>

                  <div className="  p-4 ">
                    <div className="flex lg:flex-col justify-around mt-2 w-[100%] items-center  ">
                      <Link to="/Recargar">
                        <button
                          className=" sm:text-sm sm:p-1 sm:mr-1  bg-green-500 p-2 rounded-lg sm:w-20 font-bold transform hover:scale-105 transition-transform duration-300  hover:bg-slate-300 hover:text-slate-950 hover:font-bold"
                          type="submit"
                          value=""
                        >
                          Recarga
                        </button>
                      </Link>
                      <Link to="/Retirar">
                        <button
                          className="sm:text-sm sm:p-1 sm:mr-1 bg-green-500 p-2 rounded-lg sm:w-20 mt-2 font-bold transform hover:scale-105 transition-transform duration-300  hover:bg-slate-300 hover:text-slate-950 hover:font-bold"
                          type="submit"
                          value=""
                        >
                          Retirar
                        </button>
                      </Link>
                      <Link to="/Transferir">
                        <button
                          className="sm:text-sm sm:p-1 bg-green-500 p-2 rounded-lg sm:w-20 mt-2 font-bold transform hover:scale-105 transition-transform duration-300  hover:bg-slate-300 hover:text-slate-950 hover:font-bold"
                          type="submit"
                          value=""
                        >
                          Transferir
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col h-[60%] justify-between px-4">
                  <div className="w-full ">
                    <Link to="/HistorialRecargas">
                      <div className="mt-2 cursor-pointer bg-gray-900 rounded-lg  p-2 border-r-4 border-green-400 py-3 transform hover:scale-105 transition-transform duration-300  hover:bg-slate-300 hover:text-slate-950 hover:font-bold">
                        <div className="flex items-center">
                          <Icon className="text-white" icon="mdi-cash-refund" />
                          <p className="ml-2">Historial de Recargas</p>
                        </div>
                      </div>
                    </Link>
                    <Link to="/Referencias">
                      <div className="mt-2 cursor-pointer bg-gray-900 rounded-lg  p-2 border-r-4 border-green-400 py-3 transform hover:scale-105 transition-transform duration-300  hover:bg-slate-300 hover:text-slate-950 hover:font-bold">
                        <div className="flex items-center">
                          <Icon icon="mdi-account-multiple-plus-outline" />
                          <p className="ml-2">Referencias</p>
                        </div>
                      </div>
                    </Link>
                    <Link to="/Transacciones">
                      <div className=" mt-2 cursor-pointer bg-gray-900 rounded-lg p-2 py-3 border-r-4 border-green-400 transform hover:scale-105 transition-transform duration-300  hover:bg-slate-300 hover:text-slate-950 hover:font-bold">
                        <div className="flex items-center">
                          <Icon icon="mdi-rotate-orbit" />
                          <p className="ml-2">Historial</p>
                        </div>
                      </div>
                    </Link>
                    <Link to="/Ajustes">
                      <div className="mt-2 cursor-pointer bg-gray-900 rounded-lg  p-2 border-r-4 border-green-400 py-3 transform hover:scale-105 transition-transform duration-300  hover:bg-slate-300 hover:text-slate-950 hover:font-bold">
                        <div className="flex items-center">
                          <Icon
                            icon="material-symbols:settings"
                          />
                          <p className="ml-2">Ajustes</p>
                        </div>
                      </div>
                    </Link>
                    <Link to="https://t.me/TTrading_Soporte">
                      <div className="mt-2 cursor-pointer bg-gray-900 rounded-lg  p-2 border-r-4 border-green-400 py-3 transform hover:scale-105 transition-transform duration-300  hover:bg-slate-300 hover:text-slate-950 hover:font-bold">
                        <div className="flex items-center">
                          <Icon icon="fluent:person-support-20-filled" />
                          <p className="ml-2">Soporte</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="w-40 h-28 flex flex-col justify-center items-center">
                    <button
                      className="mt-3 cursor-pointer bg-red-600 rounded-lg p-2 border-r-4 border-red-700 flex items-center transform hover:scale-105 transition-transform duration-300 hover:font-bold"
                      type="button"
                      onClick={handleLogout}
                    >
                      <Icon icon="majesticons:logout" />
                      <p className="ml-2">Cerrar Sesión</p>
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

export default HeaderUser;
