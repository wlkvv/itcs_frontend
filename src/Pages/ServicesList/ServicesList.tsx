import "./ServicesList.sass";
import SearchBar from "./SearchBar/SearchBar";
import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard/ServiceCard";
import { iServicesMock, requestTime } from "../../Consts";
import { Service } from "../../Types";
import { useSearch } from '/home/student/labs_4/lab_6/src/hooks/useSearch.ts';
import { useToken } from "../..//hooks/users/useToken.ts";
import axios from "axios";

const ServicesList = () => {
    const [services, setServices] = useState<Service[]>([]);
    const { query } = useSearch();
    const [isMock, setIsMock] = useState<boolean>(false);
    const { access_token } = useToken();
    const [cartId, setCartId] = useState(null);

    const searchServices = async () => {

        try {
            const response = await fetch(`http://176.57.215.76:8000/api/services/search?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok) {
                createMock();
                return;
            }

            const services: Service[] = await response.json()

            setServices(services)
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }


    const createMock = () => {

        setIsMock(true);
        setServices(iServicesMock)

    }

    useEffect(() => {
        searchServices()
    }, [query])

    const cards = services.map(service => (
        <ServiceCard service={service} key={service.id} isMock={isMock} />
    ))

    return (
        <div className="cards-list-wrapper">
            <div className="top">
                <h2>Список услуг</h2>
                <SearchBar />
            </div>
            <div className="bottom">
                {cards}
            </div>
        </div>
    )
}

export default ServicesList;
