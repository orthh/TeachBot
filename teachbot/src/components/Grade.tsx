import React from "react";
import axios from "axios";

interface GradeItem {
    grade_seq: number;
    year: string;
}

interface SubjectItem {
    subject_seq: number;
    name: string;
    grade_seq: number;
}

interface GradeProps {
    grade: GradeItem[];
    setSubject: (subject: SubjectItem[]) => void;
    setSelectedGrade: (gradeSeq: string) => void;
}

const Grade = ({ grade, setSubject, setSelectedGrade }: GradeProps) => {
    const fetchSubject = (grade_seq: string) => {
        setSelectedGrade(grade_seq);
        axios
            .get(`http://127.0.0.1:3003/api/subject?grade_seq=${grade_seq}`)
            .then((response) => setSubject(response.data))
            .catch((err) => console.log(err));
    };

    return (
        <div className="pt-[150px] px-[100px]">
            <p className="text-5xl pb-10">학년 선택</p>
            {grade.map((gradeItem: GradeItem) => (
                <button
                    onClick={() => fetchSubject(gradeItem.grade_seq.toString())}
                    className="block bg-[#E6F0FF] w-40 mb-3 border border-indigo-600 rounded-md text-3xl px-6 py-3"
                >
                    {gradeItem.year}학년
                </button>
            ))}
        </div>
    );
};

export default Grade;
