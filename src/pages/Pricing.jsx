import React from "react";

function Pricing() {
  return (
    <div className="font-[sans-serif]">
      <div className="max-w-5xl max-lg:max-w-3xl mx-auto">
        <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-32 mt-6 max-sm:max-w-sm max-sm:mx-auto">
          <div className="shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] rounded-lg overflow-hidden transition-all duration-500 hover:scale-105 relative transform scale-110 w-[400px]">
            <div className="h-40 bg-[#27448a] text-center p-4">
              <h3 className="text-3xl text-white mb-1">Individual</h3>
              <p className="text-sm text-white">2 Meses</p>
            </div>
            <div className="h-32 w-32 mx-auto -mt-16 shadow-xl rounded-full bg-[#27448a] text-white border-[3px] flex flex-col items-center justify-center border-white">
              {/* <p className="text-sm font-bold">Save 29%</p> */}
              <h3 className="text-3xl">$0</h3>
            </div>
            <div className="px-8 py-6 mt-6">
              <ul className="space-y-6">
                <li className="flex items-center text-md text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    className="mr-3 bg-orange-500 fill-white rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Agrega hasta 1 RFC para la recepción de CFDI´s (Facturas)
                </li>
                <li className="flex items-center text-md text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    className="mr-3 bg-orange-500 fill-white rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Recepción y administración de CFDI´s (Facturas)
                </li>
                <li className="flex items-center text-md text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    className="mr-3 bg-orange-500 fill-white rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Notificaciones
                </li>
                <li className="flex items-center text-md text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    className="mr-3 bg-orange-500 fill-white rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>

                  Descarga ilimitada de facturas
                </li>
                <li className="flex items-center text-md text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    className="mr-3 bg-orange-500 fill-white rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Unlimited basic feature
                </li>
              </ul>
              <button
                type="button"
                className="w-full mt-8 px-5 py-2.5 text-md text-white bg-[#27448a] hover:bg-blue-700 rounded-full"
              >
                Get Started
              </button>
            </div>
          </div>
          <div className="shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] rounded-lg overflow-hidden transition-all duration-500 hover:scale-105 transform scale-110 mx-44 w-[400px]">
            <div className="h-40 bg-[#ff6136] text-center p-4">
              <h3 className="text-3xl text-white mb-1">Business</h3>
              <p className="text-sm text-white">3 Meses</p>
            </div>
            <div className="h-32 w-32 mx-auto -mt-16 shadow-xl rounded-full bg-[#ff6136] text-white border-[3px] flex flex-col items-center justify-center border-white">
              {/* <p className="text-sm font-bold">Save 29%</p> */}
              <h3 className="text-3xl">$0</h3>
            </div>
            <div className="px-8 py-6 mt-6">
              <ul className="space-y-6">
                <li className="flex items-center text-md text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    className="mr-3 bg-orange-500 fill-white rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Agrega hasta 1 RFC para la recepción de CFDI´s (Facturas)
                </li>
                <li className="flex items-center text-md text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    className="mr-3 bg-orange-500 fill-white rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Genera tu Quickbyll ID 
                </li>
                <li className="flex items-center text-md text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    className="mr-3 bg-orange-500 fill-white rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Emisión, recepción y administración de CFDI´s (Facturas)
                </li>
                <li className="flex items-center text-md text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    className="mr-3 bg-orange-500 fill-white rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Notificaciones
                </li>
                <li className="flex items-center text-md text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    className="mr-3 bg-orange-500 fill-white rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  +50 timbres fiscales gratis 
                </li>
                <li className="flex items-center text-md text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    className="mr-3 bg-orange-500 fill-white rounded-full p-[3px]"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                      data-original="#000000"
                    />
                  </svg>
                  Agrega hasta 1 RFC para la emisión de CFDI´s (Facturas)
                </li>
              </ul>
              <button
                type="button"
                className="w-full mt-8 px-5 py-2.5 text-md text-white bg-[#ff6136] hover:bg-orange-600 rounded-full"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
