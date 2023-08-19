import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { delayScroll } from '@lib/utils';
import { Modal } from '@components/modal/modal';
import { TransmitReplyModal } from '@components/modal/transmit-reply-modal';
import { ImagePreview } from '@components/input/image-preview';
import { UserAvatar } from '@components/user/user-avatar';
import { UserTooltip } from '@components/user/user-tooltip';
import { UserName } from '@components/user/user-name';
import { UserUsername } from '@components/user/user-username';
import { TransmitActions } from './transmit-actions';
import { TransmitStatus } from './transmit-status';
import { TransmitStats } from './transmit-stats';
import { TransmitDate } from './transmit-date';
import type { Variants } from 'framer-motion';
import type { Transmit } from '@lib/types/transmit';
import type { User } from '@lib/types/user';

export type TransmitProps = Transmit & {
  user: User;
  modal?: boolean;
  pinned?: boolean;
  profile?: User | null;
  parentTransmit?: boolean;
};

export const variants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.8 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

export function Transmit(transmit: TransmitProps): JSX.Element {
  const {
    id: transmitId,
    text,
    modal,
    images,
    parent,
    pinned,
    profile,
    userLikes,
    createdBy,
    createdAt,
    parentTransmit,
    userReplies,
    userRetransmits,
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

  const { id: parentId, username: parentUsername = username } = parent ?? {};

  const {
    id: profileId,
    name: profileName,
    username: profileUsername
  } = profile ?? {};

  const reply = !!parent;
  const transmitIsRetransmited = userRetransmits.includes(profileId ?? '');

  return (
    <motion.article
      {...(!modal ? { ...variants, layout: 'position' } : {})}
      animate={{
        ...variants.animate,
        ...(parentTransmit && { transition: { duration: 0.2 } })
      }}
    >
      <Modal
        className='flex items-start justify-center'
        modalClassName='bg-main-background rounded-2xl max-w-xl w-full my-8 overflow-hidden'
        open={open}
        closeModal={closeModal}
      >
        <TransmitReplyModal transmit={transmit} closeModal={closeModal} />
      </Modal>
      <Link
        href={transmitLink}
        scroll={!reply}
        className={cn(
          `accent-tab hover-card relative flex flex-col 
           gap-y-4 px-4 py-3 outline-none duration-200`,
          parentTransmit
            ? 'mt-0.5 pb-0 pt-2.5'
            : 'border-b border-light-border dark:border-dark-border'
        )}
        onClick={delayScroll(200)}
      >
        <div className='grid grid-cols-[auto,1fr] gap-x-3 gap-y-1'>
          <AnimatePresence initial={false}>
            {modal ? null : pinned ? (
              <TransmitStatus type='pin'>
                <p className='text-sm font-bold'>Pinned Transmit</p>
              </TransmitStatus>
            ) : (
              transmitIsRetransmited && (
                <TransmitStatus type='transmit'>
                  <Link
                    href={profileUsername as string}
                    className='custom-underline truncate text-sm font-bold'
                  >
                    {userId === profileId ? 'You' : profileName} Retransmited
                  </Link>
                </TransmitStatus>
              )
            )}
          </AnimatePresence>
          <div className='flex flex-col items-center gap-2'>
            <UserTooltip avatar modal={modal} {...transmitUserData}>
              <UserAvatar src={photoURL} alt={name} username={username} />
            </UserTooltip>
            {parentTransmit && (
              <i className='hover-animation h-full w-0.5 bg-light-line-reply dark:bg-dark-line-reply' />
            )}
          </div>
          <div className='flex min-w-0 flex-col'>
            <div className='flex justify-between gap-2 text-light-secondary dark:text-dark-secondary'>
              <div className='flex gap-1 truncate xs:overflow-visible xs:whitespace-normal'>
                <UserTooltip modal={modal} {...transmitUserData}>
                  <UserName
                    name={name}
                    username={username}
                    verified={verified}
                    verifiedType={verifiedType}
                    className='text-light-primary dark:text-dark-primary'
                  />
                </UserTooltip>
                <UserTooltip modal={modal} {...transmitUserData}>
                  <UserUsername username={username} />
                </UserTooltip>
                <TransmitDate
                  transmitLink={transmitLink}
                  createdAt={createdAt}
                />
              </div>
              <div className='px-4'>
                {!modal && (
                  <TransmitActions
                    isOwner={isOwner}
                    ownerId={ownerId}
                    transmitId={transmitId}
                    parentId={parentId}
                    username={username}
                    hasImages={!!images}
                    createdBy={createdBy}
                  />
                )}
              </div>
            </div>
            {(reply || modal) && (
              <p
                className={cn(
                  'text-light-secondary dark:text-dark-secondary',
                  modal && 'order-1 my-2'
                )}
              >
                Replying to{' '}
                <Link
                  href={`/user/${parentUsername}`}
                  className='custom-underline text-main-accent'
                >
                  @{parentUsername}
                </Link>
              </p>
            )}
            {text && <p className='whitespace-pre-line break-words'>{text}</p>}
            <div className='mt-1 flex flex-col gap-2'>
              {images && (
                <ImagePreview
                  transmit
                  imagesPreview={images}
                  previewCount={images.length}
                />
              )}
              {!modal && (
                <TransmitStats
                  reply={reply}
                  userId={userId}
                  isOwner={isOwner}
                  transmitId={transmitId}
                  userLikes={userLikes}
                  userReplies={userReplies}
                  userRetransmits={userRetransmits}
                  openModal={!parent ? openModal : undefined}
                />
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
