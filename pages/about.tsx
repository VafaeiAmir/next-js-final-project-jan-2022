import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';

const aboutTexStyle = css`
  text-align: center;
  margin: 50px;
`;
const aboutText2Style = css`
  text-align: center;
  margin: 80px;
`;
type Props = {
  userObject: { username: string };
};
export default function About(props: Props) {
  return (
    <Layout userObject={props.userObject}>
      <Head>
        <title>About</title>
        <meta name="description" content="About the team" />
      </Head>
      <div css={aboutTexStyle}>
        <h1>About</h1>
      </div>
      <div css={aboutText2Style}>
        <p>Contact:</p>
        <p>Tel: 09876543</p>
        <p>Address: marakahiogf 6000 </p>
        <p>102938 wien</p>
      </div>
    </Layout>
  );
}
