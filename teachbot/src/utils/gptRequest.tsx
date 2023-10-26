import axios from "axios";
import gptconfig from "../config/chatGPTconfig";
interface Message {
    role: string;
    content: string;
}

interface Data {
    model: string;
    messages: Message[];
    temperature: number;
}

interface ResponseData {
    choices: { message: { content: string } }[];
}

export const gptRequest = async (selectedGrade: string, selectedSubject: string) => {
    let promises = [];

    const message = {
        role: gptconfig.ROLE,
        //content: `초등학교 ${selectedGrade}학년 학생들이 풀 수 있는 ${selectedSubject} 관련 문제를 1개 생성해주세요. 각 문제는 4개의 선택지를 가지고 있어야 하며, 정답은 선택지 번호로 표시되어야 합니다. 모든 문제와 답변은 아래 JSON 형식을 따라야 합니다:[{"question": "문제 내용","answer": "정답 번호","1": "선택지 1","2": "선택지 2","3": "선택지 3","4": "선택지 4"},...]각 선택지는 고유한 답안이어야 하며, 정답 번호는 해당하는 선택지의 번호와 일치해야 합니다. 추가적인 정보나 설명 없이 깔끔하게 작성해주세요.`,
        content: `초등학교 ${selectedGrade}학년 학생들이 풀 수 있는 ${selectedSubject} 문제 1개와 그에 대한 4개의 선택지를 만들어주세요. 답변 형식은 다음과 같아야 합니다: {"question": "문제", "answer": "정답 번호", "1": "선택지 1", "2": "선택지 2", "3": "선택지 3", "4": "선택지 4"}.`,
    };

    const data = {
        model: gptconfig.CHAT_MODEL,
        messages: [message],
        temperature: gptconfig.TEMPERATURE,
    };

    // gpt 헤더 설정
    const headers = {
        Authorization: `${gptconfig.BEARER} ${gptconfig.KEY}`,
        "Content-Type": gptconfig.MEDIA_TYPE,
    };

    for (let i = 0; i < 5; i++) {
        promises.push(axios.post(gptconfig.CHAT_URL, data, { headers }));
    }

    try {
        let responses = await Promise.all(promises);
        return [].concat(...responses.map((response) => JSON.parse(response.data.choices[0].message.content)));
    } catch (err) {
        console.error(err);
        throw err;
    }
};
