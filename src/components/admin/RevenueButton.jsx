import React from "react";
import axios from "axios";
import { API_CALCULATE_REVENUE } from "../../config/api";

import { toast } from "react-toastify";

const RevenueButton = () => {
  const handleRevenue = () => {
    axios.post(API_CALCULATE_REVENUE).then((response) => {
      console.log(response.data);

      if (response.data.status === 200) {
        toast.success("Ganancias calculadas ", {
          position: toast.POSITION.TOP_RIGHT,
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
        }, 1500);
      } else {
        toast.error("Error al calcular las ganancias");
      }
    });
  };
  return (
    <div className="flex justify-center">
      <button
        onClick={handleRevenue}
        class="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group"
      >
        <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-400 rounded-full group-hover:w-64 group-hover:h-56"></span>
        <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
        <span class="relative font-bold text-xl">Calcular Ganancias</span>
      </button>
    </div>
  );
};

export default RevenueButton;
