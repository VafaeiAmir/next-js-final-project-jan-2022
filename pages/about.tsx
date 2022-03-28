import Head from 'next/head';
import Layout from '../components/Layout';
import styles from './pages.module.css';

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
      <div className={styles.aboutTex}>
        <h1>About</h1>
      </div>
      <div className={styles.aboutText2}>
        <p>Contact:</p>
        <p>Tel: 09876543</p>
        <p>Address: marakahiogf 6000 </p>
        <p>102938 wien</p>
      </div>
    </Layout>
  );
}
