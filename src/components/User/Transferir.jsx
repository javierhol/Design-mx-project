import React, { useState } from "react";
import HeaderUser from "./HeaderUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { API_CREATE_TRANSFER } from "../../config/api";

export const Transferir = () => {
  const idInvest = localStorage.getItem("idInvest");
  const idRevenue = localStorage.getItem("idRevenue");
  const user = localStorage.getItem("id");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    amount: 0,
    investmentId: idInvest,
    revenueId: idRevenue,
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

    try {
      const response = await axios.post(API_CREATE_TRANSFER, form);
      localStorage.setItem("token", response.data.token);

      if (response.status === 201) {
        toast.success("Transacción Exitosa", {
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
        }, 2200);
      }
    } catch (error) {
      toast.error("Transacción Fallida", {
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
  const [busdModalOpen, setBusdModalOpen] = useState(false);
  const [btcModalOpen, setBtcModalOpen] = useState(false);
  const [transactionIdModalOpen, setTransactionIdModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState("");
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

  const openBtcModal = () => {
    handleSelectNetwork("USDT RED BEP-20");
    setBtcModalOpen(true);
  };

  const openBusdModal = () => {
    setBusdModalOpen(true);
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

  const closeTransactionIdModal = () => {
    setTransactionIdModalOpen(false);
  };

  const handleAcceptUsdtModal = () => {
    closeUsdtModal();
    openTransactionIdModal();
  };

  const handleAcceptBtcModal = () => {
    closeBtcModal();
    openTransactionIdModal();
  };

  const handleConfirmTransaction = () => {
    // Aquí puedes realizar la acción deseada con el ID de transacción
    // y luego cerrar el modal de ID de transacción si es necesario.
    closeTransactionIdModal();
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
      <div class="bg-fondo-user bg-cover bg-center h-screen relative flex">
        <div class="  lg:w-[35%] fixed top-0 left-0 right-10 lg:relative">
          <HeaderUser />
        </div>
        <div className="h-[90%] w-[90%] flex flex-col justify-center items-center ">
          <h1 class="xl:text-5xl text-3xl ml-12 py-2 w-[250px] sm:text-3xl text-green-500 font-bold">
            Transferir
          </h1>
          <div className="flex flex-col  w-[400px] items-center ">
            <div className="flex items-center mr-14 h-auto  xl:mr-1 mt-10  w-[200px] lg:w-[350px] lg:ml-7">
              <div
                className="text-center mb-3 rounded-2xl shadow-md transform hover:scale-105 transition-transform duration-300 bg-gray-700 w-auto p-5 flex border-r-4 items-center border-green-400 sm:h-[200px] sm:w-[400px] "
                onClick={openUsdtModal}
              >
                <div className="w-60 xl:text-2xl sm:text-xl cursor-pointer ">
                  <p className="">
                    Transferir a ganancias
                  </p>
                  <h1>USDT</h1>
                  {/* <h3>RED TRC-20</h3> */}
                </div>
                <div className="cursor-pointer">
                  <img
                    src="/assets/USDT.webp"
                    alt=""
                    class="lg:h-32 lg:w-[150px] h-[100px]"
                  />
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="">
                {usdtModalOpen && (
                  <div className="text-center rounded-2xl bg-gray-700 lg:w-auto  h-[90%] p-5 flex items-end justify-end sm:justify-center w-[300px] sm:ml-10 xl:h-[200px] ml-10">
                    <div className="">
                      <h3 class="lg:text-xl ">
                        Ingrese la cantidad de transferir a ganancias
                      </h3>
                      <input
                        class="p-1 mt-2 rounded-lg bg-gray-800"
                        type="decimal"
                        name="amount"
                        onChange={handleInputChange}
                      />
                      <div className="text-sm">
                        <button
                          class="mt-5 cursor-pointer bg-gray-800 rounded-xl p-2 border-r-4 border-green-400 mr-3"
                          onClick={closeUsdtModal}
                        >
                          Cancelar
                        </button>
                        <button
                          class="mt-5 cursor-pointer bg-gray-800 rounded-xl p-2 border-r-4 border-green-400 mr-3"
                          onClick={handleSubmit}
                        >
                          Aceptar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
