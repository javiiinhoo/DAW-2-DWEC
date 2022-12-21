import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Main.css"
import DashboardListItem from "../../components/dashboard_list_item/DashboardListItem";
function Main(props) {
    useEffect(() => {
        document.title = 'Principal'
    });

    const axios = require("axios");
    const [dashboards, setDashboards] = useState([]);
    useEffect(() => {
        axios.get('http://raspi:8000/api/v1/dashboards').then(response => {
            console.log(response.data)
            setDashboards(response.data);
        })
    }, []);
    const dashboardToComponent = (d) => {
        return <DashboardListItem dashboard={d} />
    }

    return <div data-cy='issue3body'>
        <h2 data-cy='pageHeader'>
            Principal
        </h2>
        <div data-cy='dashboardsList'>
            {dashboards.map((dashboardToComponent))}
        </div>
        <footer>
            <div className='footer-section'>
                <h3>Enlaces Link</h3>
                <ul>
                    <li><Link to='/about'>Acerca de</Link></li>
                    <li><Link to='/examples'>Ejemplos</Link></li>
                </ul>
            </div>
            <div className='footer-section'>
                <h3>Enlaces a href</h3>
                <ul>
                    <li><a href='/about'>Acerca de</a></li>
                    <li><a href='/examples'>Ejemplos</a></li>
                </ul>
            </div>

        </footer>

    </div>
}

export default Main;

