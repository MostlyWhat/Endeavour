/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useMemo } from 'react';
import cn from 'clsx';
import { manageRetransmit, manageLike } from '@lib/firebase/utils';
import { ViewTransmitStats } from '@components/view/view-tweet-stats';
import { TransmitOption } from './tweet-option';
import { TransmitShare } from './tweet-share';
import type { Transmit } from '@lib/types/tweet';

type TransmitStatsProps = Pick<
  Transmit,
  'userLikes' | 'userRetransmits' | 'userReplies'
> & {
  reply?: boolean;
  userId: string;
  isOwner: boolean;
  tweetId: string;
  viewTransmit?: boolean;
  openModal?: () => void;
};

export function TransmitStats({
  reply,
  userId,
  isOwner,
  tweetId,
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

  const tweetMove = useMemo(
    () => (totalTransmits > currentTransmits ? -25 : 25),
    [totalTransmits]
  );

  const tweetIsLiked = userLikes.includes(userId);
  const tweetIsRetransmited = userRetransmits.includes(userId);

  const isStatsVisible = !!(totalReplies || totalTransmits || totalLikes);

  return (
    <>
      {viewTransmit && (
        <ViewTransmitStats
          likeMove={likeMove}
          userLikes={userLikes}
          tweetMove={tweetMove}
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
            tweetIsRetransmited &&
              'text-accent-green [&>i>svg]:[stroke-width:2px]'
          )}
          iconClassName='group-hover:bg-accent-green/10 group-active:bg-accent-green/20
                         group-focus-visible:bg-accent-green/10 group-focus-visible:ring-accent-green/80'
          tip={tweetIsRetransmited ? 'Undo Retransmit' : 'Retransmit'}
          move={tweetMove}
          stats={currentTransmits}
          iconName='ArrowPathRoundedSquareIcon'
          viewTransmit={viewTransmit}
          onClick={manageRetransmit(
            tweetIsRetransmited ? 'unretransmit' : 'retransmit',
            userId,
            tweetId
          )}
        />
        <TransmitOption
          className={cn(
            'hover:text-accent-pink focus-visible:text-accent-pink',
            tweetIsLiked && 'text-accent-pink [&>i>svg]:fill-accent-pink'
          )}
          iconClassName='group-hover:bg-accent-pink/10 group-active:bg-accent-pink/20
                         group-focus-visible:bg-accent-pink/10 group-focus-visible:ring-accent-pink/80'
          tip={tweetIsLiked ? 'Unlike' : 'Like'}
          move={likeMove}
          stats={currentLikes}
          iconName='HeartIcon'
          viewTransmit={viewTransmit}
          onClick={manageLike(
            tweetIsLiked ? 'unlike' : 'like',
            userId,
            tweetId
          )}
        />
        <TransmitShare
          userId={userId}
          tweetId={tweetId}
          viewTransmit={viewTransmit}
        />
        {isOwner && (
          <TransmitOption
            className='hover:text-accent-blue focus-visible:text-accent-blue'
            iconClassName='group-hover:bg-accent-blue/10 group-active:bg-accent-blue/20 
                           group-focus-visible:bg-accent-blue/10 group-focus-visible:ring-accent-blue/80'
            tip='Analytics'
            iconName='ChartPieIcon'
            disabled
          />
        )}
      </div>
    </>
  );
}
