import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import QuestionListItem from "../../components/question_list_item/QuestionListItem";

function DashboardDetail(props) {
    const params = useParams();
    const [dashboardTitle, setDashboardTitle] = useState('');
    const [dashboardDescription, setDashboardDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [hidden, setHidden] = useState(false);

    const url = `/dashboards/${params.dashboardId}/newQuestion`;
    useEffect(() => {
        axios.get(`http://raspi:8000/api/v2/dashboards/${params.dashboardId}?page_size=5`).then((response) => {
            setDashboardTitle(response.data.title);
            setDashboardDescription(response.data.description);
            setQuestions(response.data.questions);
        });
    }, []);

    const loadMore = () => {
        let l = questions[questions.length - 1].created_at;
        axios.get(`http://raspi:8000/api/v2/dashboards/${params.dashboardId}?page_size=5&older_than=${l}`).then((response) => {
            if (response.data.questions.length > 0) {
                setQuestions(questions.concat(response.data.questions));
            }
            else {
                setHidden(true);
            }

        });
    };

    return (<div>
        <h1 data-cy="pageHeader">{dashboardTitle}</h1>
        <h3 data-cy="description">{dashboardDescription}</h3>
        <div data-cy="questionsList">
            {questions.map(q => { return <QuestionListItem question={q} /> })}
        </div>
        <button data-cy='moreItemsButton' onClick={loadMore} hidden={hidden}>Cargar más elementos</button>
        
        <a href={url}  data-cy='createQuestionLink'> adhshadsadh</a>
        <footer>
            <p data-cy='footerCopyright'>© Javier Gómez Becerra</p>
            <p data-cy='footerDebugInfo'>
                Este es el dashboard con ID: {params.dashboardId}
            </p>
        </footer>
    </div>
    )
}

export default DashboardDetail;