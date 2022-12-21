import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AnswerListItem from "../../components/answer_list_item/AnswerListItem";
function QuestionDetail(props) {
    const params = useParams();

    const [questionTitle, setQuestionTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        axios.get(`http://raspi:8000/api/v2/dashboards/${params.dashboardId}/questions/${params.questionId}`).then((response) => {
            setQuestionTitle(response.data.question_title);
            setQuestion(response.data.question);
            setAnswers(response.data.answers);
        });
    }, []);

    const onChange = (e) => {
        setSearchText(e.target.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        if(!searchText.match(/.*[a-zA-Z]{2,}/)){
            alert('Introduce al menos 2 letras');
            return;
        }
        axios.get(`http://raspi:8000/api/v2/dashboards/${params.dashboardId}/questions/${params.questionId}?search=${searchText}`).then((response) => {
			setAnswers(response.data.answers);
		});
    };
    const url = `/dashboards/${params.dashboardId}/questions/${params.questionId}/newAnswer`;


    return (<div>
        <h1 data-cy="pageHeader">{questionTitle}</h1>
        <h3 data-cy="description">{question}</h3>
        <form data-cy='form' onSubmit={onSubmit}>
            <input data-cy='searchInput' type='text' placeholder='solucionado' onChange={onChange} />
            <input data-cy='inputSubmit' type='submit' value='Buscar' />


        </form>
        <div data-cy="answersList">
            {answers.map(a => { return <AnswerListItem answer={a} /> })}
        </div>
        <a href={url}  data-cy='publishAnswerLink'> adhshadsadh</a>

        <footer>
            <p data-cy='footerCopyright'>© Javier Gómez Becerra</p>
            <p data-cy='footerDebugInfo'>Aquí está la pregunta con ID: {params.questionId}, que pertenece al dashboard con ID: {params.dashboardId}
            </p>
        </footer>
    </div>
    )
}

export default QuestionDetail;