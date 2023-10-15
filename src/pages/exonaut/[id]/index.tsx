import { doc, query, where } from 'firebase/firestore';
import { AnimatePresence } from 'framer-motion';
import { useUser } from '@lib/context/user-context';
import { useCollection } from '@lib/hooks/useCollection';
import { useDocument } from '@lib/hooks/useDocument';
import { transmitsCollection } from '@lib/firebase/collections';
import { mergeData } from '@lib/merge';
import { UserLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { UserDataLayout } from '@components/layout/user-data-layout';
import { UserHomeLayout } from '@components/layout/user-home-layout';
import { StatsEmpty } from '@components/transmit/stats-empty';
import { Loading } from '@components/ui/loading';
import { Transmit } from '@components/transmit/transmit';
import type { ReactElement, ReactNode } from 'react';

export default function UserTransmits(): JSX.Element {
  const { user } = useUser();

  const { id, username, pinnedTransmit } = user ?? {};

  const { data: pinnedData } = useDocument(
    doc(transmitsCollection, pinnedTransmit ?? 'null'),
    {
      disabled: !pinnedTransmit,
      allowNull: true,
      includeUser: true
    }
  );

  const { data: ownerTransmits, loading: ownerLoading } = useCollection(
    query(
      transmitsCollection,
      where('createdBy', '==', id),
      where('parent', '==', null)
    ),
    { includeUser: true, allowNull: true }
  );

  const { data: peopleTransmits, loading: peopleLoading } = useCollection(
    query(
      transmitsCollection,
      where('createdBy', '!=', id),
      where('userRetransmits', 'array-contains', id)
    ),
    { includeUser: true, allowNull: true }
  );

  const mergedTransmits = mergeData(true, ownerTransmits, peopleTransmits);

  return (
    <section>
      {ownerLoading || peopleLoading ? (
        <Loading className='mt-5' />
      ) : !mergedTransmits ? (
        <StatsEmpty
          title={`@${username as string} hasn't transmited`}
          description='When they do, their Transmits will show up here.'
        />
      ) : (
        <AnimatePresence mode='popLayout'>
          {pinnedData && (
            <Transmit pinned {...pinnedData} key={`pinned-${pinnedData.id}`} />
          )}
          {mergedTransmits.map((transmit) => (
            <Transmit {...transmit} profile={user} key={transmit.id} />
          ))}
        </AnimatePresence>
      )}
    </section>
  );
}

UserTransmits.getLayout = (page: ReactElement): ReactNode => (
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
