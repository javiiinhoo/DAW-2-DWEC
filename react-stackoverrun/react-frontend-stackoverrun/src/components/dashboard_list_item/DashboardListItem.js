import "./DashboardListItem.css";
import { useNavigate } from "react-router-dom";
const DashboardListItem = (props) => {
    const navigate = useNavigate();
    const onClick = () => {
        console.log('clicked');
        navigate(`/dashboards/${props.dashboard.id}`);
    }

    return <div onClick={onClick} className='dashboard-li' key={props.dashboard.id}>
        <h3>{props.dashboard.title}</h3>
        <p>{props.dashboard.description}</p>
    </div>
}

export default DashboardListItem;
