// EditUserModal.jsx
import React, { useState } from "react";
import axios from "axios";
import { API_USERS_UPDATE_ADMIN } from "../../config/api";
import { toast } from "react-toastify";

const EditUserModal = ({ user, onClose, onUpdate }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;

    if (name === "totalrevenue") {
      parsedValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    }

    if (name === "totalinvest") {
      parsedValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    }

    if (name === "user_isActive") {

      parsedValue = value === "true" ? true : false;
  
    }

    setEditedUser((prevUser) => ({ ...prevUser, [name]: parsedValue }));
  };

  const isValidUUID = (uuid) => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(uuid);
  };

  const handleUpdateUser = () => {
    console.log("Valor de editedUser antes de la solicitud PUT:", editedUser);

    if (!isValidUUID(user.user_id)) {
      console.error("El user_id no es un UUID válido.");
      return;
    }

    const cleanedUserId = user.user_id.trim();
    const encodedUserId = encodeURIComponent(cleanedUserId);

    const requestData = {
      ...editedUser,
      totalrevenue: isNaN(parseFloat(editedUser.totalrevenue))
        ? 0
        : parseFloat(editedUser.totalrevenue),
      totalinvest: isNaN(parseFloat(editedUser.totalinvest))
        ? 0
        : parseFloat(editedUser.totalinvest),
    };

    console.log("requestData", requestData);

    const url = `${API_USERS_UPDATE_ADMIN}/${encodedUserId}`;

    axios
      .put(url, requestData)
      .then((response) => {
        if (response.data.status === 200) {
          toast.success("Usuario actualizado correctamente", {
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
            onUpdate(response.data);
            onClose();
            window.location.reload();
          }, 2000);
        } else {
          toast.error("Error al actualizar el usuario");
        }
      })
      .catch((error) => {
        console.error("Error al actualizar el usuario:", error);
      });
  };

  return (
    // Estructura del modal
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="bg-gray-700 p-8 max-w-md w-full rounded-md">
        <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
        <form>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Nombre:
            </label>
            <input
              type="text"
              name="user_fullName"
              value={editedUser.user_fullName}
              onChange={handleFieldChange}
              className="w-full border rounded-md py-2 px-3 bg-gray-700 font-bold"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="text"
              name="user_email"
              value={editedUser.user_email}
              onChange={handleFieldChange}
              className="w-full border rounded-md py-2 px-3  bg-gray-700 font-bold"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Inversión:
            </label>
            <input
              type="number"
              name="totalinvest"
              value={editedUser.totalinvest}
              onChange={handleFieldChange}
              className="w-full border rounded-md py-2 px-3  bg-gray-700 font-bold"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Balance:
            </label>
            <input
              type="number"
              name="totalrevenue"
              value={editedUser.totalrevenue}
              onChange={handleFieldChange}
              className="w-full border rounded-md py-2 px-3  bg-gray-700 font-bold"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
              Estado:
            </label>
            <select
              name="user_isActive"
              value={editedUser.user_isActive.toString()}
              onChange={handleFieldChange}
              className="w-full border rounded-md py-2 px-3  bg-gray-700 font-bold"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleUpdateUser}
            >
              Actualizar
            </button>
            <button
              type="button"
              className="ml-2 text-white bg-red-400 hover:bg-red-300 font-bold py-2 px-4 rounded-full"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
