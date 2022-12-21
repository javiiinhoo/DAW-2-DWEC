import React,{useState,useEffect}  from "react";
import { useParams} from "react-router-dom";
import DashboardListItem from "../../components/dashboard_list_item/DashboardListItem";
import axios from "axios";
function Dashboards(props) {

    const params = useParams();
    const [dashboards, setDashboards] = useState([]);
    useEffect(() => {
        axios.get('http://raspi:8000/api/v2/dashboards').then(response => {
            setDashboards(response.data);
        })
    }, []);
    const dashboardToComponent = (d) => {
        return <DashboardListItem  dashboard={d} />;
    };
    return (<div>
        <div data-cy='dashboardsList'>{dashboards.map(dashboardToComponent)}</div>
        <footer>
            <p data-cy='footerCopyright'>© Javier Gómez Becerra</p>
            <p data-cy='footerDebugInfo'>Este es el dashboard con ID: {params.dashboardId}</p>
        </footer>
    </div>
    )
}

export default Dashboards;