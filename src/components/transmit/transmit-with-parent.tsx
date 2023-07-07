import { useState } from 'react';
import { Transmit } from './transmit';
import { TransmitParent } from './transmit-parent';
import type { TransmitWithUser } from '@lib/types/transmit';

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
      {filteredData.map((transmit) => (
        <div className='[&>article:nth-child(2)]:-mt-1' key={transmit.id}>
          {transmit.parent && (
            <TransmitParent
              parentId={transmit.parent.id}
              loadedParents={loadedParents}
              addParentId={addParentId}
            />
          )}
          <Transmit {...transmit} />
        </div>
      ))}
    </>
  );
}
