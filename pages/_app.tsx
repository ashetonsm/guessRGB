import '@/styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '@/components/layout';
import '@/styles/custom.scss'
import { GameProvider } from '@/context/GameContext';

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
