import { motion } from 'framer-motion';
import cn from 'clsx';
import { variants } from '@components/user/user-header';
import { UserNavLink } from './user-nav-link';

type UserNavProps = {
  follow?: boolean;
};

const allNavs = [
  [
    { name: 'Transmits', path: '' },
    { name: 'Transmits & replies', path: 'with_replies' },
    { name: 'Media', path: 'media' },
    { name: 'Likes', path: 'likes' }
  ],
  [
    { name: 'Tracking', path: 'tracking' },
    { name: 'Trackers', path: 'trackers' }
  ]
] as const;

export function UserNav({ follow }: UserNavProps): JSX.Element {
  const userNav = allNavs[+!!follow];

  return (
    <motion.nav
      className={cn(
        `hover-animation flex justify-between overflow-y-auto
         border-b border-light-border dark:border-dark-border`,
        follow && 'mb-0.5 mt-1'
      )}
      {...variants}
      exit={undefined}
    >
      {userNav.map(({ name, path }) => (
        <UserNavLink name={name} path={path} key={name} />
      ))}
    </motion.nav>
  );
}
