import React from 'react'
import withRedux from './hoc/withRedux'
import withRouter from './hoc/withRouter'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/NavBar/NavBar'
import HomePage from './pages/HomePage'
import AuthLayout from './layout/authLayout'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardLayout from './layout/dashboardLayout'
import GeneralStatus from './components/GeneralStatus'
import BankAccountStatus from './components/BankAccountStatus'
import SignUpPage from './pages/SingUpPage'
import Profile from './pages/Profile'
import CategoriesSettingsPage from './pages/CategoriesSettingsPage'
import Modals from './components/Modals'
import BankAccountsSettingsPage from './pages/BankAccountsSettingsPage'
import withThemeProvider from './hoc/withThemeProvider'
import SettingsLayout from './layout/SettingsLayout'

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
                    <Route index element={<LoginPage/>}/>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="signup" element={<SignUpPage/>}/>
                    <Route path="*" element={<LoginPage/>}/>
                </Route>
                <Route path="dashboard/" element={
                    <ProtectedRoute redirect='/auth/login'>
                        <DashboardLayout/>
                    </ProtectedRoute>
                }>
                    <Route path="bank-accounts/" element={<GeneralStatus/>}/>
                    <Route path="bank-accounts/:bankAccountId" element={<BankAccountStatus/>}/>
                    <Route path="settings" element={
                        <SettingsLayout/>
                    }>
                        <Route path="profile" element={<Profile/>}/>
                        <Route path="categories" element={<CategoriesSettingsPage/>}/>
                        <Route path="bank-accounts" element={<BankAccountsSettingsPage/>}/>
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
            <Modals/>
        </main>
    </div>
  )
}

const AppWithStoreAndRoutes = withRedux(withRouter(withThemeProvider(App)))
export default AppWithStoreAndRoutes
