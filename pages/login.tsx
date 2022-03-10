import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';

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

export default function Login() {
  return (
    <Layout>
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
          <label css={lableStyle}>
            Username: <input />
          </label>
          <label css={lableStyle}>
            Password: <input />
          </label>
          <button css={loginButtonStyle}>Login</button>
        </div>
      </div>
    </Layout>
  );
}
