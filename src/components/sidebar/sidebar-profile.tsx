import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from '@headlessui/react';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { UserAvatar } from '@components/user/user-avatar';
import { UserName } from '@components/user/user-name';
import { UserUsername } from '@components/user/user-username';
import { variants } from './more-settings';
import type { User } from '@lib/types/user';

export function SidebarProfile(): JSX.Element {
  const { user, signOut } = useAuth();
  const { open, openModal, closeModal } = useModal();

  const { name, username, verified, verifiedType, photoURL } = user as User;

  return (
    <>
      <Modal
        modalClassName='max-w-xs bg-main-background w-full p-8 rounded-2xl'
        open={open}
        closeModal={closeModal}
      >
        <ActionModal
          useIcon
          focusOnMainBtn
          title='Log out of Endeavour?'
          description='You can always log back in at any time.'
          mainBtnLabel='Log out'
          action={signOut}
          closeModal={closeModal}
        />
      </Modal>
      <Menu className='relative' as='section'>
        {({ open }): JSX.Element => (
          <>
            <Menu.Button
              className={cn(
                `custom-button main-tab dark-bg-tab flex w-full items-center 
                 justify-between hover:bg-light-primary/10 active:bg-light-primary/20
                 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20`,
                open && 'bg-light-primary/10 dark:bg-dark-primary/10'
              )}
            >
              <div className='flex gap-3 truncate'>
                <UserAvatar src={photoURL} alt={name} size={40} />
                <div className='hidden truncate text-start leading-5 xl:block'>
                  <UserName
                    name={name}
                    className='start'
                    verified={verified}
                    verifiedType={verifiedType}
                  />
                  <UserUsername username={username} disableLink />
                </div>
              </div>
              <HeroIcon
                className='hidden h-6 w-6 xl:block'
                iconName='EllipsisHorizontalIcon'
              />
            </Menu.Button>
            <AnimatePresence>
              {open && (
                <Menu.Items
                  className='menu-container absolute -top-48 left-0 right-0 w-60 xl:w-full'
                  as={motion.div}
                  {...variants}
                  static
                >
                  <Menu.Item
                    className='flex items-center justify-between gap-4 border-b 
                               border-light-border px-4 py-3 dark:border-dark-border'
                    as='div'
                    disabled
                  >
                    <div className='flex items-center gap-3 truncate'>
                      <UserAvatar src={photoURL} alt={name} />
                      <div className='truncate'>
                        <UserName
                          name={name}
                          verified={verified}
                          verifiedType={verifiedType}
                        />
                        <UserUsername username={username} disableLink />
                      </div>
                    </div>
                    <i>
                      <HeroIcon
                        className='h-5 w-5 text-main-accent'
                        iconName='CheckIcon'
                      />
                    </i>
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <Button
                        className={cn(
                          'flex w-full gap-3 rounded-md rounded-t-none border-b border-light-border p-4 px-4 py-3 dark:border-dark-border',
                          active && 'bg-main-sidebar-background'
                        )}
                        onClick={openModal}
                      >
                        <HeroIcon iconName='Cog8ToothIcon' />
                        Settings
                      </Button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <Button
                        className={cn(
                          'flex w-full gap-3 rounded-md rounded-t-none p-4',
                          active && 'bg-main-sidebar-background'
                        )}
                        onClick={openModal}
                      >
                        <HeroIcon iconName='ArrowRightOnRectangleIcon' />
                        Log out @{username}
                      </Button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </>
  );
}
