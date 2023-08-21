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
  showExplain?: boolean;
};

export function UserName({
  tag,
  name,
  verified,
  verifiedType,
  username,
  className,
  iconClassName,
  showExplain
}: UserNameProps): JSX.Element {
  const CustomTag = tag ? tag : 'p';

  return (
    <>
      <div className='flow-root items-center gap-1'>
        <Link
          href={username ? `/exonaut/${username}` : '/toilet-paper'}
          className={cn(
            'float-left truncate font-bold',
            username ? 'custom-underline' : 'pointer-events-none',
            className
          )}
          tabIndex={username ? 0 : -1}
        >
          <CustomTag className='truncate'>{name}</CustomTag>
        </Link>
        {verified && (
          <VerifiedBadge
            verifiedType={verifiedType as string}
            iconClass={cn(iconClassName, 'float-left mt-[2px] ml-1')}
            showExplain={showExplain}
          />
        )}
      </div>
    </>
  );
}
