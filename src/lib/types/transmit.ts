import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';
import type { ImagesPreview } from './file';
import type { User } from './user';

export type Transmit = {
  id: string;
  text: string | null;
  images: ImagesPreview | null;
  parent: { id: string; username: string } | null;
  userLikes: string[];
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
  userReplies: number;
  userRetransmits: string[];
};

export type TransmitWithUser = Transmit & { user: User };

export const transmitConverter: FirestoreDataConverter<Transmit> = {
  toFirestore(transmit) {
    return { ...transmit };
  },
  fromFirestore(snapshot, options) {
    const { id } = snapshot;
    const data = snapshot.data(options);

    return { id, ...data } as Transmit;
  }
};
