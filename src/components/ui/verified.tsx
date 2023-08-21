import { HeroIcon } from '@components/ui/hero-icon';

interface VerifiedBadgeProps {
  verifiedType: string;
  iconClass?: string;
}

export function VerifiedBadge({
  verifiedType,
  iconClass
}: VerifiedBadgeProps): JSX.Element {
  const verifiedTypes: Record<string, string> = {
    admin: 'fill-yellow-500',
    moderator: 'fill-red-500',
    developer: 'fill-blue-500',
    contributor: 'fill-green-500',
    supporter: 'fill-purple-500'
  };

  const fillColorClass: string =
    verifiedTypes[verifiedType] ?? 'fill-accent-blue';

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
