import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './Dashboard.css';

import axios from "axios";
import QuestionListItem from "../../components/question_list_item/QuestionListItem";
const Dashboard = () => {
    const params = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get(`http://raspi:8000/api/v1/dashboards/${params.dashboardId}`).then((response) => {
            setTitle(response.data.title);
            setDescription(response.data.description);
            setQuestions(response.data.questions);
        });
    }, []);
    const questionToComponent = (q) => {
        return <QuestionListItem question={q} dashboardId={params.dashboardId} />;
    };
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const onChangeTitle = (e) => {
        setFormData({
            title: e.target.value,
            description: formData.description
        });
    }
    const onChangeDescription = (e) => {
        setFormData({
            title: formData.title,
            description: e.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if ((formData.title.length === 0) || (formData.description.length == 0)) {
            return;
        }
        axios.post('http://raspi:8000/api/v1/dashboards/' + params.dashboardId + '/questions', formData).then(response => {

        });
        setFormData({ title: '', description: '' })
    }


    return (
        <div data-cy="issue17body">
            <h1 data-cy="issue17title" className='dashboard'>
                {title}
            </h1>
            <p data-cy="issue17description" className='dashboard'>
                {description}
            </p>
            <div data-cy="questionsList">{questions.map(questionToComponent)}</div>
            <div data-cy='formContainer' className='formContainer'>
                <h4>Pregunta lo que necesites saber</h4>
                <form data-cy='newQuestionForm' onSubmit={handleSubmit}>
                    <input data-cy='newQuestionTitle' placeholder='Título de la pregunta' value={formData.title} onChange={onChangeTitle}></input><br />
                    <input data-cy='newQuestionDescription' placeholder='Texto de la pregunta' value={formData.description} onChange={onChangeDescription}></input><br />
                    <button data-cy='postDataButton'>Preguntar</button>
                </form>
            </div>

        </div>
    );
};
export default Dashboard;