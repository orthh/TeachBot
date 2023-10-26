interface Question {
    question: string;
    answer: string;
    "1": string;
    "2": string;
    "3": string;
    "4": string;
}

interface SetQuestionsAction {
    type: "SET_QUESTIONS";
    payload: Question[];
}

const initialState: Question[] = [];

const questionsReducer = (state = initialState, action: SetQuestionsAction): Question[] => {
    switch (action.type) {
        case "SET_QUESTIONS":
            return action.payload;
        default:
            return state;
    }
};

export default questionsReducer;
