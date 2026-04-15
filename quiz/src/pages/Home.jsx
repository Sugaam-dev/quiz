import { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

const Home = ({ onStart }) => {
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 text-center">
      <div className="w-full max-w-md space-y-4">
        <InputField value={name} onChange={(e) => setName(e.target.value)} />

        <div className="text-sm text-gray-600 space-y-2">
          <p>• Answer all questions</p>
          <p>• Each question has 108 seconds</p>
          <p>• Auto move after time ends</p>
        </div>

        <Button onClick={() => onStart(name)}>Start Test</Button>
      </div>
    </div>
  );
};

export default Home;