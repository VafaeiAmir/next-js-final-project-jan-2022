import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';

const homeText2Style = css`
  text-align: center;
  font-size: 1.5rem;
  margin-left: 130px;
  margin-right: 130px;
`;
const homeImageStyle = css`
  display: flex;
  justify-content: center;
  margin: auto;
`;

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
      </Head>
      <div css={homeImageStyle}>
        <Image
          src="/home-pics/spoons1.jpg"
          alt="tow Spoons with rice"
          width={900}
          height={600}
        />
      </div>
      <div css={homeText2Style}>
        Learn to Cook Rice, Maz shows you the magic of how to prepare the rice
        in different ways
      </div>
    </Layout>
  );
}
