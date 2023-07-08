/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useMemo } from 'react';
import cn from 'clsx';
import { manageRetransmit, manageLike } from '@lib/firebase/utils';
import { ViewTransmitStats } from '@components/view/view-transmit-stats';
import { TransmitOption } from './transmit-option';
import { TransmitShare } from './transmit-share';
import type { Transmit } from '@lib/types/transmit';

type TransmitStatsProps = Pick<
  Transmit,
  'userLikes' | 'userRetransmits' | 'userReplies'
> & {
  reply?: boolean;
  userId: string;
  isOwner: boolean;
  transmitId: string;
  viewTransmit?: boolean;
  openModal?: () => void;
};

export function TransmitStats({
  reply,
  userId,
  // isOwner,
  transmitId,
  userLikes,
  viewTransmit,
  userRetransmits,
  userReplies: totalReplies,
  openModal
}: TransmitStatsProps): JSX.Element {
  const totalLikes = userLikes.length;
  const totalTransmits = userRetransmits.length;

  const [{ currentReplies, currentTransmits, currentLikes }, setCurrentStats] =
    useState({
      currentReplies: totalReplies,
      currentLikes: totalLikes,
      currentTransmits: totalTransmits
    });

  useEffect(() => {
    setCurrentStats({
      currentReplies: totalReplies,
      currentLikes: totalLikes,
      currentTransmits: totalTransmits
    });
  }, [totalReplies, totalLikes, totalTransmits]);

  const replyMove = useMemo(
    () => (totalReplies > currentReplies ? -25 : 25),
    [totalReplies]
  );

  const likeMove = useMemo(
    () => (totalLikes > currentLikes ? -25 : 25),
    [totalLikes]
  );

  const transmitMove = useMemo(
    () => (totalTransmits > currentTransmits ? -25 : 25),
    [totalTransmits]
  );

  const transmitIsLiked = userLikes.includes(userId);
  const transmitIsRetransmited = userRetransmits.includes(userId);

  const isStatsVisible = !!(totalReplies || totalTransmits || totalLikes);

  return (
    <>
      {viewTransmit && (
        <ViewTransmitStats
          likeMove={likeMove}
          userLikes={userLikes}
          transmitMove={transmitMove}
          replyMove={replyMove}
          userRetransmits={userRetransmits}
          currentLikes={currentLikes}
          currentTransmits={currentTransmits}
          currentReplies={currentReplies}
          isStatsVisible={isStatsVisible}
        />
      )}
      <div
        className={cn(
          'flex text-light-secondary inner:outline-none dark:text-dark-secondary',
          viewTransmit ? 'justify-around py-2' : 'max-w-md justify-between'
        )}
      >
        <TransmitOption
          className='hover:text-accent-blue focus-visible:text-accent-blue'
          iconClassName='group-hover:bg-accent-blue/10 group-active:bg-accent-blue/20 
                         group-focus-visible:bg-accent-blue/10 group-focus-visible:ring-accent-blue/80'
          tip='Reply'
          move={replyMove}
          stats={currentReplies}
          iconName='ChatBubbleOvalLeftIcon'
          viewTransmit={viewTransmit}
          onClick={openModal}
          disabled={reply}
        />
        <TransmitOption
          className={cn(
            'hover:text-accent-green focus-visible:text-accent-green',
            transmitIsRetransmited &&
              'text-accent-green [&>i>svg]:[stroke-width:2px]'
          )}
          iconClassName='group-hover:bg-accent-green/10 group-active:bg-accent-green/20
                         group-focus-visible:bg-accent-green/10 group-focus-visible:ring-accent-green/80'
          tip={transmitIsRetransmited ? 'Undo Retransmit' : 'Retransmit'}
          move={transmitMove}
          stats={currentTransmits}
          iconName='ArrowPathRoundedSquareIcon'
          viewTransmit={viewTransmit}
          onClick={manageRetransmit(
            transmitIsRetransmited ? 'unretransmit' : 'retransmit',
            userId,
            transmitId
          )}
        />
        <TransmitOption
          className={cn(
            'hover:text-accent-pink focus-visible:text-accent-pink',
            transmitIsLiked && 'text-accent-pink [&>i>svg]:fill-accent-pink'
          )}
          iconClassName='group-hover:bg-accent-pink/10 group-active:bg-accent-pink/20
                         group-focus-visible:bg-accent-pink/10 group-focus-visible:ring-accent-pink/80'
          tip={transmitIsLiked ? 'Unlike' : 'Like'}
          move={likeMove}
          stats={currentLikes}
          iconName='HeartIcon'
          viewTransmit={viewTransmit}
          onClick={manageLike(
            transmitIsLiked ? 'unlike' : 'like',
            userId,
            transmitId
          )}
        />
        <TransmitShare
          userId={userId}
          transmitId={transmitId}
          viewTransmit={viewTransmit}
        />
        {/* {isOwner && (
          <TransmitOption
            className='hover:text-accent-blue focus-visible:text-accent-blue'
            iconClassName='group-hover:bg-accent-blue/10 group-active:bg-accent-blue/20 
                           group-focus-visible:bg-accent-blue/10 group-focus-visible:ring-accent-blue/80'
            tip='Analytics'
            iconName='ChartPieIcon'
            disabled
          />
        )} */}
      </div>
    </>
  );
}
