import { AnimatePresence } from 'framer-motion';
import { doc, query, where, orderBy } from 'firebase/firestore';
import { useCollection } from '@lib/hooks/useCollection';
import { useDocument } from '@lib/hooks/useDocument';
import { transmitsCollection } from '@lib/firebase/collections';
import { useUser } from '@lib/context/user-context';
import { UserLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { UserDataLayout } from '@components/layout/user-data-layout';
import { UserHomeLayout } from '@components/layout/user-home-layout';
import { Transmit } from '@components/transmit/transmit';
import { Loading } from '@components/ui/loading';
import { StatsEmpty } from '@components/transmit/stats-empty';
import { TransmitWithParent } from '@components/transmit/transmit-with-parent';
import type { ReactElement, ReactNode } from 'react';

export default function UserWithReplies(): JSX.Element {
  const { user } = useUser();

  const { id, name, username, pinnedTransmit } = user ?? {};

  const { data: pinnedData } = useDocument(
    doc(transmitsCollection, pinnedTransmit ?? 'null'),
    {
      disabled: !pinnedTransmit,
      allowNull: true,
      includeUser: true
    }
  );

  const { data, loading } = useCollection(
    query(
      transmitsCollection,
      where('createdBy', '==', id),
      orderBy('createdAt', 'desc')
    ),
    { includeUser: true, allowNull: true }
  );

  return (
    <section>
      <SEO
        title={`Transmits with replies by ${name as string} (@${
          username as string
        }) / Endeavour`}
      />
      {loading ? (
        <Loading className='mt-5' />
      ) : !data ? (
        <StatsEmpty
          title={`@${username as string} hasn't transmited`}
          description='When they do, their Transmits will show up here.'
        />
      ) : (
        <AnimatePresence mode='popLayout'>
          {pinnedData && (
            <Transmit pinned {...pinnedData} key={`pinned-${pinnedData.id}`} />
          )}
          <TransmitWithParent data={data} />
        </AnimatePresence>
      )}
    </section>
  );
}

UserWithReplies.getLayout = (page: ReactElement): ReactNode => (
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
