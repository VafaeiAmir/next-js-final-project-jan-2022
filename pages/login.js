import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';

const logTextStyle = css`
  display: grid;
  justify-content: center;
  text-align: center;
`;
const loginButtonStyle = css`
  padding: 0.2rem;
  margin: 1rem 5rem;
  margin-right: 17px;
  background-color: lightblue;
  border-radius: 10px;
`;
const logImageStyle = css`
  display: grid;
  justify-content: space-around;
  padding-left: 130px;
  padding-right: 130px;
`;
const lableStyle = css`
  justify-content: center;
  text-align: end;
  padding: 0.3rem 0;
`;

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Log In</title>
        <meta name="description" content="Login on this website" />
      </Head>
      <div css={logTextStyle}>
        <h1>Login</h1>
        <label css={lableStyle}>
          Username: <input />
        </label>
        <label css={lableStyle}>
          Password: <input />
        </label>
        <button css={loginButtonStyle}>Login</button>
      </div>
      <div css={logImageStyle}>
        <Image
          src="/home-pics/adviye.jpg"
          alt="4 Spoons with spices"
          width={800}
          height={500}
        />
      </div>
    </Layout>
  );
}
