import React, {useState} from "react";
import HeaderUser from "./HeaderAdmin";

function AjustesAdmin() {

  return (
    <>
      <div class="bg-fondo-user bg-cover bg-center h-screen relative">
        <div class="lg:flex">
          <div class=" z-30 lg:w-[25%] fixed top-0 left-0 right-10 lg:relative">
            <HeaderUser />
          </div>
          <div className=" lg:w-auto h-auto flex flex-col items-center justify-center">
            <div class="lg:w-[85%] flex justify-center lg:ml-[300px]">
              <h1 class="xl:text-5xl p-5 text-3xl text-green-500 font-bold ">
                Ajustes
              </h1>
            </div>
            <div className="flex flex-col lg:flex-row mt-6 xl:ml-80">
              <a
                class="cursor-pointer text-center rounded-2xl bg-gray-700 xl:w-auto h-[90%] p-5 flex border-r-4 items-center border-green-400 sm:w-[350px] sm:mr-4 transform hover:scale-105 transition-transform duration-300"
                href="/RecoveryPassAdmin"
              >
                <h3 class="text-center text-2xl">Cambiar contraseña</h3>
                <img
                  src="/assets/cambiar-png.png"
                  alt=""
                  class="xl:w-[200px] w-[150px]"
                />
              </a>

            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default AjustesAdmin;
