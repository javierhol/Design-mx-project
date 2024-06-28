import React from 'react';

const ErrorModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-bg fixed inset-0 bg-black opacity-50"></div>
      <div className="modal-content  bg-white p-8 shadow-lg rounded-md animate__animated animate__bounceIn">
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-3xl font-bold text-red-600">Something went wrong</h2>
        </div>
        <p className="text-gray-800 text-center mb-4">
          Please try again later.
        </p>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mx-auto block"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
