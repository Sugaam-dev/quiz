import { useState } from "react";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Success from "./pages/Success";

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState("");

  return (
    <>
      {page === "home" && (
        <Home
          onStart={(name) => {
            setUser(name);
            setPage("quiz");
          }}
        />
      )}

      {page === "quiz" && (
        <Quiz onFinish={() => setPage("success")} />
      )}

      {page === "success" && <Success />}
    </>
  );
}

export default App;