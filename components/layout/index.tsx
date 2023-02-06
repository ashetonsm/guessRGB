import Meta, { MetaProps } from '@/components/layout/meta';
import { useRouter } from 'next/router';
import LoadingDots from '@/components/icons/loading-dots';
import { ReactNode } from 'react';
import CustomFonts from './customFonts';
import { Menu } from './menu';

export default function Layout({ meta, children }: { meta: MetaProps; children: ReactNode }) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <LoadingDots color="white" />
    );
  }

  return (
    <>
      {/* The metadata */}
      {/* <Meta props={meta} /> */}
      <CustomFonts />

      <Menu loggedIn={false} />

      <main>
        {children}
      </main>
    </>
  );
}