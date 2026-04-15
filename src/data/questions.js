/**
 * questions.js — sample question bank
 *
 * Each question supports three layouts automatically:
 *
 *  1. Text only            image: null,  options: [{ image: null }]
 *  2. Image in question    image: "url", options: [{ image: null }]
 *  3. Images in options    image: null,  options: [{ image: "url" }]
 *  4. Images in both       image: "url", options: [{ image: "url" }]
 *
 * QuestionCard detects the layout from the data — no extra props needed.
 */

export const questions = [
  // --- Layout 1: text only ---
  {
    id: 1,
    question: "What is the powerhouse of the cell?",
    image: null,
    options: [
      { id: "a", text: "Nucleus",      image: null },
      { id: "b", text: "Mitochondria", image: null },
      { id: "c", text: "Ribosome",     image: null },
      { id: "d", text: "Golgi body",   image: null },
    ],
    correct: "b",
  },

  // --- Layout 2: image in question, text options ---
  {
    id: 2,
    question: "Which planet is shown in this image?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/The_Blue_Marble.jpg/240px-The_Blue_Marble.jpg",
    options: [
      { id: "a", text: "Mars",    image: null },
      { id: "b", text: "Earth",   image: null },
      { id: "c", text: "Venus",   image: null },
      { id: "d", text: "Neptune", image: null },
    ],
    correct: "b",
  },

  // --- Layout 3: text question, image options (2-col grid) ---
  {
    id: 3,
    question: "Identify the correct flag of Japan.",
    image: null,
    options: [
      { id: "a", text: "Option A", image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/320px-Flag_of_Japan.svg.png" },
      { id: "b", text: "Option B", image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/320px-Flag_of_the_United_States.svg.png" },
      { id: "c", text: "Option C", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/320px-Flag_of_Germany.svg.png" },
      { id: "d", text: "Option D", image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/320px-Flag_of_India.svg.png" },
    ],
    correct: "a",
  },

  // --- Layout 4: image in question AND image options ---
  {
    id: 4,
    question: "The highlighted region on the map belongs to which country?",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Flag_of_Canada_%28Pantone%29.svg/320px-Flag_of_Canada_%28Pantone%29.svg.png",
    options: [
      { id: "a", text: "USA",       image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/160px-Flag_of_the_United_States.svg.png" },
      { id: "b", text: "Canada",    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/160px-Flag_of_Canada_%28Pantone%29.svg.png" },
      { id: "c", text: "Australia", image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Flag_of_Australia.svg/160px-Flag_of_Australia.svg.png" },
      { id: "d", text: "UK",        image: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ae/Flag_of_the_United_Kingdom.svg/160px-Flag_of_the_United_Kingdom.svg.png" },
    ],
    correct: "b",
  },

  // --- Layout 1 again: plain text ---
  {
    id: 5,
    question: "What is 12 × 12?",
    image: null,
    options: [
      { id: "a", text: "124", image: null },
      { id: "b", text: "144", image: null },
      { id: "c", text: "132", image: null },
      { id: "d", text: "148", image: null },
    ],
    correct: "b",
  },
];