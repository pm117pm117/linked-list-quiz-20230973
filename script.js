document.addEventListener("DOMContentLoaded", function () {
    let isKorean = true; // 기본 언어: 한글

    // 한/영 정답 매칭 객체
    const correctAnswers = {
        "배열": ["배열", "array"],
        "연결 리스트": ["연결 리스트", "linked list"],
        "이중 연결 리스트": ["이중 연결 리스트", "doubly linked list"],
        "헤드": ["헤드", "head"],
        "널": ["널", "null"],
        "인덱스": ["인덱스", "index"],
        "삭제": ["삭제", "deletion"],
        "원형 연결 리스트": ["원형 연결 리스트", "circular linked list"],
        "O(n)": ["O(n)", "O(n)"],
        "O(1)": ["O(1)", "O(1)"]
    };

    function normalizeText(text) {
        return text.replace(/[^가-힣a-zA-Z0-9()]/g, "").trim().toLowerCase();
    }

    function checkAnswers() {
        let correctCount = 0;
        const answers = document.querySelectorAll(".answer");

        answers.forEach((input) => {
            let userAnswer = normalizeText(input.value);
            let correctAnswerKey = input.dataset.answer; 

            let possibleAnswers = correctAnswers[correctAnswerKey] || [];
            let normalizedPossibleAnswers = possibleAnswers.map(ans => normalizeText(ans));

            if (normalizedPossibleAnswers.includes(userAnswer)) {
                input.classList.add("correct");
                input.classList.remove("incorrect");
                correctCount++;
            } else {
                input.classList.add("incorrect");
                input.classList.remove("correct");
            }
        });

        document.getElementById("result").innerText = `🎯 당신의 점수: ${correctCount} / 10`;
    }

    document.getElementById("toggleLanguage").addEventListener("click", function () {
        isKorean = !isKorean;
        document.querySelectorAll(".question").forEach(question => {
            let newText = isKorean ? question.dataset.ko : question.dataset.en;
            let answerKey = question.querySelector("input").dataset.answer;
            question.innerHTML = `${newText.replace("___", `<input type="text" class="answer" data-answer="${answerKey}">`)}`;
        });
    });

    document.querySelector("button[onclick='checkAnswers()']").addEventListener("click", checkAnswers);
});
