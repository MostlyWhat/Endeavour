import { Input } from '@components/input/input';
import { Transmit } from '@components/tweet/tweet';
import type { TransmitProps } from '@components/tweet/tweet';

type TransmitReplyModalProps = {
  tweet: TransmitProps;
  closeModal: () => void;
};

export function TransmitReplyModal({
  tweet,
  closeModal
}: TransmitReplyModalProps): JSX.Element {
  return (
    <Input
      modal
      replyModal
      parent={{ id: tweet.id, username: tweet.user.username }}
      closeModal={closeModal}
    >
      <Transmit modal parentTransmit {...tweet} />
    </Input>
  );
}
