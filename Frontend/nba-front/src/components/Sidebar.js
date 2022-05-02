import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPlus, faBook, faBasketball, faPencil, faDollar, faCalendar, faHandshake } from '@fortawesome/free-solid-svg-icons'

const Sidebar = (props) => {
    const [currentState, setCurrentState] = props.currentState;
    const options = [
        {
            alias: "Home",
            name: "Home",
            icon: faHome,
            color: "text-white",
            href: "home"
        },
        {
            alias: "New Query",
            name: "New Query",
            icon: faPlus,
            color: "text-white",
            href: "newquery"
        },
        {
            alias: "My Queries",
            name: "My Queries",
            icon: faBook,
            color: "text-white"
        },
        {
            alias: "Team",
            name: "Team",
            icon: faBasketball,
            color: "text-gray-300"
        },
        {
            alias: "Strategy",
            name: "Strategy",
            icon: faHandshake,
            color: "text-gray-300"
        },
        {
            alias: "Form",
            name: "Form",
            icon: faPencil,
            color: "text-gray-300"
        },
        {
            alias: "Wage",
            name: "Wage",
            icon: faDollar,
            color: "text-gray-300"
        },
        {
            alias: "Date",
            name: "Date",
            icon: faCalendar,
            color: "text-gray-300"
        },
    ]

    return <Fragment> 
        <div className="bg-gray-800 h-full pt-10 pl-5">
            <div>
                <button className={`text-xl mb-3 hover:text-gray-300 ${currentState === "home" ? "text-green-400" : "text-white" }`}
                onClick={() => {
                    setCurrentState("home");
                }}>
                <FontAwesomeIcon icon={ faHome } /> Home</button>
            </div>
            <div>
                <Link to="/newquery"><button className={`text-xl mb-3 
                    ${false ? "text-green-400" : "text-white" }`}
                onClick={() => {
                    setCurrentState("Team");
                }}>
                <FontAwesomeIcon icon={ faBook } /> My Queries</button></Link>
            </div>
            <div>
                <Link to="/newquery"><button className={`text-xl mb-3 
                    ${(currentState === "Team" || currentState === "Strategy" || currentState === "Wage" || currentState == "Date" || currentState === "Form") ? "text-green-400" : "text-white" }`}
                onClick={() => {
                    setCurrentState("Team");
                }}>
                <FontAwesomeIcon icon={ faPlus } /> New Query</button></Link>
            </div>
            <div>
                <button className={`text-xl mb-3 ${currentState === "Team" ? "text-green-400" : "text-gray-300" }`}>
                <FontAwesomeIcon icon={ faBasketball } /> Team</button>
            </div>
            <div>
                <button className={`text-xl mb-3 ${currentState === "Strategy" ? "text-green-400" : "text-gray-300" }`}>
                <FontAwesomeIcon icon={ faHandshake } /> Strategy</button>
            </div>
            <div>
                <button className={`text-xl mb-3 ${currentState === "Form" ? "text-green-400" : "text-gray-300" }`}>
                <FontAwesomeIcon icon={ faPencil } /> Forms</button>
            </div>
            <div>
                <button className={`text-xl mb-3 ${currentState === "Wage" ? "text-green-400" : "text-gray-300" }`}>
                <FontAwesomeIcon icon={ faDollar } /> Wage</button>
            </div>
            <div>
                <button className={`text-xl mb-3 ${currentState === "Date" ? "text-green-400" : "text-gray-300" }`}>
                <FontAwesomeIcon icon={ faCalendar } /> Date</button>
            </div>
        </div>  
    </Fragment>
}

export default Sidebar;