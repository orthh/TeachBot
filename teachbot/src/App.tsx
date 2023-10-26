import "./App.css";

import React, { useEffect, useState } from "react";
import Grade from "./components/Grade";
import Subject from "./components/Subject";
import Question from "./components/Question";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "./store/action";
import Loading from "./components/Loading";

import { useGrade } from "./hooks/useGrade";
import { useFingerCount } from "./hooks/useFingerCount";
import { useQuestions } from "./hooks/useQuestions";

interface Question {
    question: string;
    answer: string;
    "1": string;
    "2": string;
    "3": string;
    "4": string;
}

interface SubjectItem {
    subject_seq: number;
    name: string;
    grade_seq: number;
}

interface GradeItem {
    grade_seq: number;
    year: string;
}

function App() {
    const [subject, setSubject] = useState<SubjectItem[]>([]);
    const [selectedGrade, setSelectedGrade] = useState<string>("");
    const [selectedSubject, setSelectedSubject] = useState<string>("");
    const [solvingQuestion, setSolvingQuestion] = useState<number>(1);

    const dispatch = useDispatch();

    const questionData: Question[] = useSelector((state: any) => state);

    // custom hooks
    const grade = useGrade();
    const finger = useFingerCount();
    const isLoading = useQuestions(selectedGrade, selectedSubject);

    // 문제 정답 제출 알고리즘
    function isCorrectAnswer(userAnswer: string | null, correctAnswer: string): boolean {
        return userAnswer == correctAnswer;
    }

    // 정답 확인 - 1초마다 확인
    useEffect(() => {
        if (questionData.length > 0) {
            // 현재 문제 정보 가져오기
            let currentQuestion;
            currentQuestion = questionData[solvingQuestion - 1];

            // 현재 문제가 존재하고 유저의 답이 정답과 일치하는지 확인하기
            if (currentQuestion && isCorrectAnswer(finger, currentQuestion.answer)) {
                if (solvingQuestion < questionData.length) {
                    setSolvingQuestion(solvingQuestion + 1);
                } else {
                    alert("모든 문제를 맞췄습니다!");

                    setSelectedGrade("");
                    setSelectedSubject("");
                    setSolvingQuestion(1);
                    setSubject([]);
                    dispatch(setQuestions([]));
                }
            }
        }
    }, [finger]);

    return (
        <div className="App bg-[#FFFDEB]" style={{ height: "100vh" }}>
            <div className="container mx-auto h-full pt-7">
                <div className="grid grid-rows-1 grid-cols-2">
                    <div>
                        <h1 className="text-8xl pt-[70px] px-[100px]">나의 AI 선생님</h1>
                        <p className="text-3xl pt-3 pb-10">웹캠에 손가락으로 답을 표시해주세요!</p>
                        <img src="http://127.0.0.1:5000/video_feed" className="App-logo" alt="logo" />
                        {/* <button onClick={sendMessage}>데이터 가져오기</button> */}
                        <p className="text-5xl pt-5">선택한 답번호 : {finger}</p>
                    </div>
                    {grade.length > 0 && subject.length <= 0 && (
                        <Grade grade={grade} setSubject={setSubject} setSelectedGrade={setSelectedGrade} />
                    )}
                    {subject.length > 0 && selectedSubject === "" && (
                        <Subject subject={subject} setSelectedSubject={setSelectedSubject} />
                    )}
                    {selectedGrade !== "" && selectedSubject !== "" && questionData.length > 0 && isLoading != 1 && (
                        <Question solving={questionData[solvingQuestion - 1]} userAnswer={parseInt(finger)} />
                    )}
                    {isLoading === 1 && <Loading />}
                </div>
            </div>
        </div>
    );
}

export default App;
