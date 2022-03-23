import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { createCsrfToken } from '../util/auth';
import { getValidSessionByToken } from '../util/database';
import { RegisterResponseBody } from './api/register';

const containerStyle = css`
  position: relative;
  text-align: center;
`;
const diffRiceImageStyle = css`
  display: grid;
  justify-content: center;
  /* margin: auto; */
  /* margin-left: 100px;
  margin-right: 100px; */
  padding-left: 10px;
  padding-right: 10px;
`;
const threeImagestyle = css`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, calc(((59vw - 4rem) / 2.1)));
  grid-gap: 1rem;
  grid-template-rows: auto;
  margin: 0.5rem 0;
  padding: 0 7rem 0;
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
const loginButtonStyle = css`
  padding: 0.2rem;
  margin: 0.2rem 5rem;
  margin-right: 17px;
  background-color: lightblue;
  border-radius: 10px;
`;
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
type Errors = { message: string }[];
type Props = {
  refreshUserProfile: () => void;
  userObject: { username: string };
  csrfToken: string;
};

export default function Registration(props: Props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const router = useRouter();

  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>Registration</title>
        <meta name="description" content="Register on this website" />
      </Head>
      <div css={containerStyle}>
        <div css={diffRiceImageStyle}>
          <Image
            src="/home-pics/threeRices.jpg"
            alt="three different types of rice"
            height={320}
            width={1180}
          />
        </div>
        <div>
          <form
            css={logTextStyle}
            onSubmit={async (event) => {
              event.preventDefault();

              const registerResponse = await fetch('/api/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  username: userName,
                  password: password,
                  csrfToken: props.csrfToken,
                }),
              });

              const registerResponseBody =
                (await registerResponse.json()) as RegisterResponseBody;

              if ('errors' in registerResponseBody) {
                setErrors(registerResponseBody.errors);
                return;
              }

              props.refreshUserProfile();
              await router.push('/');
            }}
          >
            <h1>Register</h1>
            <label css={lableStyle}>
              Username:{' '}
              <input
                value={userName}
                onChange={(event) => setUserName(event.currentTarget.value)}
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
            <button css={loginButtonStyle}>Register</button>
          </form>
          <div>
            {errors.map((error) => {
              return <div key={`error-${error.message}`}>{error.message}</div>;
            })}
          </div>
        </div>
      </div>
      <div css={threeImagestyle}>
        <Image
          src="/home-pics/4.jpg"
          alt="tow hands of rice"
          height={300}
          width={270}
        />
        <Image
          src="/home-pics/shalizar.jpg"
          alt="people working in rice field"
          height={300}
          width={620}
        />
        <Image
          src="/home-pics/3holzspoons.jpg"
          alt="three different types of rice"
          height={300}
          width={270}
        />
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
        destination: `https://${context.req.headers.host}/registration`,
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

  // 3. otherwise render the page

  return {
    props: {
      csrfToken: createCsrfToken(),
    },
  };
}
