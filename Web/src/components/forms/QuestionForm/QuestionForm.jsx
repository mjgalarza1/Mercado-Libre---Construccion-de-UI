import { useState } from "react";
import BlueButton from "../../basic/BlueButton/BlueButton";
import { addQuestionToProduct } from "../../../services/AxiosService";

function QuestionForm({ productId, isOwner, setProduct }) {
    
    const [questionText, setQuestionText] = useState("");

    const addQuestion = async () => {
        if(questionText.trim() === "") return;
        try{
            await addQuestionToProduct(productId, {"text":questionText}, ()=>{});
            setQuestionText("");
            setProduct((prevProduct) => {
                return {
                    ...prevProduct,
                    questions: [
                        ...prevProduct.questions,
                        {
                            text: questionText,
                            response: null
                        }
                    ]
                }
            });
        }catch(e){
            console.error(e);
        }
    }

    return (
        isOwner ?
            null
            :
            <div>
                <textarea 
                    className="w-100 pb-4 rounded border-0 mt-3" 
                    style={{ resize: "none", boxShadow: "0px 0px 4px 0px #00000026" }}
                    onChange={(e) => setQuestionText(e.target.value)}
                    value={questionText}
                >
                </textarea>
                <div className="d-flex justify-content-end mt-3">
                    <BlueButton onClick={addQuestion} text={"Preguntar"} />
                </div>
            </div>
        
    );
}

export default QuestionForm;