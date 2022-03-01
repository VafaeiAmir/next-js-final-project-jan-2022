import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';

const homeTextStyle = css`
  text-align: center;
  justify-content: center;
  margin: 50px;
`;

export default function Registration() {
  return (
    <Layout>
      <Head>
        <title>Registration</title>
        <meta name="description" content="Registration" />
      </Head>
      <div css={homeTextStyle}>
        <h1>Registration</h1>
      </div>
    </Layout>
  );
}
