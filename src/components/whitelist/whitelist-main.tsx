import { useRouter } from 'next/router';
import { useAuth } from '@lib/context/auth-context';
import { NextImage } from '@components/ui/next-image';
import { CustomIcon } from '@components/ui/custom-icon';
import { Button } from '@components/ui/button';

export function WhitelistMain(): JSX.Element {
  const { signOut } = useAuth();
  const { replace } = useRouter();

  const signOutProcess = async (): Promise<void> => {
    await signOut();
    void replace('/');
  };

  return (
    <main className='grid lg:grid-cols-[1fr,45vw]'>
      <div className='relative hidden items-center justify-center  lg:flex'>
        <NextImage
          imgClassName='object-cover'
          blurClassName='bg-accent-blue'
          src='/assets/banner.png'
          alt='Endeavour banner'
          layout='fill'
          useSkeleton
        />
        <i className='absolute'>
          <CustomIcon
            className='h-96 w-96 text-white'
            iconName='EndeavourIcon'
          />
        </i>
      </div>
      <div className='flex flex-col items-center justify-between gap-6 p-8 lg:items-start lg:justify-center'>
        <i className='mb-0 self-center lg:mb-10 lg:self-auto'>
          <CustomIcon
            className='-mt-4 h-6 w-6 text-accent-blue lg:h-12 lg:w-12 dark:lg:text-twitter-icon'
            iconName='EndeavourIcon'
          />
        </i>
        <div className='flex max-w-xs flex-col gap-4 font-twitter-chirp-extended lg:max-w-none lg:gap-16'>
          <h1 className='text-3xl before:content-["Occasional_Rapid_Unscheduled_Disassembly"] lg:text-6xl lg:before:content-["Occasional_Rapid_Unscheduled_Disassembly"]' />
          {/* <h2 className='hidden text-xl lg:block lg:text-3xl'>
            We&apos;re almost ready to launch!
          </h2> */}
          <p className='text-md lg:text-base'>
            We&apos;re currently in closed alpha. You&apos;ve already been added
            to the list and will be notified when we&apos;re ready to launch.
          </p>
        </div>
        <div className='flex max-w-xs flex-col gap-6 [&_button]:py-2'>
          <div className='grid gap-3 font-bold'>
            <Button
              className='bg-accent-blue text-white transition hover:brightness-90
                         focus-visible:!ring-accent-blue/80 focus-visible:brightness-90 active:brightness-75'
              onClick={signOutProcess}
            >
              Log Out
            </Button>
            <p
              className='inner:custom-underline inner:custom-underline text-center text-xs
                         text-light-secondary inner:text-accent-blue dark:text-dark-secondary'
            >
              If you already have an account, please sign out and then sign in
              again to the correct account.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
