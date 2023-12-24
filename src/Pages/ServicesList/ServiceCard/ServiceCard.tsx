import "./ServiceCard.sass"
import {Service} from "../../../Types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.jpg"

const ServiceCard = ({ service, isMock }: {service:Service, isMock:boolean }) => {

    const img = `http://176.57.215.76:8000/api/services/${service.id}/image/`

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : img}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {service.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/services/${service.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default ServiceCard;