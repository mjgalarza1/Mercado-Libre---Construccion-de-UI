import { useEffect, useState } from 'react';
import responseIcon from '../../../assets/response-icon.svg'
import './QuestionsWithResponses.css';
import BlueButton from '../../basic/BlueButton/BlueButton';
import { addAnswerToAQuestion, STATUS } from '../../../services/AxiosService';

function QuestionsWithResponses({ productId, setProduct, questions, isOwner }) {

    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [answerText, setAnswerText] = useState("");
    const [responseStatus, setResponseStatus] = useState(STATUS.IDLE);

    const handleResponse = (questionId,) => {
        if (answerText.trim() === "") return;
        try {
            addAnswerToAQuestion(productId, questionId, { "text": answerText }, setResponseStatus);
            setAnswerText("");
            setSelectedQuestion(null);
            setProduct(prevProduct => {
                const newProduct = { ...prevProduct };
                newProduct.questions = newProduct.questions.map(question => {
                    if (question.id === questionId) {
                        question.response = answerText;
                    }
                    return question;
                });
                return newProduct;
        })
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <h5 className='mb-4'>Ultimas preguntas</h5>
            {questions?.length > 0 ?
                questions.map((question, index) => (
                    <div className={`mx-4`} key={index}>
                        <p className={`mb-0 my-3 ${isOwner && !question?.response ? 'selectableQuestion' : ''}`}
                            onClick={() => setSelectedQuestion(question?.id)}
                            index={question?.id}>{question?.text}</p>
                        {question?.response ?
                            <p className='px-1 text-secondary'><img className='px-2' src={responseIcon} />{question?.response}</p>
                            :
                            <div>
                                {isOwner && selectedQuestion === question?.id &&
                                    <div className='d-flex mt-2' style={{ maxHeight: "39px" }}>
                                        <img className='px-1' src={responseIcon} />
                                        <textarea
                                            className="w-100 overflow-y-hidden "
                                            style={{ resize: "none", marginTop: "0px" }}
                                            value={answerText}
                                            onChange={(e) => setAnswerText(e.target.value)}
                                        >
                                        </textarea>
                                        <div className="mx-3">
                                            <BlueButton onClick={() => handleResponse(question?.id)} text="Responder" />
                                        </div>
                                    </div>
                                }
                                {responseStatus === STATUS.ERROR && <p className="error-message">Hubo un error al responder la pregunta</p>}
                            </div>
                        }
                    </div>

                ))
                :
                <p className="text-center text-secondary py-3">Este producto no tiene preguntas</p>
            }
        </>

    );
}

export default QuestionsWithResponses;