import React, { useState } from "react";
import HeaderUser from "./HeaderUser";
import KeyWithdrawal from "./KeyWithdrawal";

function Ajustes() {

  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  return (
    <>
      <div className="bg-fondo-user bg-cover bg-center h-screen relative flex">
        <div className="lg:flex">
          <div className=" z-30 lg:w-[45%] fixed top-0 left-0 right-10 lg:relative">
            <HeaderUser />
          </div>
          <div className=" lg:w-[70%] h-[70%] flex flex-col items-center justify-center pt-10 ">
            <div className="lg:w-[85%] flex ">
              <h1 className="xl:text-5xl  p-4 text-3xl text-green-500 font-bold">Ajustes</h1>
            </div>
            <div className="w-[90%]  flex flex-col lg:flex-row mt-6 xl:ml-20">
              <a href="/RecoveryPassUser" className="text-center rounded-2xl bg-gray-700 xl:w-auto h-[90%] p-5 flex border-r-4 items-center border-green-400 sm:w-[350px] sm:mr-4 transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-center text-2xl">Cambiar contraseña</h3>
                <img
                  src="/assets/cambiar-png.png"
                  alt=""
                  className="xl:w-[200px] w-[150px]"
                />
              </a>

              <a href="#" className="text-center rounded-2xl bg-gray-700 xl:w-auto h-[90%] p-5 border-r-4 flex items-center border-green-400 sm:w-[350px] py-8 mt-6 lg:mt-0 transform hover:scale-105 transition-transform duration-300"
                onClick={handleOpenDialog}
              >
                <div className="xl:w-[250px]">
                  <h3 className="text-center text-2xl  ">
                    Configurar clave de retiro
                  </h3>
                </div>
                <img
                  src="/assets/retiro.webp"
                  alt=""
                  className="xl:w-[200px] w-[150px] h-[120px]"
                />
              </a>
            </div>
            {
              isDialogOpen && <KeyWithdrawal isDialogOpen={isDialogOpen} onClose={handleCloseDialog} />
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Ajustes;
