import React, { useEffect, useState } from 'react';
import './Quiz.css';

const Quiz = ({ username }) => { //2. menggunakan local storage
    const [questions, setQuestions] = useState([]);          //Pertanyaan
    const [currentQuestion, setCurrentQuestion] = useState(0); 
    const [score, setScore] = useState(0);                   //Score total
    const [correctAnswers, setCorrectAnswers] = useState(0); // Jawaban benar
    const [wrongAnswers, setWrongAnswers] = useState(0);     // Jawaban salah
    const [timeLeft, setTimeLeft] = useState(60);            // Timer: 60 seconds
    const [finished, setFinished] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null); //Jumlah Jawaban

    useEffect(() => { //3. Mengambil data API
        const fetchQuestions = async () => {
            try {
                //1. Mengambil pertanyaan kuis dari API 
                const res = await fetch('https://opentdb.com/api.php?amount=5&category=27&difficulty=easy&type=multiple');
                const data = await res.json();
                if (data.results) {
                    setQuestions(data.results);
                } else {
                    throw new Error('No questions found');
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();

        const savedData = JSON.parse(localStorage.getItem('quizData'));
        if (savedData) {
            setQuestions(savedData.questions);
            setCurrentQuestion(savedData.currentQuestion);
            setScore(savedData.score);
            setCorrectAnswers(savedData.correctAnswers);
            setWrongAnswers(savedData.wrongAnswers);
            setTimeLeft(savedData.timeLeft);
        }
    }, []);

    useEffect(() => { //(3)Mengelola countdown timer
        if (timeLeft === 0) {
            setFinished(true);
        }
        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => { //(3)Menyimpan state aplikasi ke local storage
        if (!finished) {
            localStorage.setItem('quizData', JSON.stringify({
                questions,
                currentQuestion,
                score,
                correctAnswers,
                wrongAnswers,
                timeLeft,
            }));
        }
    }, [questions, currentQuestion, score, correctAnswers, wrongAnswers, timeLeft, finished]);

    const handleAnswer = (answer) => { //4. Mengecek jawaban benar/salah
        const isCorrect = answer === questions[currentQuestion].correct_answer;
        setSelectedAnswer(answer);

        if (isCorrect) {
            setScore(score + 1);
            setCorrectAnswers(correctAnswers + 1); // Tambah jumlah benar
        } else {
            setWrongAnswers(wrongAnswers + 1);     // Tambah jumlah salah
        }

        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
                setSelectedAnswer(null);
            } else {
                setFinished(true);
            }
        }, 1000);
    };

    // Check if questions are loaded
if (!questions || questions.length === 0) {
    return (
        <div className='spinner'>
            <div className="circle"></div>
            <p>Loading questions...</p>
        </div>
    );
}


    if (finished) {
        const totalAnswered = correctAnswers + wrongAnswers; // Total jawaban
        return (
            <div className='container-finish'>
                <h2>Quiz Finished</h2>
                <p>Total Questions: {questions.length}</p>
                <p>Correct Answers: {correctAnswers}</p>
                <p>Wrong Answers: {wrongAnswers}</p>
                <p>Total Answered: {totalAnswered}</p> {/* Menampilkan total jawaban */}
            </div>
        );
    }

    const currentQ = questions[currentQuestion];
    const allAnswers = [...currentQ.incorrect_answers, currentQ.correct_answer].sort();

    return (
        <div className='container'>
            <h2>{`Hallo ${username} :)`}</h2>
            <hr />
            <p>Time left: {timeLeft} seconds</p>
            <h3 dangerouslySetInnerHTML={{ __html: currentQ.question }} />
            <ul>
                {allAnswers.map((answer, index) => (
                    <li
                        key={index}
                        className={
                            selectedAnswer
                                ? answer === currentQ.correct_answer
                                    ? 'correct'
                                    : answer === selectedAnswer
                                        ? 'wrong'
                                        : ''
                                : ''
                        }
                        onClick={() => !selectedAnswer && handleAnswer(answer)}
                        dangerouslySetInnerHTML={{ __html: answer }}
                    />
                ))}
            </ul>
            <div className="index">{`${currentQuestion + 1} of ${questions.length} questions`}</div>
        </div>
    );
};

export default Quiz;
