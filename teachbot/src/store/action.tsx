interface Question {
    question: string;
    answer: string;
    "1": string;
    "2": string;
    "3": string;
    "4": string;
}

export const setQuestions = (questions: Question[]) => {
    return {
        type: "SET_QUESTIONS",
        payload: questions,
    };
};
