import '@/styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '@/components/layout';
import '@/styles/custom.scss';
import config from '@/src/lib/firebase/config';
import { GameProvider } from '@/context/GameContext';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase
const app = initializeApp(config);
const analytics = getAnalytics(app);

export default function MyApp({

  
  Component,
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
      <GameProvider>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </GameProvider>
  );
}
