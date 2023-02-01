import React, { useContext, useState } from "react";
import tw from "tailwind-styled-components";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
//Style Component
const Container = tw.div` h-screen flex justify-center items-center flex-col`;
const LoginForm = tw.form`flex flex-col justify-center items-center border-2 rounded-md h-[20rem] w-[30rem] gap-4`;
const InputTag = tw.input`border-2 h-8 w-2/3 rounded-md`;
const SubmitBtn = tw.button` bg-purple-800 text-white w-2/3 h-8 rounded-sm cursor-pointer font-bold text-xl font-playfair`;
const ErrTag = tw.div` font-sm  text-red-600`;
//Module
const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()
  const authContext=useContext(AuthContext)
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        authContext.userLogin(JSON.stringify(user))
        navigate('/')
      })
      .catch((error) => {
        setError(true);
      });
  };
  const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <Container>
      <LoginForm onSubmit={handleLogin}>
        <div className="text-3xl font-mono">Login</div>
        <InputTag
          type="email"
          name=""
          id="login-email"
          placeholder="email"
          onChange={handleInputEmail}
        />
        <InputTag
          type="password"
          name=""
          id="login-password"
          placeholder="password"
          onChange={handleInputPassword}
        />
        <SubmitBtn type="submit">Login</SubmitBtn>
        {error && <ErrTag>Wrong email or password</ErrTag>}
      </LoginForm>
    </Container>
  );
};
export default Login;
