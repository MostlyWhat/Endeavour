import { useMemo, useEffect } from 'react';
import { doc } from 'firebase/firestore';
import { useDocument } from '@lib/hooks/useDocument';
import { transmitsCollection } from '@lib/firebase/collections';
import { getRandomId } from '@lib/random';
import { Transmit } from './tweet';
import type { LoadedParents } from './tweet-with-parent';

type TransmitParentProps = {
  parentId: string;
  loadedParents: LoadedParents;
  addParentId: (parentId: string, componentId: string) => void;
};

export function TransmitParent({
  parentId,
  loadedParents,
  addParentId
}: TransmitParentProps): JSX.Element | null {
  const componentId = useMemo(getRandomId, []);

  const isParentAlreadyLoaded = loadedParents.some(
    (child) => child.childId === componentId
  );

  const { data, loading } = useDocument(doc(transmitsCollection, parentId), {
    includeUser: true,
    allowNull: true,
    disabled: isParentAlreadyLoaded
  });

  useEffect(() => {
    addParentId(parentId, componentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !isParentAlreadyLoaded || !data) return null;

  return <Transmit parentTransmit {...data} />;
}
