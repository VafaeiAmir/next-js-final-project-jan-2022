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
        <h2>
          This website is about recipes for dishes that can be prepared with
          rice. In our case it is about persian food. Users are also welcome to
          upload their own recipes to the website and share their creations with
          others.
        </h2>
        <h2>
          Have our recipes aroused your interest? then comment on our recipes
          and let us know if they were helpful.
        </h2>
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
