import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import {BrowserRouter, Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react'
import Header from "./Components/Header/Header";
import {Service} from "./Types";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import ServicePage from "./Pages/ServicePage/ServicePage";
import ServicesList from "./Pages/ServicesList/ServicesList";
import HomePage from "./Pages/HomePage/HomePage";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {useAuth} from "./hooks/users/useAuth";
import SignIn from "./Pages/LoginPage/SignIn/SignIn";
import SignUp from "./Pages/LoginPage/SignUp/SignUp";
import OrdersPage from "./Pages/OrdersPage/OrdersPage";
import OrderPage from "./Pages/OrdersPage/OrderPage/OrderPage.tsx";
import CartPage from "./Pages/CartPage/CartPage.tsx";
import ServiceEditor from "./Pages/ServiceEdit/ServiceEdit.tsx";

const LoginFormLayout = () => {
	return (
		<div className="login-wrapper">
			<Outlet />
		</div>
	)
}

function App() {

    

    const [selectedService, setSelectedService] = useState<Service | undefined>(undefined)

    return (
        <BrowserRouter basename="/it">

            <div className="App">

                <div className="wrapper">

                    <Header />

                    <div className="content-wrapper">

                        <Breadcrumbs selectedService={selectedService} setSelectedService={setSelectedService}/>

                        <Routes>
                            <Route path="/home" element={<HomePage />} />

                            <Route path="/" element={<Navigate to="/home" replace />} />

									<Route path="/auth/" element={<LoginFormLayout />} >

										<Route path="" element={<Navigate to="login/" replace />} />

										<Route path="login/" element={<SignIn />} />

										<Route path="register/" element={<SignUp />} />

									</Route>

                            <Route path="/services" element={<ServicesList />} />
                            

                            <Route path="/order/:id" element={<CartPage />} />

                            <Route path="/orders" element={<OrdersPage />} />

                            <Route path="/service/:id/" element={<ServiceEditor />} />

                            <Route path="/services/:id" element={<ServicePage selectedService={selectedService} setSelectedService={setSelectedService} />} />

                            <Route path="/orders/:id" element={<OrderPage />}
        />

                        </Routes>
                        <ToastContainer autoClose={1000} pauseOnHover={false} />

                    </div>

                </div>

            </div>

        </BrowserRouter>
    )
}

export default App
