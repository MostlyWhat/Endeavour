import { WhitelistLayout } from '@components/layout/whitelist-layout';
import { SEO } from '@components/common/seo';
import { WhitelistMain } from '@components/whitelist/whitelist-main';
import { WhitelistFooter } from '@components/whitelist/whitelist-footer';
import type { ReactElement, ReactNode } from 'react';

export default function Whitelist(): JSX.Element {
  return (
    <div className='grid min-h-screen grid-rows-[1fr,auto]'>
      <SEO
        title='Endeavour - Communicate Freely about your Endeavours'
        description='From Earth to the Stars, Explore the Boundless Frontiers of the Universe.'
      />
      <WhitelistMain />
      <WhitelistFooter />
    </div>
  );
}

Whitelist.getLayout = (page: ReactElement): ReactNode => (
  <WhitelistLayout>{page}</WhitelistLayout>
);
