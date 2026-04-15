import api from "./api";

const TEST_ID = "b277595c-e1de-4b35-9d73-ef6ea52b72a6"; // your actual test ID

// ── Get all questions for the test
export async function getQuestions() {
  const res = await api.get(`/tests/${TEST_ID}/questions`);
  return res.data;
}

// ── Start a new attempt
export async function startAttempt(userName) {
  const res = await api.post("/attempts/start", {
    test_id: TEST_ID,
    user_name: userName,
  });
  return res.data; // { attempt_id, test_id, user_name, start_time }
}

// ── Save a single answer
export async function saveAnswer(attemptId, questionId, selectedOptionIds) {
  const res = await api.post("/attempts/answer", {
    attempt_id: attemptId,
    question_id: questionId,
    selected_option_ids: selectedOptionIds, // always an array
  });
  return res.data;
}

// ── Finish test and get score
export async function finishTest(attemptId) {
  const res = await api.post(`/attempts/finish/${attemptId}`);
  return res.data; // { result_id, user_name, total_marks, obtained_marks, percentage }
}