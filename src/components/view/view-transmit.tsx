import Link from 'next/link';
import { motion } from 'framer-motion';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { TransmitReplyModal } from '@components/modal/transmit-reply-modal';
import { ImagePreview } from '@components/input/image-preview';
import { UserAvatar } from '@components/user/user-avatar';
import { UserTooltip } from '@components/user/user-tooltip';
import { UserName } from '@components/user/user-name';
import { UserUsername } from '@components/user/user-username';
import { variants } from '@components/transmit/transmit';
import { TransmitActions } from '@components/transmit/transmit-actions';
import { TransmitStats } from '@components/transmit/transmit-stats';
import { TransmitDate } from '@components/transmit/transmit-date';
import { Input } from '@components/input/input';
import type { RefObject } from 'react';
import type { User } from '@lib/types/user';
import type { Transmit } from '@lib/types/transmit';

type ViewTransmitProps = Transmit & {
  user: User;
  viewTransmitRef?: RefObject<HTMLElement>;
};

export function ViewTransmit(transmit: ViewTransmitProps): JSX.Element {
  const {
    id: transmitId,
    text,
    images,
    parent,
    userLikes,
    createdBy,
    createdAt,
    userRetransmits,
    userReplies,
    viewTransmitRef,
    user: transmitUserData
  } = transmit;

  const {
    id: ownerId,
    name,
    username,
    verified,
    verifiedType,
    photoURL
  } = transmitUserData;

  const { user } = useAuth();

  const { open, openModal, closeModal } = useModal();

  const transmitLink = `/transmit/${transmitId}`;

  const userId = user?.id as string;

  const isOwner = userId === createdBy;

  const reply = !!parent;

  const { id: parentId, username: parentUsername = username } = parent ?? {};

  return (
    <motion.article
      className={cn(
        `accent-tab h- relative flex cursor-default flex-col gap-3 border-b
         border-light-border px-4 py-3 outline-none dark:border-dark-border`,
        reply && 'scroll-m-[3.25rem] pt-0'
      )}
      {...variants}
      animate={{ ...variants.animate, transition: { duration: 0.2 } }}
      exit={undefined}
      ref={viewTransmitRef}
    >
      <Modal
        className='flex items-start justify-center'
        modalClassName='bg-main-background rounded-2xl max-w-xl w-full mt-8 overflow-hidden'
        open={open}
        closeModal={closeModal}
      >
        <TransmitReplyModal transmit={transmit} closeModal={closeModal} />
      </Modal>
      <div className='flex flex-col gap-2'>
        {reply && (
          <div className='flex w-12 items-center justify-center'>
            <i className='hover-animation h-2 w-0.5 bg-light-line-reply dark:bg-dark-line-reply' />
          </div>
        )}
        <div className='grid grid-cols-[auto,1fr] gap-3'>
          <UserTooltip avatar {...transmitUserData}>
            <UserAvatar src={photoURL} alt={name} username={username} />
          </UserTooltip>
          <div className='flex min-w-0 justify-between'>
            <div className='flex flex-col truncate xs:overflow-visible xs:whitespace-normal'>
              <UserTooltip {...transmitUserData}>
                <UserName
                  className='-mb-1'
                  name={name}
                  username={username}
                  verified={verified}
                  verifiedType={verifiedType}
                />
              </UserTooltip>
              <UserTooltip {...transmitUserData}>
                <UserUsername username={username} />
              </UserTooltip>
            </div>
            <div className='px-4'>
              <TransmitActions
                viewTransmit
                isOwner={isOwner}
                ownerId={ownerId}
                transmitId={transmitId}
                parentId={parentId}
                username={username}
                hasImages={!!images}
                createdBy={createdBy}
              />
            </div>
          </div>
        </div>
      </div>
      {reply && (
        <p className='text-light-secondary dark:text-dark-secondary'>
          Replying to{' '}
          <Link
            href={`/exonaut/${parentUsername}`}
            className='custom-underline text-main-accent'
          >
            @{parentUsername}
          </Link>
        </p>
      )}
      <div>
        {text && (
          <p className='whitespace-pre-line break-words text-2xl'>{text}</p>
        )}
        {images && (
          <ImagePreview
            viewTransmit
            imagesPreview={images}
            previewCount={images.length}
          />
        )}
        <div
          className='inner:hover-animation inner:border-b inner:border-light-border
                     dark:inner:border-dark-border'
        >
          <TransmitDate
            viewTransmit
            transmitLink={transmitLink}
            createdAt={createdAt}
          />
          <TransmitStats
            viewTransmit
            reply={reply}
            userId={userId}
            isOwner={isOwner}
            transmitId={transmitId}
            userLikes={userLikes}
            userRetransmits={userRetransmits}
            userReplies={userReplies}
            openModal={openModal}
          />
        </div>
        <Input reply parent={{ id: transmitId, username: username }} />
      </div>
    </motion.article>
  );
}
