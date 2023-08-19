import cn from 'clsx';

import { HeroIcon } from '@components/ui/hero-icon';

interface VerifiedBadgeProps {
  verifiedType: keyof typeof badgeTypes | null;
  iconClass?: string;
}

interface BadgeType {
  [key: string]: string;
}

const badgeTypes: BadgeType = {
  admin: 'yellow',
  moderator: 'green',
  staff: 'purple',
  partner: 'pink',
  bot: 'red'
};

export function VerifiedBadge({
  verifiedType,
  iconClass
}: VerifiedBadgeProps): JSX.Element {
  const fillClass = cn(
    `fill-${badgeTypes[verifiedType as keyof typeof badgeTypes] || 'blue'}-500`
  );

  const badgeClass = cn(fillClass, iconClass ?? 'h-5 w-5');

  return (
    <i>
      <HeroIcon className={badgeClass} iconName='CheckBadgeIcon' solid />
    </i>
  );
}
