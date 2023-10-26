import React from "react";
import axios from "axios";

interface SubjectProps {
    subject: SubjectItem[];
    setSelectedSubject: (name: string) => void;
}

interface SubjectItem {
    subject_seq: number;
    name: string;
    grade_seq: number;
}

const Subject = ({ subject, setSelectedSubject }: SubjectProps) => {
    return (
        <div className="pt-[150px] px-[100px]">
            <p className="text-5xl pb-10">과목 선택</p>
            {subject.map((item) => (
                <button
                    onClick={() => setSelectedSubject(item.name)}
                    className="block bg-[#E6F0FF] w-40 mb-3 border border-indigo-600 rounded-md text-3xl px-6 py-3"
                >
                    {item.name}
                </button>
            ))}
        </div>
    );
};

export default Subject;
