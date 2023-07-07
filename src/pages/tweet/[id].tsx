import { useRef } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { doc, query, where, orderBy } from 'firebase/firestore';
import { transmitsCollection } from '@lib/firebase/collections';
import { useCollection } from '@lib/hooks/useCollection';
import { useDocument } from '@lib/hooks/useDocument';
import { isPlural } from '@lib/utils';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { MainContainer } from '@components/home/main-container';
import { MainHeader } from '@components/home/main-header';
import { Transmit } from '@components/transmit/transmit';
import { ViewTransmit } from '@components/view/view-transmit';
import { SEO } from '@components/common/seo';
import { Loading } from '@components/ui/loading';
import { Error } from '@components/ui/error';
import { ViewParentTransmit } from '@components/view/view-parent-transmit';
import type { ReactElement, ReactNode } from 'react';

export default function TransmitId(): JSX.Element {
  const {
    query: { id },
    back
  } = useRouter();

  const { data: transmitData, loading: transmitLoading } = useDocument(
    doc(transmitsCollection, id as string),
    { includeUser: true, allowNull: true }
  );

  const viewTransmitRef = useRef<HTMLElement>(null);

  const { data: repliesData, loading: repliesLoading } = useCollection(
    query(
      transmitsCollection,
      where('parent.id', '==', id),
      orderBy('createdAt', 'desc')
    ),
    { includeUser: true, allowNull: true }
  );

  const { text, images } = transmitData ?? {};

  const imagesLength = images?.length ?? 0;
  const parentId = transmitData?.parent?.id;

  const pageTitle = transmitData
    ? `${transmitData.user.name} on Endeavour: "${text ?? ''}${
        images ? ` (${imagesLength} image${isPlural(imagesLength)})` : ''
      }" / Endeavour`
    : null;

  return (
    <MainContainer className='!pb-[1280px]'>
      <MainHeader
        useActionButton
        title={parentId ? 'Thread' : 'Transmit'}
        action={back}
      />
      <section>
        {transmitLoading ? (
          <Loading className='mt-5' />
        ) : !transmitData ? (
          <>
            <SEO title='Transmit not found / Endeavour' />
            <Error message='Transmit not found' />
          </>
        ) : (
          <>
            {pageTitle && <SEO title={pageTitle} />}
            {parentId && (
              <ViewParentTransmit
                parentId={parentId}
                viewTransmitRef={viewTransmitRef}
              />
            )}
            <ViewTransmit viewTransmitRef={viewTransmitRef} {...transmitData} />
            {transmitData &&
              (repliesLoading ? (
                <Loading className='mt-5' />
              ) : (
                <AnimatePresence mode='popLayout'>
                  {repliesData?.map((transmit) => (
                    <Transmit {...transmit} key={transmit.id} />
                  ))}
                </AnimatePresence>
              ))}
          </>
        )}
      </section>
    </MainContainer>
  );
}

TransmitId.getLayout = (page: ReactElement): ReactNode => (
  <ProtectedLayout>
    <MainLayout>
      <HomeLayout>{page}</HomeLayout>
    </MainLayout>
  </ProtectedLayout>
);
