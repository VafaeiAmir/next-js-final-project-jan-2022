import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../components/Layout';
import { createCsrfToken } from '../util/auth';
import { getValidSessionByToken } from '../util/database';
import { RegisterResponseBody } from './api/register';
import styles from './pages.module.css';

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
      <div className={styles.container}>
        <div className={styles.diffRiceImage}>
          <Image
            src="/home-pics/threeRices.jpg"
            alt="three different types of rice"
            height={320}
            width={1180}
          />
        </div>
        <div>
          <form
            className={styles.logText}
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
            <label className={styles.lable}>
              Username:{' '}
              <input
                value={userName}
                onChange={(event) => setUserName(event.currentTarget.value)}
              />
            </label>
            <label className={styles.lable}>
              Password:{' '}
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
            </label>
            <button className={styles.loginButton}>Register</button>
          </form>
          <div>
            {errors.map((error) => {
              return <div key={`error-${error.message}`}>{error.message}</div>;
            })}
          </div>
        </div>
      </div>
      <div className={styles.threeImage}>
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
