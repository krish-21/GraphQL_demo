import { useState, useContext } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router";

import AuthContext from "../../store/auth-context";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Auth = () => {
  const history = useHistory();

  const [isLogin, setisLogin] = useState(true);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login } = useContext(AuthContext);

  const [sendLoginReq] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email.trim(),
      password: formState.password.trim(),
    },

    onCompleted: ({ login: data }) => {
      login(data.token);
      history.push("/");
    },

    onError: ({ message }) => console.log(message),
  });

  const [sendResgisterReq] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    },

    onCompleted: ({ login: data }) => {
      login(data.token);
      history.push("/");
    },

    onError: ({ message }) => console.log(message),
  });

  const toggleisLogin = () => {
    setisLogin((previsLogin) => !previsLogin);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    isLogin ? sendLoginReq() : sendResgisterReq();
  };

  return (
    <div>
      <h4>{isLogin ? "Login" : "Sign Up"}</h4>

      <form onSubmit={handleFormSubmit}>
        {!isLogin && (
          <input
            name="name"
            type="text"
            placeholder="Enter name"
            value={formState.name}
            onChange={handleInputChange}
          />
        )}

        <input
          name="email"
          type="text"
          placeholder="Enter email address"
          value={formState.email}
          onChange={handleInputChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Enter password"
          value={formState.password}
          onChange={handleInputChange}
        />

        <button type="submit">{isLogin ? "login" : "create account"}</button>
      </form>

      <div>
        <p onClick={toggleisLogin}>
          {isLogin ? "need to create an account?" : "already have an account?"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
