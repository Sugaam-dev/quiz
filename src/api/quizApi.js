import api from "./api";

export async function getAllTests() {
  const res = await api.get("/tests/");
  return res.data;
}

// ── Get all questions for a given test
export async function getQuestions(testId) {
  const res = await api.get(`/tests/${testId}/questions`);
  return res.data;
}

// ── Start a new attempt
export async function startAttempt(userName, testId) {
  const res = await api.post("/attempts/start", {
    test_id: testId,
    user_name: userName,
  });
  return res.data;
}

// ── Save a single MCQ answer
export async function saveAnswer(attemptId, questionId, selectedOptionIds) {
  const res = await api.post("/attempts/answer", {
    attempt_id: attemptId,
    question_id: questionId,
    selected_option_ids: selectedOptionIds,
  });
  return res.data;
}

// ── Save a text/no-choice answer
export async function saveTextAnswer(attemptId, questionId, textResponse) {
  const res = await api.post("/attempts/text-answer", {
    attempt_id: attemptId,
    question_id: questionId,
    text_response: textResponse,
  });
  return res.data;
}

// ── Finish test and get basic score (AI runs in background)
export async function finishTest(attemptId) {
  const res = await api.post(`/attempts/finish/${attemptId}`);
  return res.data;
}

// ── Poll for AI report status
export async function getReport(attemptId) {
  const res = await api.get(`/results/${attemptId}/report`);
  return res.data;
}