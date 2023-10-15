import cn from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { StatsEmpty } from '@components/transmit/stats-empty';
import { Loading } from '@components/ui/loading';
import { variants } from '@components/user/user-header';
import { UserCard } from './user-card';
import type { User } from '@lib/types/user';
import type { StatsType } from '@components/view/view-transmit-stats';
import type { StatsEmptyProps } from '@components/transmit/stats-empty';

type FollowType = 'following' | 'followers';

type CombinedTypes = StatsType | FollowType;

type UserCardsProps = {
  data: User[] | null;
  type: CombinedTypes;
  follow?: boolean;
  loading: boolean;
};

type NoStatsData = Record<CombinedTypes, StatsEmptyProps>;

const allNoStatsData: Readonly<NoStatsData> = {
  retransmits: {
    title: 'Amplify Transmits you like',
    imageData: { src: '/assets/no-retransmits.png', alt: 'No retransmits' },
    description:
      'Share other Exonaut’s Transmit on your timeline by Retransmiting it. When you do, it’ll show up here.'
  },
  likes: {
    title: 'No Transmit Likes yet',
    imageData: { src: '/assets/no-likes.png', alt: 'No likes' },
    description: 'When you like a Transmit, it’ll show up here.'
  },
  following: {
    title: 'Be in the know',
    imageData: { src: '/assets/no-followers.png', alt: 'No trackers' },
    description:
      'Tracking accounts is an easy way to curate your timeline and know what’s happening with the topics and Exonauts you’re interested in.'
  },
  followers: {
    title: 'Looking for trackers?',
    imageData: { src: '/assets/no-followers.png', alt: 'No trackers' },
    description:
      'When someone tracks this account, they’ll show up here. Transmiting and interacting with others helps boost trackers.'
  }
};

export function UserCards({
  data,
  type,
  follow,
  loading
}: UserCardsProps): JSX.Element {
  const noStatsData = allNoStatsData[type];
  const modal = ['retransmits', 'likes'].includes(type);

  return (
    <section
      className={cn(
        modal && 'h-full overflow-y-auto [&>div:first-child>a]:mt-[52px]',
        loading && 'flex items-center justify-center'
      )}
    >
      {loading ? (
        <Loading className={modal ? 'mt-[52px]' : 'mt-5'} />
      ) : (
        <AnimatePresence mode='popLayout'>
          {data?.length ? (
            data.map((userData) => (
              <motion.div layout='position' key={userData.id} {...variants}>
                <UserCard {...userData} follow={follow} modal={modal} />
              </motion.div>
            ))
          ) : (
            <StatsEmpty {...noStatsData} modal={modal} />
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
