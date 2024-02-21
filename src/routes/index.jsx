import { BrowserRouter, Routes, Route } from "react-router-dom";
import UnProtectedRoute from "./unprotectedRoute";
import ProtectedRoute from "./protectedRoute";
import Signup from "../pages/AuthPages/Signup";
import Login from "../pages/AuthPages/Login";
import Dashboard from "../pages/MainFlow/Dashboard/Dashboard";
import Accounts from "../pages/MainFlow/Accounts/Accounts";
import AddCategory from "../pages/MainFlow/Categories/AddCategory";
import AddTransaction from "../pages/MainFlow/Transactions/AddTransaction";
import AllTransactions from "../pages/MainFlow/Transactions/AllTransactions";
import Layout from "../components/Layout/Layout";
import ForgetPassword from "../pages/AuthPages/ForgetPassword";

export default function RouteIndex() {

  return (
    <BrowserRouter>
      <Layout >
        <Routes>
          {
            <>
              <Route
                path="/"
                element={<UnProtectedRoute Component={Signup} />}
              />
              <Route
                path="/login"
                element={<UnProtectedRoute Component={Login} />}
              />
              <Route
                path="/forgetPassword"
                element={<UnProtectedRoute Component={ForgetPassword} />}
              />
              <Route
                path="/dashboard"
                element={<ProtectedRoute Component={Dashboard} />}
              />
              <Route
                path="/account"
                element={<ProtectedRoute Component={Accounts} />}
              />
              <Route
                path="/addCategory"
                element={<ProtectedRoute Component={AddCategory} />}
              />
              <Route
                path="/addTransaction"
                element={<ProtectedRoute Component={AddTransaction} />}
              />
              <Route
                path="/allTransaction"
                element={<ProtectedRoute Component={AllTransactions} />}
              />
            </>
          }
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
