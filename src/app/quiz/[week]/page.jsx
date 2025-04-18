// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// export default function QuizPage({ params }) {
//   const [questions, setQuestions] = useState([]);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   // Load quiz data
//   useEffect(() => {
//     import(`@/data/${params.week}.json`)
//       .then((data) => setQuestions(data.questions))
//       .catch((err) => console.error("Failed to load questions:", err));
//   }, [params.week]);

//   // Calculate score
//   const score = questions.reduce((acc, question) => {
//     return selectedAnswers[question.id] === question.correctAnswer ? acc + 1 : acc;
//   }, 0);

//   // Function to generate personalized, humorous feedback
//   const getFunnyComment = (score, total) => {
//     const percentage = (score / total) * 100;

//     if (percentage === 100) return "🎯 Perfect score! Are you secretly the quiz master?";
//     if (percentage >= 90) return "🔥 Almost there! Just a few more steps to the top.";
//     if (percentage >= 80) return "💪 Great job! You're on the right track.";
//     if (percentage >= 70) return "👍 Good effort! Keep pushing forward.";
//     if (percentage >= 60) return "😅 Not bad, but there's room for improvement.";
//     if (percentage >= 50) return "🤔 Halfway there! Time to hit the books.";
//     if (percentage >= 40) return "😬 It's a start, but you might want to review.";
//     if (percentage >= 30) return "😓 Keep trying! Practice makes perfect.";
//     if (percentage >= 20) return "😖 Ouch! That was a tough one.";
//     if (percentage >= 10) return "😵 Well, at least you tried.";
//     return "💤 Did you even take the quiz? Let's give it another shot!";
//   };

//   return (
//     <div className="min-h-screen bg-[#121212] text-[#f5f5f5] p-8">
//       <div className="max-w-2xl mx-auto bg-[#1e1e1e] text-[#f5f5f5] rounded-lg shadow-md p-6">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-2xl font-bold">
//             {params.week.replace("-", " ").toUpperCase()} QUIZ
//           </h1>
//           <Link href="/">
//             <Button variant="ghost" className="text-white hover:bg-gray-700">
//               Back to Home
//             </Button>
//           </Link>
//         </div>

//         {questions.map((question) => (
//           <div key={question.id} className="mb-8">
//             <p className="font-medium mb-4">{question.text}</p>
//             <div className="space-y-2">
//               {question.options.map((option) => {
//                 const isSelected = selectedAnswers[question.id] === option;
//                 const isCorrect = submitted && option === question.correctAnswer;
//                 const isIncorrect =
//                   submitted && isSelected && option !== question.correctAnswer;

//                 let bgColor = "bg-[#2a2a2a] border-[#444]"; // default dark bg
//                 if (isSelected && !submitted) bgColor = "bg-blue-700 border-blue-500 text-white";
//                 if (isCorrect) bgColor = "bg-green-600 border-green-400 text-white";
//                 if (isIncorrect) bgColor = "bg-red-600 border-red-400 text-white";

//                 return (
//                   <button
//                     key={option}
//                     className={`w-full text-left p-3 rounded-lg border transition-colors duration-200 ${bgColor}`}
//                     onClick={() =>
//                       !submitted &&
//                       setSelectedAnswers({ ...selectedAnswers, [question.id]: option })
//                     }
//                   >
//                     {option}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         ))}

//         {!submitted ? (
//           <Button
//             className="w-full mt-6 bg-blue-700 hover:bg-blue-600 text-white"
//             onClick={() => setSubmitted(true)}
//             // disabled={Object.keys(selectedAnswers).length !== questions.length}
//           >
//             Submit Answers
//           </Button>
//         ) : (
//           <div className="mt-6 p-4 bg-[#2a2a2a] text-white rounded-lg">
//             <p className="text-xl font-semibold text-center mb-4">
//               Score: {score}/{questions.length}
//             </p>
//             <p className="text-center italic mb-4">
//               {getFunnyComment(score, questions.length)}
//             </p>
//             <div className="flex gap-4">
//               <Button
//                 className="flex-1 bg-gray-700 hover:bg-gray-600 text-white"
//                 onClick={() => window.location.reload()}
//               >
//                 Try Again
//               </Button>
//               <Link href="/" className="flex-1">
//                 <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
//                   Choose Another Week
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Fisher-Yates Shuffle function
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

