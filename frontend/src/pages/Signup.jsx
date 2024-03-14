import { useState } from "react";
import axios from "axios";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtomWarning } from "../components/ButtomWarning";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            label={"First Name"}
            placeholder={"Kumar"}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            label={"Last Name"}
            placeholder={"Anurag"}
          />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            label={"Email"}
            placeholder={"kumar@gmail.com"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            label={"Password"}
            placeholder={"123456"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signup",
                  {
                    username,
                    firstName,
                    lastName,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.userId);
                navigate("/dashboard");
              }}
              label={"Sign Up"}
            />
          </div>
          <ButtomWarning
            label={"Already have an account?"}
            buttonText={"Sign In"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
