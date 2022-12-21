import axios from "axios";

import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewQuestion = () => {
    const navigate = useNavigate();

    const params = useParams();

    const token = localStorage.getItem("sessionToken");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const onChangeTitle = (e) => {
        setFormData({
            title: e.target.value,
            description: formData.description,
        });
    };

    const onChangeDescription = (e) => {
        setFormData({
            title: formData.title,
            description: e.target.value,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        axios
            .post(
                `http://raspi:8000/api/v2/dashboards/${params.dashboardId}/questions`,
                {
                    title: formData.title,
                    description: formData.description,
                },
                {
                    headers: { "Session-Token": token },
                }
            )
            .then((response) => {
                navigate(`/dashboards/${params.dashboardId}`);
            })
            .catch((err) => {
                alert("Ha habido un error");
            });
    };

    return (
        <div>
            <p data-cy="loginWarning" hidden={token != null}>
                ¿Por qué no haces login?
            </p>
            <form onSubmit={onSubmit}>
                <input type="text" data-cy="inputQuestionTitle" onChange={onChangeTitle}></input>
                <input type="textArea" data-cy="inputQuestionDescription" onChange={onChangeDescription}></input>
                <input type="submit" data-cy="inputSubmit" disabled={token == null}></input>
            </form>
            <footer>
                <p data-cy='footerCopyright'>© Javier Gómez Becerra</p>
                <p data-cy='footerDebugInfo'>Desde aquí puedes crear una nueva pregunta para el dashboard con ID: {params.dashboardId}
                </p>
            </footer>
        </div>
    );
};

export default NewQuestion;