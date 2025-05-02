// "use client";
// import { useRouter } from "next/navigation";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// export default function Home() {
//   const router = useRouter();
//   const weeks = ["week-1", "week-2","week-3","week-4","week-5","week-6","week-7","week-8","week-9","week-10","week-11","week-12"]; 

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-80">
//         <h1 className="text-2xl font-bold mb-6 text-center">Select Week</h1>
//         <Select onValueChange={(week) => router.push(`/quiz/${week}`)}>
//           <SelectTrigger>
//             <SelectValue placeholder="Choose a week" />
//           </SelectTrigger>
//           <SelectContent>
//             {weeks.map((week) => (
//               <SelectItem key={week} value={week}>
//                 {week.replace("-", " ").toUpperCase()}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useRouter } from "next/navigation";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// export default function Home() {
//   const router = useRouter();
//   const weeks = ["week-1", "week-2","week-3","week-4","week-5","week-6","week-7","week-8","week-9","week-10","week-11","week-12"]; 

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black">
//       <div className="bg-white p-8 rounded-lg shadow-md w-80">
//         <h1 className="text-2xl font-bold mb-6 text-center text-whitesmoke">Select Week</h1>
//         <Select onValueChange={(week) => router.push(`/quiz/${week}`)}>
//           <SelectTrigger>
//             <SelectValue placeholder="Choose a week" />
//           </SelectTrigger>
//           <SelectContent>
//             {weeks.map((week) => (
//               <SelectItem key={week} value={week}>
//                 {week.replace("-", " ").toUpperCase()}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   );
// }


// "use client";
// import { useRouter } from "next/navigation";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// export default function Home() {
//   const router = useRouter();
//   const weeks = Array.from({ length: 12 }, (_, i) => `week-${i + 1}`);

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
//       {/* Floating Out-of-the-Box Header */}
//       <div className="w-full max-w-2xl mb-8 mt-12">
//         <div className="relative group">
//           <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
//           <div className="relative px-8 py-6 bg-gray-900 ring-1 ring-gray-800 rounded-lg">
//             <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
//               COGNITIVE PSYCHOLOGY
//             </h1>
//             <p className="text-center text-gray-400 mt-2">Practice for NPTEL Exam</p>
//           </div>
//         </div>
//       </div>

//       {/* Week Selection Card */}
//       <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl p-8 w-full max-w-md">
//         <div className="space-y-6">
//           <h2 className="text-xl font-semibold text-center text-gray-200">Select Week</h2>
//           <Select onValueChange={(week) => router.push(`/quiz/${week}`)}>
//             <SelectTrigger className="h-12 bg-white/5 border-white/10 hover:bg-white/10 transition-colors text-white">
//               <SelectValue placeholder="Choose a week" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-800 border-gray-700 backdrop-blur-lg">
//               {weeks.map((week) => (
//                 <SelectItem 
//                   key={week} 
//                   value={week}
//                   className="hover:bg-gray-700 focus:bg-gray-700 text-white"
//                 >
//                   <span className="font-medium">{week.replace("-", " ").toUpperCase()}</span>
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Decorative elements */}
//         <div className="mt-8 flex justify-center space-x-3">
//           {[...Array(5)].map((_, i) => (
//             <div 
//               key={i}
//               className="h-2 w-2 bg-blue-400/50 rounded-full animate-bounce"
//               style={{ 
//                 animationDelay: `${i * 0.1}s`,
//                 animationDuration: '1.5s'
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useRouter } from "next/navigation";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import DualCountdown from '@/components/DualCountdown';

export default function Home() {
  const router = useRouter();
  
  // Weeks array with the combined option added
  const weeks = Array.from({ length: 12 }, (_, i) => `week-${i + 1}`);
  const combinedOption = "combined"; // Combined set of questions

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-white mb-2">
        NPTEL COGNITIVE PSYCHOLOGY
      </h1>
      <p className="text-center text-gray-400 mb-12">
        Countdown to May 4, 2025
      </p>
      
      <DualCountdown />


<br/>
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      {/* Floating Out-of-the-Box Header */}
      <div className="w-full max-w-2xl mb-8 mt-12">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
          <div className="relative px-8 py-6 bg-gray-900 ring-1 ring-gray-800 rounded-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
              COGNITIVE PSYCHOLOGY
            </h1>
            <p className="text-center text-gray-400 mt-2">Practice for NPTEL Exam</p>
          </div>
        </div>
      </div>

      {/* Week Selection Card */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-center text-gray-200">Select Week</h2>
          <Select onValueChange={(week) => router.push(`/quiz/${week}`)}>
            <SelectTrigger className="h-12 bg-white/5 border-white/10 hover:bg-white/10 transition-colors text-white">
              <SelectValue placeholder="Choose a week" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 backdrop-blur-lg">
              {/* Include the Combined Option */}
              <SelectItem 
                key={combinedOption} 
                value={combinedOption}
                className="hover:bg-gray-700 focus:bg-gray-700 text-white"
              >
                <span className="font-medium">COMBINED</span>
              </SelectItem>
              
              {/* Existing Week Options */}
              {weeks.map((week) => (
                <SelectItem 
                  key={week} 
                  value={week}
                  className="hover:bg-gray-700 focus:bg-gray-700 text-white"
                >
                  <span className="font-medium">{week.replace("-", " ").toUpperCase()}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Decorative elements */}
        <div className="mt-8 flex justify-center space-x-3">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="h-2 w-2 bg-blue-400/50 rounded-full animate-bounce"
              style={{ 
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}
