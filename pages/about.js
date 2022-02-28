import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';

const homeTextStyle = css`
  display: flex;
  position: absolute;
  justify-content: center;
  margin: 220px 90px;
`;

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About</title>
        <meta name="description" content="About the team" />
      </Head>
      <div css={homeTextStyle}>
        <h1>About</h1>
      </div>
    </Layout>
  );
}
