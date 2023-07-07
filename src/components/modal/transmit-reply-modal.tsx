import { Input } from '@components/input/input';
import { Transmit } from '@components/transmit/transmit';
import type { TransmitProps } from '@components/transmit/transmit';

type TransmitReplyModalProps = {
  transmit: TransmitProps;
  closeModal: () => void;
};

export function TransmitReplyModal({
  transmit,
  closeModal
}: TransmitReplyModalProps): JSX.Element {
  return (
    <Input
      modal
      replyModal
      parent={{ id: transmit.id, username: transmit.user.username }}
      closeModal={closeModal}
    >
      <Transmit modal parentTransmit {...transmit} />
    </Input>
  );
}
