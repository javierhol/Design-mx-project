import React, { useState } from "react";
import HeaderUser from "./HeaderUser";
import ConfirmKeyWithdrawal from "./ConfirmKeyWithdrawal";

export const Retirar = () => {
  const investId = localStorage.getItem("idInvest");
  const user = localStorage.getItem("id");

  const [isConfirmKeyModalOpen, setConfirmKeyModalOpen] = useState(false);

  const [form, setForm] = useState({
    amount: 0,
    wallet: "",
    investmentId: investId,
    userId: user,
  });

  const handleInputChange = ({ target }) => {
    const value =
      target.name === "amount" ? parseFloat(target.value) : target.value;
    setForm({
      ...form,
      [target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setConfirmKeyModalOpen(true);
  };

  const [usdtModalOpen, setUsdtModalOpen] = useState(false);
  const [busdModalOpen, setBusdModalOpen] = useState(false);
  const [btcModalOpen, setBtcModalOpen] = useState(false);
  const [transactionIdModalOpen, setTransactionIdModalOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [paymentAddress, setPaymentAddress] = useState("");
  const handleSelectNetwork = (network) => {
    setSelectedNetwork(network);

    // Actualizar la dirección de pago en función de la red seleccionada
    if (network === "USDT RED BEP-20") {
      setPaymentAddress("0xeF10f2d1c9173B6b25D5c403246b38a995c3e3d0");
    } else {
      setPaymentAddress("TGmtYXSF5wuV1VnyrUA2khygEfMfxRuV6D");
    }
  };
  const openUsdtModal = () => {
    handleSelectNetwork("USDT RED TRC-20 ");
    setUsdtModalOpen(true);
  };

  const openTransactionIdModal = () => {
    setTransactionIdModalOpen(true);
  };

  const closeUsdtModal = () => {
    setUsdtModalOpen(false);
  };

  const closeBusdModal = () => {
    setBusdModalOpen(false);
  };

  const closeBtcModal = () => {
    setBtcModalOpen(false);
  };

  const handleAcceptBtcModal = () => {
    closeBtcModal();
    openTransactionIdModal();
  };

  return (
    <>
      <div className="bg-fondo-user bg-cover bg-center lg:h-full h-screen relative flex">
        <div className="lg:flex lg:w-full">
          <div className="  lg:w-[40%] fixed top-0 left-0 right-10 lg:relative">
            <HeaderUser />
          </div>
          <div className="lg:h-[80%] flex flex-col justify-center items-center w-[100%]  text-center">
            <h1 className="xl:text-5xl text-2xl py-2 lg:items-start lg:flex text-center w-[250px] sm:text-3xl text-green-500 font-bold">
              Retirar
            </h1>
            <div className="">
              <p className=" lg:text-2xl lg:w-[700px] lg:text-center p-3  pl-8">
                Se cobrará una tarifa del 10% por cada retiro menor de 30$ y una
                tarifa fija de 3$ por cada retiro mayor de 30$
              </p>
            </div>

            <div className="flex flex-col  w-[90%] mt-4 ">
              <div className="lg:flex justify-center ">
                <div className="flex items-center justify-center h-auto ">
                  <div
                    className="text-center mb-3 rounded-2xl bg-gray-700 lg:w-auto p-5 flex border-r-4 shadow-md transform hover:scale-105 transition-transform duration-300 items-center border-green-400 sm:h-[200px] w-[250px] "
                    onClick={openUsdtModal}
                  >
                    <div className="w-60 xl:text-2xl sm:text-xl cursor-pointer">
                      <p>Retirar con:</p>
                      <h1>USDT</h1>
                      <h3>RED TRC-20</h3>
                    </div>
                    <div className="cursor-pointer">
                      <img
                        src="/assets/USDT.webp"
                        alt=""
                        className="xl:h-32 h-[80px] w-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="  flex items-center justify-center">
                  {usdtModalOpen && (
                    <div className="text-center rounded-2xl bg-gray-700 w-auto  h-[90%] lg:p-5 p-2 flex  sm:items-center sm:justify-center sm:w-[400px]   xl:h-[200px] xl:ml-10">
                      <div className="">
                        <h3 className="lg:text-xl">
                          Ingrese la cantidad a Retirar en USDT:
                        </h3>
                        <input
                          className="p-1 mt-2 rounded-lg bg-gray-800"
                          type="decimal"
                          name="amount"
                          required
                          onChange={handleInputChange}
                        />
                        <div className="pb-3 text-sm">
                          <button
                            className="mt-5 cursor-pointer bg-gray-800 rounded-xl p-2 border-r-4 border-green-400 mr-3"
                            onClick={closeUsdtModal}
                          >
                            Cancelar
                          </button>
                          <button
                            className="mt-5 cursor-pointer bg-gray-800 rounded-xl p-2 border-r-4 border-green-400 "
                            onClick={handleAcceptBtcModal}
                          >
                            Aceptar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {transactionIdModalOpen && (
                  <div className="flex items-center lg:justify-center mr-14 h-auto px-10 xl:mr-1  ">
                    <div
                      className="text-center mb-3 rounded-2xl bg-gray-700 w-auto p-5 flex border-r-4 items-center border-green-400 sm:h-[200px] xl:w-[400px] mt-5 ml-2 justify-center sm:w-[400px] sm:ml-11"
                      onClick={openUsdtModal}
                    >
                      <div className=" ">
                        <h3 className="text-xl">Ingrese la wallet:</h3>
                        <input
                          className="p-1 mt-2 rounded-lg bg-gray-800"
                          type="text"
                          name="wallet"
                          required
                          onChange={handleInputChange}
                        />
                        <div className="text-sm">
                          <button
                            className="mt-5 cursor-pointer bg-gray-800 rounded-xl p-2 border-r-4 border-green-400 mr-3"
                            onClick={closeBusdModal}
                          >
                            Cancelar
                          </button>
                          <button
                            className="mt-5 cursor-pointer bg-gray-800 rounded-xl p-2 border-r-4 border-green-400 "
                            onClick={handleAcceptBtcModal}
                          >
                            Aceptar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>

              <ConfirmKeyWithdrawal
                isDialogOpen={isConfirmKeyModalOpen}
                onClose={() => setConfirmKeyModalOpen(false)}
                dataWithdrawal={form} // Pasa los datos ingresados al componente ConfirmKeyWithdrawal
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
