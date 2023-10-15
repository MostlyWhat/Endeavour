import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from '@headlessui/react';
import { HeroIcon } from '@components/ui/hero-icon';
import { Button } from '@components/ui/button';
import type { Variants } from 'framer-motion';

export const variants: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', duration: 0.4 }
  },
  exit: { opacity: 0, y: 50, transition: { duration: 0.2 } }
};

interface VerifiedBadgeProps {
  verifiedType?: string;
  iconClass?: string;
  showExplain?: boolean;
}

export function VerifiedBadge({
  verifiedType,
  iconClass,
  showExplain
}: VerifiedBadgeProps): JSX.Element {
  const hrefVerification = (): void => {
    window.open(
      'https://endeavour.mostlywhat.com/help-center/verification',
      '_blank'
    );
  };

  const verifiedTypes: Record<string, string> = {
    admin: 'fill-yellow-500',
    moderator: 'fill-red-500',
    developer: 'fill-blue-500',
    contributor: 'fill-green-500',
    supporter: 'fill-purple-500'
  };

  const verifiedTypesFull: Record<string, string> = {
    admin: 'Administrator',
    moderator: 'Moderator',
    developer: 'Developer',
    contributor: 'Contributor',
    supporter: 'Supporter'
  };

  const verifiedTypesExplain: Record<string, string> = {
    admin: 'This Exonaut is verified because they are an administrator.',
    moderator: 'This Exonaut is verified because they are a moderator.',
    developer: 'This Exonaut is verified because they are a developer.',
    contributor: 'This Exonaut is verified because they are a contributor.',
    supporter: 'This Exonaut is verified because they are a supporter.'
  };

  const fillColorClass: string =
    verifiedTypes[verifiedType ?? 'trusted'] ?? 'fill-accent-blue';

  const verifiedTypeText = verifiedType
    ? verifiedTypesFull[verifiedType]
    : '& Trusted';

  const verifiedTypeExplainText = verifiedType
    ? verifiedTypesExplain[verifiedType]
    : 'This Exonaut is verified because they are trusted.';

  if (showExplain)
    return (
      <Menu>
        {({ open }): JSX.Element => (
          <>
            <Menu.Button>
              <i>
                <HeroIcon
                  className={`${fillColorClass} ${iconClass ?? 'h-5 w-5'}`}
                  iconName='CheckBadgeIcon'
                  solid
                />
              </i>
            </Menu.Button>
            <AnimatePresence>
              {open && (
                <Menu.Items
                  className='menu-container absolute w-80 font-medium'
                  as={motion.div}
                  {...variants}
                  static
                >
                  <Menu.Item>
                    <div
                      className={
                        'flex w-full gap-3 rounded-none rounded-b-md p-4 duration-200'
                      }
                    >
                      <div>
                        <h2 className='mx-2 pb-2 text-2xl font-bold'>
                          Verified Exonaut
                        </h2>
                        <div className='flex items-center'>
                          <HeroIcon
                            className={`${fillColorClass} ${
                              iconClass ?? 'h-5 w-5'
                            }`}
                            iconName='CheckBadgeIcon'
                            solid
                          />
                          <p className='mt-[2px] ml-1 font-medium'>
                            Verified {verifiedTypeText}
                          </p>
                        </div>
                        <div className='mx-2 mt-2'>
                          <p className='font-normal'>
                            {verifiedTypeExplainText}
                          </p>
                        </div>
                        <div className='mt-4 mb-2'>
                          <Button
                            className='flex w-full justify-center border border-light-line-reply py-2 font-bold
                                       text-light-primary transition hover:bg-[#e6e6e6] focus-visible:bg-[#e6e6e6] active:bg-[#cccccc]
                                       dark:border-0 dark:bg-white dark:hover:brightness-90 dark:focus-visible:brightness-90 dark:active:brightness-75'
                            onClick={hrefVerification}
                          >
                            Learn More about Verification
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Menu.Item>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    );
  else
    return (
      <i>
        <HeroIcon
          className={`${fillColorClass} ${iconClass ?? 'h-5 w-5'}`}
          iconName='CheckBadgeIcon'
          solid
        />
      </i>
    );
}
