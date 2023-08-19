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
  const badgeColor = badgeTypes[verifiedType ?? ''] || 'blue';
  const badgeClass = iconClass ?? 'h-5 w-5';

  return (
    <i>
      <HeroIcon
        className={`fill-${badgeColor}-500 ${badgeClass}`} // Note the updated class name
        iconName='CheckBadgeIcon'
        solid
      />
    </i>
  );
}
