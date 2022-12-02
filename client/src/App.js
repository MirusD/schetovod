import withRedux from "./hoc/withRedux"
import withRouter from "./hoc/withRouter"
import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage";
import AuthLayout from "./layout/authLayout";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layout/dashboardLayout";
import GeneralStatus from "./components/GeneralStatus";
import BankAccountStatus from "./components/BankAccountStatus";
import SignUpPage from "./pages/SingUpPage";

function App() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 transition-colors duration-150 min-h-screen flex flex-col">
        <header className="bg-white">
            <Navbar className="container mx-auto"/>
        </header>
        <main className="flex grow">
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path="auth" element={<AuthLayout/>}>
                    {/*<Route index element={<LoginPage/>}/>*/}
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="signup" element={<SignUpPage/>}/>
                    {/*<Route path="*" element={<LoginPage/>}/>*/}
                </Route>
                <Route path="dashboard/bank-accounts/" element={
                    <ProtectedRoute redirect='/auth/login'>
                        <DashboardLayout/>
                    </ProtectedRoute>
                }>
                    <Route index element={<GeneralStatus/>}/>
                    <Route path=":bankAccountId" element={<BankAccountStatus/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </main>
    </div>
  )
}

const AppWithStoreAndRoutes = withRedux(withRouter(App))
export default AppWithStoreAndRoutes
