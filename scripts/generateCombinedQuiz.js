const fs = require('fs');
const path = require('path');

// Assuming your week JSON files are in 'src/data' folder
const weeks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let masterQuestions = [];

weeks.forEach(week => {
  const weekData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', `week-${week}.json`), 'utf-8')); // Corrected path
  weekData.questions.forEach(question => {
    question.week = week; // Add week field
    masterQuestions.push(question);
  });
});

// Write to master JSON file
fs.writeFileSync(path.join(__dirname, '..', 'combined.json'), JSON.stringify({ questions: masterQuestions }, null, 2));
