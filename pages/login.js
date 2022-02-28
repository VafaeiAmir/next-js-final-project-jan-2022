import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';

const homeTextStyle = css`
  text-align: center;
  margin: 50px;
`;

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Log In</title>
        <meta name="description" content="Log" />
      </Head>
      <div css={homeTextStyle}>
        <h1>Login/Out</h1>
      </div>
    </Layout>
  );
}
