import cn from 'clsx';
import { motion } from 'framer-motion';
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
      </motion.div>
    </section>
  );
}