export default function QuizPage({ params }) {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Load quiz data
  useEffect(() => {
    if (params.week === "combined") {
      // Load combined data if the week is "combined"
      import("@/data/combined.json")
        .then((data) => {
          // Shuffle the questions before setting them
          const shuffledQuestions = shuffleArray(data.questions);
          setQuestions(shuffledQuestions);
        })
        .catch((err) => console.error("Failed to load combined questions:", err));
    } else {
      // Load the week-specific data
      import(`@/data/${params.week}.json`)
        .then((data) => setQuestions(data.questions))
        .catch((err) => console.error("Failed to load questions:", err));
    }
  }, [params.week]);

  // Calculate score
  const score = questions.reduce((acc, question) => {
    return selectedAnswers[question.id] === question.correctAnswer ? acc + 1 : acc;
  }, 0);

  // Function to generate personalized, humorous feedback
  const getFunnyComment = (score, total) => {
    const percentage = (score / total) * 100;

    if (percentage === 100) return "🎯 Perfect score! Are you secretly the quiz master?";
    if (percentage >= 90) return "🔥 Almost there! Just a few more steps to the top.";
    if (percentage >= 80) return "💪 Great job! You're on the right track.";
    if (percentage >= 70) return "👍 Good effort! Keep pushing forward.";
    if (percentage >= 60) return "😅 Not bad, but there's room for improvement.";
    if (percentage >= 50) return "🤔 Halfway there! Time to hit the books.";
    if (percentage >= 40) return "😬 It's a start, but you might want to review.";
    if (percentage >= 30) return "😓 Keep trying! Practice makes perfect.";
    if (percentage >= 20) return "😖 Ouch! That was a tough one.";
    if (percentage >= 10) return "😵 Well, at least you tried.";
    return "💤 Did you even take the quiz? Let's give it another shot!";
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#f5f5f5] p-8">
      <div className="max-w-2xl mx-auto bg-[#1e1e1e] text-[#f5f5f5] rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">
            {params.week.replace("-", " ").toUpperCase()} QUIZ
          </h1>
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-gray-700">
              Back to Home
            </Button>
          </Link>
        </div>

        {questions.map((question, index) => (
          <div key={index + 1} className="mb-8">
            <p className="font-medium mb-4">{question.text}</p>
            <div className="space-y-2">
              {question.options.map((option) => {
                const isSelected = selectedAnswers[question.id] === option;
                const isCorrect = submitted && option === question.correctAnswer;
                const isIncorrect =
                  submitted && isSelected && option !== question.correctAnswer;

                let bgColor = "bg-[#2a2a2a] border-[#444]"; // default dark bg
                if (isSelected && !submitted) bgColor = "bg-blue-700 border-blue-500 text-white";
                if (isCorrect) bgColor = "bg-green-600 border-green-400 text-white";
                if (isIncorrect) bgColor = "bg-red-600 border-red-400 text-white";

                return (
                  <button
                    key={option}
                    className={`w-full text-left p-3 rounded-lg border transition-colors duration-200 ${bgColor}`}
                    onClick={() =>
                      !submitted &&
                      setSelectedAnswers({ ...selectedAnswers, [question.id]: option })
                    }
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {!submitted ? (
          <Button
            className="w-full mt-6 bg-blue-700 hover:bg-blue-600 text-white"
            onClick={() => setSubmitted(true)}
          >
            Submit Answers
          </Button>
        ) : (
          <div className="mt-6 p-4 bg-[#2a2a2a] text-white rounded-lg">
            <p className="text-xl font-semibold text-center mb-4">
              Score: {score}/{questions.length}
            </p>
            <p className="text-center italic mb-4">
              {getFunnyComment(score, questions.length)}
            </p>
            <div className="flex gap-4">
              <Button
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
              <Link href="/" className="flex-1">
                <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                  Choose Another Week
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
