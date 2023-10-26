import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setQuestions } from "../store/action";
import { gptRequest } from "../utils/gptRequest";

export const useQuestions = (selectedGrade: string, selectedSubject: string): number => {
    const [isLoading, setIsLoading] = useState<number>(0);
    const dispatch = useDispatch();

    async function fetchQuestions() {
        try {
            let questions = await gptRequest(selectedGrade, selectedSubject);
            dispatch(setQuestions(questions));
            setIsLoading(2);
        } catch (err) {
            console.error(err);
            alert("문제 생성에 실패하였습니다.");
            setIsLoading(0);
        }
    }

    useEffect(() => {
        if (selectedGrade !== "" && selectedSubject !== "") {
            setIsLoading(1);
            fetchQuestions();
        }
    }, [selectedGrade, selectedSubject]);

    return isLoading;
};
