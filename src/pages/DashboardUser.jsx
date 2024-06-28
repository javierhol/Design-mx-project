import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import axios from "axios";
import HeaderUser from "../components/User/HeaderUser";
import {
  API_INVESTMENTS,
  API_REVENUE,
  API_USERS,
  API_INVID,
  API_REFERS_COUNT,
} from "../config/api";
function DashboardUser() {
  const [data, setData] = useState([]);
  const [revenue, setRevenue] = useState([0]);
  const [refers, setCount] = useState([0]);
  const [code, setCode] = useState("");
  const user = localStorage.getItem("id");
  const investId = localStorage.getItem("idInvest");


  useEffect(() => {
    
        if (user !== null) {
          axios
            .get(API_REVENUE + user)
            .then((response) => {
              setRevenue(response.data);
            })
            .catch((error) => {
              console.log(error);
            });

          axios
            .get(API_REFERS_COUNT + user)
            .then((response) => {
              setCount(response.data);
            })
            .catch((error) => {
              console.log(error);
            });

          axios
            .get(API_INVID + user)
            .then((response) => {
              setData(response.data);
              localStorage.setItem(
                "idInvest",
                response.data.userRevenue.investmentId
              );
            })
            .catch((error) => {
              console.log(error);
            });
        }
     
  }, [investId, user]);

  useEffect(() => {
    axios
      .get(API_USERS + user)
      .then((response) => {
        setCode(response.data.CodeInvitation);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const copyToClipboard = () => {
    const codeInput = document.getElementById("codeInput");
    codeInput.select();
    document.execCommand("copy");
  };

  // const [sessionTimeout, setSessionTimeout] = useState(null);

  // const resetSessionTimeout = () => {
  //   if (sessionTimeout) {
  //     clearTimeout(sessionTimeout);
  //   }

  //   const timeout = setTimeout(() => {
  //     localStorage.clear();
  //     window.location.replace("/");
  //   }, 600000);

  //   setSessionTimeout(timeout);
  // };

  // const handleUserActivity = () => {
  //   resetSessionTimeout();
  // };

  // useEffect(() => {
  //   resetSessionTimeout();

  //   window.addEventListener("mousemove", handleUserActivity);
  //   window.addEventListener("keydown", handleUserActivity);

  //   return () => {
  //     if (sessionTimeout) {
  //       clearTimeout(sessionTimeout);
  //     }
  //     window.removeEventListener("mousemove", handleUserActivity);
  //     window.removeEventListener("keydown", handleUserActivity);
  //   };
  // }, [sessionTimeout]);

  return (
    <>
      <div className="bg-fondo-user bg-cover bg-center  relative flex">
        <div class="z-30 lg:w-[30%] fixed top-0 left-0 right-10 lg:relative">
          <HeaderUser />
        </div>
        <div className="z-10 lg:w-[90%] lg:h-[100%] h-[90%] pl-10 lg:pl-0 ">
          <div className="flex flex-col items-center justify-center h-[90%]">
            <div className="lg:w-[100%] h-[80%] flex flex-col xl:justify-around items-center sm:w-[95%] sm:justify-center ">
              <div className=" w-[95%]  text-center">
                <h1 class="lg:text-4xl text-xl font-bold mt-5 text-green-500 sm:text-3xl">
                  Informacion de usuario
                </h1>

                <div class="mt-10">
                  <div class=" p-4 rounded shadow-md transform hover:scale-105 transition-transform duration-300 flex justify-center ">
                    <div className="text-center mb-3 rounded-2xl bg-gray-700 w-auto p-5 flex border-r-4 items-center  border-green-400 lg:mr-7 mx-5 justify-between lg:w-1/4">
                      <div>
                        <h3 class="xl:text-2xl text-xl font-bold text-green-400 mb-5">
                          Inversión
                        </h3>

                        {data && data.userRevenue ? (
                      <p class="lg:text-xl mt-3 text-2xl font-bold">
                        ${data.userRevenue.amount} USD
                      </p>
                    ) : (
                      <p class="lg:text-xl mt-3 text-2xl font-bold">$0 USD</p>
                    )}

                     
                      </div>

                      <img
                        src="/assets/billetera.png"
                        alt=""
                        class="xl:w-[130px] w-[100px]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className=" flex-col lg:flex-row w-80 flex mt-10 lg:justify-around justify-center  lg:w-[90%] ">
                <div class="text-center mb-3 rounded-2xl  bg-gray-700 w-auto p-5 flex border-r-4 items-center border-green-400 justify-between lg:mr-7 mx-5 lg:w-1/4 transform hover:scale-105 transition-transform duration-300 ">
                  <div>
                    <h3 class="xl:text-2xl  text-xl w-10 font-bold text-green-400">
                      Ganancias diarias
                    </h3>

                    {revenue && revenue.userRevenue ? (
                          <p class="text-xl font-bold">
                            ${revenue.userRevenue.dailyRevenue} USD
                          </p>
                        ) : (
                          <p class="text-xl font-bold">$0 USD</p>
                        )}
                  </div>

                  <img
                    src="/assets/gd.png"
                    alt=""
                    class="lg:w-[100px] w-[100px] "
                  />
                </div>

                <div className="text-center mb-3 rounded-2xl bg-gray-700 w-auto p-5 border-r-4 items-center transform hover:scale-105 transition-transform duration-300 flex justify-center  border-green-400 lg:mr-7 mx-5 lg:w-1/4">
                  <div>
                    <h3 class="xl:text-2xl text-xl font-bold text-green-400 mb-5">
                      Ganancia
                    </h3>

                    {revenue && revenue.userRevenue ? (
                      <p className="text-xl font-bold">
                        ${revenue.userRevenue.accumulatedRevenue} USD
                      </p>
                    ) : (
                      <p className="text-xl font-bold">$0 USD</p>
                    )}
                  </div>

                  <img
                    src="/assets/Ganancias.png"
                    alt=""
                    class="xl:w-[130px] w-[100px]"
                  />
                </div>
                <div className="text-center mb-3 rounded-2xl bg-gray-700 w-auto p-5  border-r-4 items-center transform hover:scale-105 transition-transform duration-300 flex  border-green-400 justify-between mx-5 lg:w-1/4">
                  <div>
                    <h3 class="xl:text-2xl font-bold text-xl text-green-400">
                      Referidos
                    </h3>
                    <p class="xl:text-xl mt-3 font-bold">{refers}</p>
                  </div>
                  <img
                    src="/assets/referidos.png"
                    alt=""
                    class="xl:w-[100px] w-[100px]"
                  />
                </div>
              </div>

              <div className="flex justify-center items-center mt-10">
                <div className="relative ">
                  <input
                    id="codeInput"
                    type="text"
                    value={code}
                    className="xl:py-5 p-2  lg: mt-2 rounded-xl xl:w-[500px] w-[300px] sm:py-3  text-center text-xl lg:text-2xl font-bold bg-gray-700 text-white"
                    readOnly
                  />
                  <FaRegCopy
                    onClick={copyToClipboard}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer w-7 text-teal-500 lg:h-[100px] h-[20px] "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardUser;
