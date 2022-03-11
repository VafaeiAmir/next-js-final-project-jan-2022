import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { createCsrfToken } from '../util/auth';
import { getValidSessionByToken } from '../util/database';
import { LoginResponseBody } from './api/login';

const logTextStyle = css`
  display: grid;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 1%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-top: 10rem !important;
`;
const containerStyle = css`
  position: relative;
  text-align: center;
`;
const loginButtonStyle = css`
  padding: 0.2rem;
  margin: 0.2rem 5rem;
  margin-right: 17px;
  background-color: lightblue;
  border-radius: 10px;
`;
const logImageStyle = css`
  display: grid;
  justify-content: space-around;
  padding-left: 10px;
  padding-right: 10px;
`;
const lableStyle = css`
  justify-content: center;
  text-align: end;
  padding: 0.3rem 0;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 5px;
  margin-bottom: 5px;
`;
type Errors = { message: string }[];
type Props = {
  refreshUserProfile: () => void;
  userObject: { username: string };
  csrfToken: string;
};
export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Log In</title>
        <meta name="description" content="Login on this website" />
      </Head>

      <div css={containerStyle}>
        <div css={logImageStyle}>
          <Image
            src="/home-pics/adviye.jpg"
            alt="4 Spoons with spices"
            width={900}
            height={600}
          />
        </div>
        <div css={logTextStyle}>
          <h1>Login</h1>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const loginResponse = await fetch('/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: username,
                  password: password,
                  csrfToken: props.csrfToken,
                }),
              });

              const loginResponseBody =
                (await loginResponse.json()) as LoginResponseBody;

              if ('errors' in loginResponseBody) {
                setErrors(loginResponseBody.errors);
                return;
              }

              // Get the query parameter from the Next.js router
              const returnTo = router.query.returnTo;
              console.log('returnTo', returnTo);

              if (
                returnTo &&
                !Array.isArray(returnTo) &&
                // Security: Validate returnTo parameter against valid path
                // (because this is untrusted user input)
                /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
              ) {
                await router.push(returnTo);
                return;
              }

              // Login worked, redirect to the homepage using the Next.js router
              // setErrors([]); // clear the errors - maybe not necessary with redirect
              props.refreshUserProfile();
              await router.push(`/recipes/index`);
            }}
          >
            <label css={lableStyle}>
              Username:{' '}
              <input
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
              />
            </label>
            <label css={lableStyle}>
              Password:{' '}
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </label>
            <button css={loginButtonStyle}>Login</button>
          </form>
          <div>
            {errors.map((error) => {
              return <div key={`error-${error.message}`}>{error.message}</div>;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/login`,
        permanent: true,
      },
    };
  }

  // 1. check if there is a token and is valid from the cookie
  const token = context.req.cookies.sessionToken;

  if (token) {
    // 2. check if the token its valid and redirect
    const session = await getValidSessionByToken(token);

    if (session) {
      console.log(session);
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }

  // 3. Otherwise, generate CSRF token and render the page
  return {
    props: {
      csrfToken: createCsrfToken(),
    },
  };
}
