import './QuestionListItem.css';
import { useNavigate } from "react-router-dom";
const QuestionListItem = (props) => {
    const navigate = useNavigate();
    const onClick = () => {
        console.log('clicked');
        navigate(`questions/${props.question.question_id}`);
    };
    return <div onClick={onClick} className="question-li">
        <h3>{props.question.title}</h3>
        <p>{props.question.description}</p>
    </div>
}
export default QuestionListItem;