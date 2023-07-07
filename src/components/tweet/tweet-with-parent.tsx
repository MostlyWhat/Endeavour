import { useState } from 'react';
import { Transmit } from './tweet';
import { TransmitParent } from './tweet-parent';
import type { TransmitWithUser } from '@lib/types/tweet';

type TransmitWithParentProps = {
  data: TransmitWithUser[];
};

export type LoadedParents = Record<'parentId' | 'childId', string>[];

export function TransmitWithParent({
  data
}: TransmitWithParentProps): JSX.Element {
  const [loadedParents, setLoadedParents] = useState<LoadedParents>([]);

  const addParentId = (parentId: string, targetChildId: string): void =>
    setLoadedParents((prevLoadedParents) =>
      prevLoadedParents.some((item) => item.parentId === parentId)
        ? prevLoadedParents
        : [...prevLoadedParents, { parentId, childId: targetChildId }]
    );

  const filteredData = data.filter(
    (child) => !loadedParents.some((parent) => parent.parentId === child.id)
  );

  return (
    <>
      {filteredData.map((tweet) => (
        <div className='[&>article:nth-child(2)]:-mt-1' key={tweet.id}>
          {tweet.parent && (
            <TransmitParent
              parentId={tweet.parent.id}
              loadedParents={loadedParents}
              addParentId={addParentId}
            />
          )}
          <Transmit {...tweet} />
        </div>
      ))}
    </>
  );
}
