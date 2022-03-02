import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';

// import styles from '../styles/pagesStyles.css';

const downTextStyle = css`
  text-align: center;
  font-size: 2.8rem;
  color: #660000;
`;
const recipesImageStyle = css`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, calc(((59vw - 4rem) / 3.5)));
  grid-gap: 2rem;
  grid-template-rows: auto;
  margin-left: 100px;
  margin-right: 100px;
  padding: 0 2rem 0;
`;
const mainNameStyle = css`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, calc(((59vw - 4rem) / 3.5)));
  grid-gap: 2rem;
  grid-template-rows: auto;
  margin-left: 130px;
  margin-right: 130px;
  padding: 0 2rem 0;
  color: #660000;
`;

export default function Recipes(props) {
  return (
    <Layout>
      <Head>
        <title>Recipes</title>
        <meta name="description" content="Recipes" />
      </Head>
      <h1 css={downTextStyle}>Recipes & Pictures</h1>

      <div css={recipesImageStyle}>
        <Image
          src="/home-pics/tahchin.jpg"
          alt="a picture of Tahchin"
          width={300}
          height={200}
        />
        <Image
          src="/home-pics/lubia.jpg"
          alt="a picture of Lubia Polo"
          width={300}
          height={200}
        />
        <Image
          src="/home-pics/sabzi.jpg"
          alt="a picture of Sabzi Polo"
          width={300}
          height={200}
        />
        <Image
          src="/home-pics/Rice2.jpg"
          alt="a picture of Baghali Polo"
          width={300}
          height={200}
        />
      </div>
      <div css={mainNameStyle}>
        <h1>TAHCHIN</h1>
        <h1>LUBIA POLO</h1>
        <h1>SABZI POLO</h1>
        <h1>BAGHALI POLO</h1>
      </div>
      <div css={mainNameStyle}>
        <a>jsjflsdkgfnlsk</a>
        <a>jsjflsdkgfnlsk</a>
        <a>jsjflsdkgfnlsk</a>
        <a>jsjflsdkgfnlsk</a>
      </div>
    </Layout>
  );
}
export function getServerSideProps() {
  return {
    props: {},
  };
}
