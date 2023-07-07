import { MainHeader } from '@components/home/main-header';
import type { ReactNode } from 'react';
import type { StatsType } from '@components/view/view-tweet-stats';

type TransmitStatsModalProps = {
  children: ReactNode;
  statsType: StatsType | null;
  handleClose: () => void;
};

export function TransmitStatsModal({
  children,
  statsType,
  handleClose
}: TransmitStatsModalProps): JSX.Element {
  return (
    <>
      <MainHeader
        useActionButton
        disableSticky
        tip='Close'
        iconName='XMarkIcon'
        className='absolute flex w-full items-center gap-6 rounded-tl-2xl'
        title={`${statsType === 'likes' ? 'Liked' : 'Retransmited'} by`}
        action={handleClose}
      />
      {children}
    </>
  );
}
