import cn from 'clsx';
import Link from 'next/link';
import { VerifiedBadge } from '@components/ui/verified';

type UserNameProps = {
  tag?: keyof JSX.IntrinsicElements;
  name: string;
  verified: boolean;
  verifiedType?: string | null;
  username?: string;
  className?: string;
  iconClassName?: string;
};

export function UserName({
  tag,
  name,
  verified,
  verifiedType,
  username,
  className,
  iconClassName
}: UserNameProps): JSX.Element {
  const CustomTag = tag ? tag : 'p';

  return (
    <Link
      href={username ? `/user/${username}` : '#'}
      className={cn(
        'flex items-center gap-1 truncate font-bold',
        username ? 'custom-underline' : 'pointer-events-none',
        className
      )}
      tabIndex={username ? 0 : -1}
    >
      <CustomTag className='truncate'>{name}</CustomTag>
      {verified && (
        <VerifiedBadge
          verifiedType={verifiedType as string}
          iconClass={iconClassName}
        />
      )}
    </Link>
  );
}
