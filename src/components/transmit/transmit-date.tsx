import Link from 'next/link';
import cn from 'clsx';
import { formatDate } from '@lib/date';
import { ToolTip } from '@components/ui/tooltip';
import type { Transmit } from '@lib/types/transmit';

type TransmitDateProps = Pick<Transmit, 'createdAt'> & {
  transmitLink: string;
  viewTransmit?: boolean;
};

export function TransmitDate({
  createdAt,
  transmitLink,
  viewTransmit
}: TransmitDateProps): JSX.Element {
  return (
    <div className={cn('flex gap-1', viewTransmit && 'py-4')}>
      {!viewTransmit && <i>·</i>}
      <div className='group relative'>
        <Link
          href={transmitLink}
          className={cn(
            'custom-underline peer whitespace-nowrap',
            viewTransmit && 'text-light-secondary dark:text-dark-secondary'
          )}
        >
          {formatDate(createdAt, viewTransmit ? 'full' : 'transmit')}
        </Link>
        <ToolTip
          className='translate-y-1 peer-focus:opacity-100 peer-focus-visible:visible
                     peer-focus-visible:delay-200'
          tip={formatDate(createdAt, 'full')}
        />
      </div>
    </div>
  );
}
