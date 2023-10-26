import { useState, useEffect } from "react";
import axios from "axios";

interface GradeItem {
    grade_seq: number;
    year: string;
}

export const useGrade = (): GradeItem[] => {
    const [grade, setGrade] = useState<GradeItem[]>([]);

    useEffect(() => {
        const fetchGrade = async () => {
            try {
                const response = await axios.get<GradeItem[]>(`${process.env.REACT_APP_API_BASE_URL}/api/grade`);
                setGrade(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGrade();
    }, []);

    return grade;
};
