import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "././index.css";

import DashboardUser from "./pages/DashboardUser";
import Recargar from "./components/User/Recargar";
import Register from "./components/Register";
import Login from "./components/Login";
import Referencias from "./components/User/Referencias";
import Ajustes from "./components/User/Ajustes";
import SolicitudesAdmin from "./components/admin/SolicitudesAdmin";
import UsuariosAdmin from "./components/admin/UsuariosAdmin";
import AjustesAdmin from "./components/admin/AjustesAdmin";
import { ToastContainer } from "react-toastify";
import LoginAdmin from "./components/admin/LoginAdmin";
import { Retirar } from "./components/User/Retirar";
import { Transferir } from "./components/User/Transferir";
import HistorialRecargas from "./components/User/HistorialRecargas";
import Transacciones from "./components/User/Transacciones";
import { ProtectedUser } from "./auth/ProtectedUser";
import { ProtectedAdmin } from "./auth/ProtectedAdmin";
import Tables from "./components/User/Tables";
import Loader from "./components/Loader";
import RecoveryPassAdmin from "./components/admin/RecoveryPassAdmin";
import CodePassword from "./components/admin/CodePassword";
import NewPasswordAdmin from "./components/admin/NewPasswordAdmin";
import RecoveryPassUser from "./components/User/RecoveryPassUser";
import CodePasswordUser from "./components/User/CodePasswordUser";
import NewPasswordUser from "./components/User/NewPasswordUser";
import KeyWithdrawal from "./components/User/KeyWithdrawal";
import RecoveryKey from "./components/User/RecoveryKey";
import VerifyKeyCode from "./components/User/VerifyKeyCode";
import NewKey from "./components/User/NewKey";

const Home = lazy(() => import("./pages/Home"));
//import Home2 from "./pages/Home2";

function App() {
  let user = "user";
  let admin = "admin";
  return (
    <Router>
      <>
        <ToastContainer />

        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            }
          />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/LoginAdmin" element={<LoginAdmin />} />

          <Route
            path="/RecoveryPassAdmin"
            element={
              <ProtectedAdmin rol={admin} redirectTo={"/UsuariosAdmin"}>
                <>
                  <RecoveryPassAdmin />
                </>
              </ProtectedAdmin>
            }
          />
          <Route
            path="/VerifyCodeAdmin"
            element={
              <ProtectedAdmin rol={admin} redirectTo={"/UsuariosAdmin"}>
                <>
                  <CodePassword />
                </>
              </ProtectedAdmin>
            }
          />
          <Route
            path="/NewPasswordAdmin"
            element={
              <ProtectedAdmin rol={admin} redirectTo={"/UsuariosAdmin"}>
                <>
                  <NewPasswordAdmin />
                </>
              </ProtectedAdmin>
            }
          />

          <Route
            path="/UsuariosAdmin"
            element={
              <ProtectedAdmin rol={admin} redirectTo={"/UsuariosAdmin"}>
                <>
                  <UsuariosAdmin />
                </>
              </ProtectedAdmin>
            }
          />

          <Route
            path="/SolicitudesUsuarios"
            element={
              <ProtectedAdmin rol={admin} redirectTo={"/SolicitudesUsuarios"}>
                <>
                  <SolicitudesAdmin />
                </>
              </ProtectedAdmin>
            }
          />
          <Route
            path="/Solicitudes"
            element={
              <ProtectedAdmin rol={admin} redirectTo={"Solicitudes"}>
                <>
                  <SolicitudesAdmin />
                </>
              </ProtectedAdmin>
            }
          />
          <Route
            path="/usuarios"
            element={
              <ProtectedAdmin rol={admin} redirectTo={"/usuarios"}>
                <>
                  <SolicitudesAdmin />
                </>
              </ProtectedAdmin>
            }
          />

          <Route
            path="/AjustesAdmin"
            element={
              <ProtectedAdmin rol={admin} redirectTo={"/AjustesAdmin"}>
                <>
                  <AjustesAdmin />
                </>
              </ProtectedAdmin>
            }
          />

          {/** ROUTES USERS **/}

          <Route
            path="/RecoveryPassUser"
            element={
              <ProtectedUser rol={user} redirectTo={"/Ajustes"}>
                <>
                  <RecoveryPassUser />
                </>
              </ProtectedUser>
            }
          />
          <Route
            path="/VerifyCodeUser"
            element={
              <ProtectedUser rol={user} redirectTo={"/Ajustes"}>
                <>
                  <CodePasswordUser />
                </>
              </ProtectedUser>
            }
          />
          <Route
            path="/NewPasswordUser"
            element={
              <ProtectedUser rol={user} redirectTo={"/Ajustes"}>
                <>
                  <NewPasswordUser />
                </>
              </ProtectedUser>
            }
          />

          <Route
            path="/DashboardUser"
            element={
              <ProtectedUser rol={user} redirectTo={"/DasboardUser"}>
                <>
                  <DashboardUser />
                </>
              </ProtectedUser>
            }
          />

          <Route
            path="/Transacciones"
            element={
              <ProtectedUser rol={user} redirectTo={"/Transacciones"}>
                <>
                  <Transacciones />
                </>
              </ProtectedUser>
            }
          />
          <Route
            path="/Recargar"
            element={
              <ProtectedUser rol={user} redirectTo={"/Recargar"}>
                <>
                  <Recargar />
                </>
              </ProtectedUser>
            }
          />
          <Route
            path="/Referencias"
            element={
              <ProtectedUser rol={user} redirectTo={"/Referencias"}>
                <>
                  <Referencias />
                </>
              </ProtectedUser>
            }
          />
          <Route
            path="/Ajustes"
            element={
              <ProtectedUser rol={user} redirectTo={"/Ajustes"}>
                <>
                  <Ajustes />
                </>
              </ProtectedUser>
            }
          />
          <Route
            path="/Tables"
            element={
              <ProtectedUser rol={user} redirectTo={"/Tables"}>
                <>
                  <Tables />
                </>
              </ProtectedUser>
            }
          />
          <Route
            path="/Retirar"
            element={
              <ProtectedUser rol={user} redirectTo={"/Retirar"}>
                <>
                  <Retirar />
                </>
              </ProtectedUser>
            }
          />
          <Route
            path="/KeyWithdrawal"
            element={
              <ProtectedUser rol={user} redirectTo={"/Ajustes"}>
                <>
                  <KeyWithdrawal />
                </>
              </ProtectedUser>
            }
          />
          <Route
            path="/RecoveryKey"
            element={
              <ProtectedUser rol={user} redirectTo={"/Ajustes"}>
                <>
                  <RecoveryKey />
                </>
              </ProtectedUser>
            }
          />
          <Route
            path="/VerifyKeyCode"
            element={
              <ProtectedUser rol={user} redirectTo={"/Ajustes"}>
                <>
                  <VerifyKeyCode />
                </>
              </ProtectedUser>
            }
          />
          <Route
            path="/ResetKeyWithdrawal"
            element={
              <ProtectedUser rol={user} redirectTo={"/Ajustes"}>
                <>
                  <NewKey />
                </>
              </ProtectedUser>
            }
          />
          <Route
            path="/Transferir"
            element={
              <ProtectedUser rol={user} redirectTo={"/Transferir"}>
                <>
                  <Transferir />
                </>
              </ProtectedUser>
            }
          />
          <Route
            path="/HistorialRecargas"
            element={
              <ProtectedUser rol={user} redirectTo={"/HistorialRecargas"}>
                <>
                  <HistorialRecargas />
                </>
              </ProtectedUser>
            }
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;
