import React, { useEffect, useState } from "react";

interface QuestionProps {
    solving: {
        question: string;
        answer: string;
        "1": string;
        "2": string;
        "3": string;
        "4": string;
    };
    userAnswer: number;
}

const Question = ({ solving, userAnswer }: QuestionProps) => {
    const [incorrectAnswers, setIncorrectAnswers] = useState<number[]>([]);
    const correctAnswer = parseInt(solving.answer);

    useEffect(() => {
        setIncorrectAnswers([]);
    }, [solving]);

    useEffect(() => {
        if (userAnswer !== correctAnswer && !incorrectAnswers.includes(userAnswer)) {
            setIncorrectAnswers((prevIncorrectAnswers) => [...prevIncorrectAnswers, userAnswer]);
            console.log("ㅇㅇㅇ");
            console.log(incorrectAnswers);
        }
    }, [userAnswer]);
    return (
        <div className="pt-[150px] px-[100px]">
            <p className="text-5xl pb-10">문제 : {solving.question}</p>
            <p
                className={`text-3xl pb-4 ${
                    incorrectAnswers.includes(parseInt("1")) ? "line-through text-red-500" : ""
                }`}
            >
                1. {solving["1"]}
            </p>
            <p
                className={`text-3xl pb-4 ${
                    incorrectAnswers.includes(parseInt("2")) ? "line-through text-red-500" : ""
                }`}
            >
                2. {solving["2"]}
            </p>
            <p
                className={`text-3xl pb-4 ${
                    incorrectAnswers.includes(parseInt("3")) ? "line-through text-red-500" : ""
                }`}
            >
                3. {solving["3"]}
            </p>
            <p
                className={`text-3xl pb-4 ${
                    incorrectAnswers.includes(parseInt("4")) ? "line-through text-red-500" : ""
                }`}
            >
                4. {solving["4"]}
            </p>
        </div>
    );
};

export default Question;
