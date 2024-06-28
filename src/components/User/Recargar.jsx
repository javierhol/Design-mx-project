import React, { useState } from "react";
import HeaderUser from "./HeaderUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API_INVESTMENTS_USER } from "../../config/api";

function Recargar() {
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    amount: 0,
    hash: "",
    user: id,
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

    if (form.amount < 10) {
      toast.error("La cantidad minima para invertir es de 10$", {
        position: "top-left",
        autoClose: 2500,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    try {
      const response = await axios.post(API_INVESTMENTS_USER, form);
      localStorage.setItem("token", response.data.token);
      if (response.status === 201) {
        toast.success("Inversión realizada", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          navigate("/DashboardUser");
        }, 1500);
      }
    } catch (error) {
      toast.error("Inversión fallida", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const [usdtModalOpen, setUsdtModalOpen] = useState(false);
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

  const closeTransactionIdModal = () => {
    setTransactionIdModalOpen(false);
  };

  const handleAcceptUsdtModal = () => {
    closeUsdtModal();
    openTransactionIdModal();
  };


  const handleCopyPaymentLink = () => {
    const paymentLink = "TGmtYXSF5wuV1VnyrUA2khygEfMfxRuV6D"; // Reemplaza con tu enlace de pago real
    navigator.clipboard
      .writeText(paymentLink)
      .then(() => {
        linkCopiado();
      })
      .catch((error) => {
        console.error("Error al copiar el enlace:", error);
      });
  };

  return (
    <>
      <div className="bg-fondo-user bg-cover bg-center h-screen relative flex">
        <div className="  lg:w-[35%] fixed top-0 left-0 right-10 lg:relative">
          <HeaderUser />
        </div>
        <div className="h-[90%] w-[90%] flex flex-col justify-center items-center inset-0 transform">
          <h1 className="xl:text-5xl text-3xl ml-12 py-2 w-[250px] sm:text-3xl text-green-500 font-bold">
            Recargar
          </h1>
          <div className="flex flex-col  w-[400px] items-center ">
            <form
              onSubmit={handleSubmit}
              className=" lg:h-[100%] lg:mt-  lg:w-[200%] lg:flex lg:items-center lg:justify-center mt-56 lg:mt-0"
            >
              <div className="flex items-center  h-auto px-10 flex-col lg:flex-row    ml-10 lg:ml-0">
                {transactionIdModalOpen && (
                  <div className=" rounded-2xl bg-gray-700 lg:w-auto h-auto p-5 flex flex-col -4 items-center m-3 sm:h-[600px]  w-[300px] ">
                    <div className="flex flex-col  p-3 text-sm">
                      <div className="">
                        <h3>RECARGA {selectedNetwork} - USD</h3>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center items-center  ">
                      <img
                        src="/assets/qr.png"
                        alt=""
                        className="lg:w-32 w-32"
                      />
                      <h3 className="p-5">DIRECCION DE PAGO</h3>
                      <p className="pb-3 cursor-pointer" onClick={handleCopyPaymentLink}>
                        {paymentAddress}
                      </p>
                    </div>
                    <div className="text-center rounded-2xl bg-gray-700 w-auto  h-[90%] lg:h-36 p-3 lg:p-5 flex items-end justify-end mb-3">
                      <div className="">
                        <div className="">
                          <h3>TxID De la transacción:</h3>
                          <input
                            className="p-1 mt-2 rounded bg-gray-800"
                            type="text"
                            name="hash"
                            required
                            onChange={handleInputChange}
                          />
                          <div className="text-sm">
                            <button
                              className="mt-5 cursor-pointer bg-gray-800 rounded-xl p-2 border-r-4 border-green-400 mr-2"
                              onClick={closeTransactionIdModal}
                            >
                              Cancelar
                            </button>
                            <button className="mt-5 cursor-pointer bg-gray-800 rounded-xl p-2 border-r-4 border-green-400 ">
                              Confirmar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <h3 className=" text-center pb-0 w-[315px]">
                        Una vez realice el depósito a la dirección de pago,
                        presione el botón “CONFIRMAR” <br />
                        Cuando el depósito esté confirmado, tardará de 5 a 60
                        minutos en agregarse a su saldo.
                      </h3>
                    </div>
                  </div>
                )}
                <div className="flex flex-col   ">
                  <div
                    className="text-center mb-3 rounded-2xl bg-gray-700 w-[320px] inset-0 p-5 flex border-r-4 items-center border-green-400 sm:h-[200px] xl:mr-10 mt-10 lg:w-[350px] shadow-md transform hover:scale-105 transition-transform duration-300"
                    onClick={openUsdtModal}
                  >
                    <div className="w-60 text-xl lg:text-2xl cursor-pointe">
                      <p>Invertir con:</p>
                      <h1>USDT</h1>
                      <h3>RED TRC-20</h3>
                    </div>
                    <div className="cursor-pointer rounded-full ">
                      <img
                        src="/assets/USDT.webp"
                        alt=""
                        className="xl:h-32 h-[80px] w-50  text-white transition-all"
                      />
                    </div>
                  </div>
                  <div className="">
                    {usdtModalOpen && (
                      <div className="text-center rounded-2xl bg-gray-700 w-auto  h-[90%]   p-5 flex items-end justify-end sm:items-center sm:justify-center xl:w-[360px]">
                        <div className="">
                          <h3 className="lg:text-xl ">
                            Ingrese la cantidad a invertir en USDT:
                          </h3>
                          <input
                            className="p-1 mt-2 rounded bg-gray-800 placeholder-green-400"
                            type="decimal"
                            name="amount"
                            onChange={handleInputChange}
                            placeholder="Cantidad minima 10$"
                          />
                          <div className="">
                            <button
                              className="mt-5 cursor-pointer bg-gray-800 rounded-xl p-2 border-r-4 border-green-400 "
                              onClick={closeUsdtModal}
                            >
                              Cancelar
                            </button>
                            <button
                              className="mt-5 cursor-pointer bg-gray-800 rounded-xl p-2 border-r-4 border-green-400  ml-4"
                              onClick={handleAcceptUsdtModal}
                            >
                              Aceptar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recargar;
