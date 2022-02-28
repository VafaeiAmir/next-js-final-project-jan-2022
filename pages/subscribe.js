import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';

const homeTextStyle = css`
  display: flex;
  position: absolute;
  justify-content: center;
  margin: 220px 90px;
`;

export default function Subscribe() {
  return (
    <Layout>
      <Head>
        <title>Subscribe</title>
        <meta name="description" content="Subscribe" />
      </Head>
      <div css={homeTextStyle}>
        <h1>Subscribe</h1>
      </div>
    </Layout>
  );
}
