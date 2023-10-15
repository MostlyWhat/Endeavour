import cn from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { MotionProps } from 'framer-motion';

export const variants: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 }
};

type AsideMessageProps = {
  inMessagePage?: boolean;
};

export function AsideMessage({
  inMessagePage
}: AsideMessageProps): JSX.Element {
  return (
    <section
      className={cn(
        !inMessagePage &&
          'hover-animation rounded-2xl bg-main-sidebar-background'
      )}
    >
      <motion.div
        className={cn('inner:px-4 inner:py-3', inMessagePage && 'mt-0.5')}
        {...variants}
      >
        <h2 className='text-xl font-bold'>Announcement</h2>
        <p className='text-light-secondary dark:text-dark-primary'>
          Endeavour is under heavy development. Features are slowly being added
          and bugs are being fixed. Please be patient.
        </p>
        <Link
          href='/updates'
          className='custom-button accent-tab hover-card block w-full rounded-2xl
                       rounded-t-none text-center text-main-accent'
        >
          Read Updates
        </Link>
      </motion.div>
    </section>
  );
}
