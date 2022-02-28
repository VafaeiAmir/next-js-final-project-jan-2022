import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';

const homeText2Style = css`
  display: flex;
  justify-content: center;
  margin: auto;
  font-size: 1.5rem;
  justify-content: center;
  margin-top: 570px;
  margin-left: 90px;
  margin-right: 90px;
`;
export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
      </Head>
      <div css={homeText2Style}>
        Learn to Cook Rice,
        <p>
          Maz shows you the magic of how to prepare the rice in different ways
        </p>
      </div>
    </Layout>
  );
}
