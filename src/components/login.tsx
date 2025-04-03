import { gql, useMutation } from "@apollo/client";
import LoginForm from "./login-form";

export default function Login({
  setToken,
}: {
  setToken: (token: string) => void;
}) {
  const [login, { loading, error }] = useMutation<Response, FormData>(
    LOGIN_MUTATION,
    {
      onCompleted: (data) => setToken(data.login.accessToken),
    }
  );

  const onSubmit = async (d: FormData) => {
    await login({ variables: { email: d.email, password: d.password } });
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {!loading && (
        <>
          <LoginForm onSubmit={onSubmit}></LoginForm>
          {error && <p className="font-extrabold">ERROR: {error.message}</p>}
        </>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
}

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
    }
  }
`;

type Response = { login: { accessToken: string } };
type FormData = {
  email: string;
  password: string;
};
