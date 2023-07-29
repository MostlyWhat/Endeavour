import Head from 'next/head';

export function AppHead(): JSX.Element {
  return (
    <Head>
      <title>Endeavour</title>
      <meta name='og:title' content='Endeavour' />
      <link rel='icon' href='/favicon.ico' />
      <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
      <meta name='endeavour:site' content='MostlyWhat Systems' />
      <meta name='endeavour:card' content='summary_large_image' />
    </Head>
  );
}
