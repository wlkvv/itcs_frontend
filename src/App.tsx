import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import { useState } from 'react'
import Header from "./Components/Header/Header";
import {Service} from "./Types";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import ServicePage from "./Pages/ServicePage/ServicePage";
import ServicesList from "./Pages/ServicesList/ServicesList";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

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

                            <Route path="/" element={<Navigate to="/services" replace />} />

                            <Route path="/profile" element={<ProfilePage />} />

                            <Route path="/services" element={<ServicesList />} />

                            <Route path="/services/:id" element={<ServicePage selectedService={selectedService} setSelectedService={setSelectedService} />} />

                        </Routes>

                    </div>

                </div>

            </div>

        </BrowserRouter>
    )
}

export default App
