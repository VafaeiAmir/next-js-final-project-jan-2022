import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';

const homeText2Style = css`
  text-align: center;
  font-size: 1.5rem;
  line-height: 1;
  margin-left: 140px;
  margin-right: 140px;
  margin-top: 1rem;
  color: #660000;
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
          width={880}
          height={580}
        />
      </div>
      <div css={homeText2Style}>
        Learn to Cook Rice, Maz shows you the magic of how to prepare the rice
        in different ways
      </div>
    </Layout>
  );
}
