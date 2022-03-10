import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import Layout from '../components/Layout';

const containerStyle = css`
  position: relative;
  text-align: center;
`;
const diffRiceImageStyle = css`
  display: grid;
  justify-content: center;
  /* margin: auto; */
  /* margin-left: 100px;
  margin-right: 100px; */
  padding-left: 10px;
  padding-right: 10px;
`;
const threeImagestyle = css`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, calc(((59vw - 4rem) / 2.1)));
  grid-gap: 1rem;
  grid-template-rows: auto;
  margin: 0.5rem 0;
  padding: 0 7rem 0;
`;
const lableStyle = css`
  justify-content: center;
  text-align: end;
  padding: 0.3rem 0;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 5px;
  margin-bottom: 5px;
`;
const loginButtonStyle = css`
  padding: 0.2rem;
  margin: 0.2rem 5rem;
  margin-right: 17px;
  background-color: lightblue;
  border-radius: 10px;
`;
const logTextStyle = css`
  display: grid;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: 1%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-top: 10rem !important;
`;

export default function Registration() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  async function deleteUser() {
    const response = await fetch(`/api/register`, {
      method: 'DELETE',
    });
    const deleteUser = response.json();
    const newUserList = users.filter(
      (User) => deleteUser.userName !== User.userName,
    );

    setUserName(newUserList);
  }

  async function createUser() {
    // alert('Hello');
    if (!userName || !password) {
      console.log('I need more data');
      return;
    }
    const response = await fetch(`/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    });
    const createdUser = await response.json();
    console.log(createdUser);
    setUserName('');
    setPassword('');
  }

  return (
    <Layout>
      <Head>
        <title>Registration</title>
        <meta name="description" content="Register on this website" />
      </Head>
      <div css={containerStyle}>
        <div css={diffRiceImageStyle}>
          <Image
            src="/home-pics/threeRices.jpg"
            alt="three different types of rice"
            height={320}
            width={1180}
          />
        </div>
        <div css={logTextStyle}>
          <h1>Register</h1>

          <label css={lableStyle}>
            Username:{' '}
            <input
              onChange={(event) => setUserName(event.currentTarget.value)}
              value={userName}
            />
          </label>
          <label css={lableStyle}>
            Password:{' '}
            <input
              onChange={(event) => setPassword(event.currentTarget.value)}
              value={password}
            />
          </label>
          <button onClick={() => createUser()} css={loginButtonStyle}>
            Register
          </button>
          {userName.map((User) => (
            <Fragment key={User.userName}>
              <input value={User.userName} />
              <button
                onClick={() => {
                  deleteUser(User.userName).catch(() => {});
                }}
              >
                Delete User
              </button>
            </Fragment>
          ))}
        </div>
      </div>
      <div css={threeImagestyle}>
        <Image
          src="/home-pics/4.jpg"
          alt="tow hands of rice"
          height={300}
          width={270}
        />
        <Image
          src="/home-pics/shalizar.jpg"
          alt="people working in rice field"
          height={300}
          width={620}
        />
        <Image
          src="/home-pics/3holzspoons.jpg"
          alt="three different types of rice"
          height={300}
          width={270}
        />
      </div>
    </Layout>
  );
}
