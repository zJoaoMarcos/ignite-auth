import { AuthContext } from "@/contexts/AuthContext";
import styles from "@/styles/Home.module.css";
import { withSSRGuest } from "@/utils/withSSRGuest";
import { Inter } from "next/font/google";
import Head from "next/head";
import { FormEvent, useContext, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Auth | Ignite</title>
      </Head>

      <form
        onSubmit={handleSubmit}
        className={`${styles.main} ${inter.className}`}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />

        <button type="submit">Entrar</button>
      </form>
    </>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
