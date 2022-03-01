import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';

const logTextStyle = css`
  text-align: center;
  margin-top: 1rem;
`;
const logImageStyle = css`
  display: flex;
  padding-left: 130px;
  padding-right: 130px;
  justify-content: space-around;
`;

export default function Recipes() {
  return (
    <Layout>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="Recipes" />
      </Head>

      <div css={logImageStyle}>
        <h1 css={logTextStyle}>Recipes</h1>
        <Image
          src="/home-pics/Rice 1.jpg"
          alt="tow Spoons with rice"
          width={600}
          height={800}
        />
      </div>
    </Layout>
  );
}
