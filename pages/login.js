import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';

const homeTextStyle = css`
  display: flex;
  position: absolute;
  justify-content: center;
  margin: 220px 90px;
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
