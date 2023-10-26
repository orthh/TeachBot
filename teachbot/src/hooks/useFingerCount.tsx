import { useState, useEffect } from "react";

export const useFingerCount = (): string => {
    const [finger, setFinger] = useState<string>("");

    useEffect(() => {
        // post요청 손가락 갯수 가져오기
        const sendMessage = (): void => {
            fetch(`${process.env.REACT_APP_AI_BASE_URL}/api`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => response.json())
                .then((data) => setFinger(data.unfolded_fingers))
                .catch((error) => console.error("Error:", error));
        };

        // 매 초마다 API 요청
        const intervalId = setInterval(sendMessage, 1000);

        return () => clearInterval(intervalId); // 컴포넌트 unmount 시에 타이머 해제
    }, []);

    return finger;
};
