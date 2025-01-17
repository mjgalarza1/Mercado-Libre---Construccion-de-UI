import { StyleSheet, Text, TextInput, View } from "react-native";
import { useUserContext } from "../../context/UserContext";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { general } from "../../styles/styles";
import BottomSheet from "../bottomSheet/BottomSheet";
import useProductById from "../../hooks/useProductById";
import { router } from "expo-router";

function Questions({ productId }) {
    const { product, addQuestion, addResponse } = useProductById(productId);

    const [questionModalVisible, setQuestionModalVisible] = useState(false);
    const [questionText, setQuestionText] = useState("");
    const handleQuestion = () => {
        if(questionText.trim() === "") return;
        addQuestion(questionText);
        setQuestionModalVisible(false);
        setQuestionText("");
    }

    const [responseModalVisible, setResponseModalVisible] = useState(false);
    const [responseText, setResponseText] = useState("");
    const [selectedQues, setSelectedQues] = useState(null);
    const handleResponse = () => {
        if(responseText.trim() === "") return;
        addResponse(selectedQues, responseText);
        setResponseModalVisible(false);
        setSelectedQues(null);
        setResponseText("");
    }

    const questionClick = (question) => {
        setSelectedQues(question);
        setResponseModalVisible(true);
    }

    const { user } = useUserContext();

    return (
        <>
            {!user ?
                <TouchableOpacity style={general.button} onPress={() => router.navigate("/user")}>
                    <Text style={general.buttonText}>Preguntar</Text>
                </TouchableOpacity>
                :
                product?.owner?.id !== user?.id ?
                    <>
                        <TouchableOpacity style={general.button} onPress={() => setQuestionModalVisible(true)}>
                            <Text style={general.buttonText}>Preguntar</Text>
                        </TouchableOpacity>
                        <BottomSheet title="Escribe tu pregunta" visible={questionModalVisible} setVisible={setQuestionModalVisible}>
                            <View style={questionsStyles.modalWrapper}>

                                <TextInput
                                    onChangeText={(text) => setQuestionText(text)}
                                    style={questionsStyles.textInput}
                                    placeholder='Aqui'
                                    autoFocus={true}
                                    multiline={true}
                                    textAlignVertical="top"
                                    numberOfLines={4}
                                    value={questionText}
                                />
                                <TouchableOpacity style={general.button} onPress={handleQuestion}>
                                    <Text style={general.buttonText}>Enviar</Text>
                                </TouchableOpacity>
                            </View>

                        </BottomSheet>
                    </>
                    :
                    <BottomSheet title="Escribe tu respuesta" visible={responseModalVisible} setVisible={setResponseModalVisible}>
                        <View style={questionsStyles.modalWrapper}>
                            <TextInput
                                onChangeText={(text) => setResponseText(text)}
                                style={questionsStyles.textInput}
                                placeholder='Aqui'
                                autoFocus={true}
                                multiline={true}
                                textAlignVertical="top"
                                numberOfLines={4}
                                value={responseText}
                            />
                            <TouchableOpacity style={general.button} onPress={handleResponse}>
                                <Text style={general.buttonText}>Enviar</Text>
                            </TouchableOpacity>
                        </View>
                    </BottomSheet >
            }
            <View style={questionsStyles.container}>

                <Text style={questionsStyles.title}>Últimas preguntas</Text>
                {product?.questions.length > 0 ?
                    product?.questions.map((item) => (
                        item.response ?
                            <View style={questionsStyles.ques} key={item.id}>
                                <Text>{item.text}</Text>
                                <Text style={questionsStyles.res}>      {item.response}</Text>
                            </View>
                            :
                            <View style={questionsStyles.ques} key={item.id}>
                                {
                                    product.owner.id === user?.id ?
                                        <TouchableOpacity style={questionsStyles.ques} onPress={() => questionClick(item.id)}><Text>{item.text}</Text></TouchableOpacity>
                                        :
                                        <Text>{item.text}</Text>
                                }
                            </View>
                    ))
                    :
                    <View>
                        <Text>No hay preguntas</Text>
                    </View>
                }
            </View>
        </>
    );
}

export default Questions;

const questionsStyles = StyleSheet.create({
    modalWrapper: {
        paddingHorizontal: 10,
        width: "100%",
        paddingBottom: 30,
    },
    container: {
        padding: 10,
        paddingBottom: 40,
    },
    title: {
        fontSize: 18,
        marginVertical: 10,
    },
    ques: {
        marginVertical: 5,
    },
    res: {
        color: "#666666",
        paddingTop: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#3483fa",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }
});