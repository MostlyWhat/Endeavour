import { AnimatePresence } from 'framer-motion';
import { query, where } from 'firebase/firestore';
import { useCollection } from '@lib/hooks/useCollection';
import { transmitsCollection } from '@lib/firebase/collections';
import { useUser } from '@lib/context/user-context';
import { mergeData } from '@lib/merge';
import { UserLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { UserDataLayout } from '@components/layout/user-data-layout';
import { UserHomeLayout } from '@components/layout/user-home-layout';
import { Transmit } from '@components/tweet/tweet';
import { Loading } from '@components/ui/loading';
import { StatsEmpty } from '@components/tweet/stats-empty';
import type { ReactElement, ReactNode } from 'react';

export default function UserMedia(): JSX.Element {
  const { user } = useUser();

  const { id, name, username } = user ?? {};

  const { data, loading } = useCollection(
    query(
      transmitsCollection,
      where('createdBy', '==', id),
      where('images', '!=', null)
    ),
    { includeUser: true, allowNull: true }
  );

  const sortedTransmits = mergeData(true, data);

  return (
    <section>
      <SEO
        title={`Media Transmits by ${name as string} (@${
          username as string
        }) / Endeavour`}
      />
      {loading ? (
        <Loading className='mt-5' />
      ) : !sortedTransmits ? (
        <StatsEmpty
          title={`@${username as string} hasn't Transmited Media`}
          description='Once they do, those Transmits will show up here.'
          imageData={{ src: '/assets/no-media.png', alt: 'No media' }}
        />
      ) : (
        <AnimatePresence mode='popLayout'>
          {sortedTransmits.map((tweet) => (
            <Transmit {...tweet} key={tweet.id} />
          ))}
        </AnimatePresence>
      )}
    </section>
  );
}

UserMedia.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <UserLayout>
        <UserDataLayout>
          <UserHomeLayout>{page}</UserHomeLayout>
        </UserDataLayout>
      </UserLayout>
    </MainLayout>
  </ProtectedLayout>
);
