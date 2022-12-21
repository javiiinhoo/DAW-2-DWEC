import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Question.css";

import axios from "axios";
import AnswerListItem from "../../components/answer_list_item/AnswerListItem";

const Question = () => {
	const params = useParams();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [answers, setAnswers] = useState([]);
	const [formData, setFormData] = useState({
		description: "",
	});

	const [answersPublished, setAnswersPublished] = useState(0);

	useEffect(() => {
		axios.get(`http://raspi:8000/api/v1/dashboards/${params.dashboardId}/questions/${params.questionId}`).then((response) => {
			setTitle(response.data.question_title);
			setDescription(response.data.question);
			setAnswers(response.data.answers);
		});
	}, [answersPublished, params.dashboardId, params.questionId]);

	const answerToComponent = (a) => {
		return <AnswerListItem answer={a} />;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if ((formData.description.length == 0)) {
			return;
		}
		axios.post(`http://raspi:8000/api/v1/dashboards/${params.dashboardId}/questions/${params.questionId}/answers`, formData).then((response) => {
			setAnswersPublished(answersPublished + 1);
		});
		setFormData({ description: "" });
	};

	const onChangeRespuesta = (e) => {
		setFormData({
			description: e.target.value
		});
	};

	return (
		<div data-cy="issue18body">
			<h1 data-cy="issue18title" className="answer">
				{title}
			</h1>
			<p data-cy="issue18description" className="answer">
				{description}
			</p>
			<div data-cy="answersList">{answers.map(answerToComponent)}</div>
			<p data-cy="noAnswers" className="answer">
				{answers.length === 0 ? "¡Vaya! No hay respuestas" : ""}
			</p>
			<div data-cy='formContainer' className='formContainer'>
				<h4>Adelante, responde a la pregunta</h4>
				<form data-cy='newAnswerForm' onSubmit={handleSubmit}>
					<input data-cy='newAnswerDescription' placeholder='Texto de la respuesta' value={formData.description} onChange={onChangeRespuesta}></input><br />
					<button data-cy='postDataButton'>Responder</button>
				</form>
			</div>
		</div>
	);
};

export default Question;