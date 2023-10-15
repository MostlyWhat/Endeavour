import type { Theme, Accent } from './theme';
import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';

export type User = {
  id: string;
  bio: string | null;
  name: string;
  theme: Theme | null;
  accent: Accent | null;
  website: string | null;
  job: string | null;
  location: string | null;
  username: string;
  photoURL: string;
  whitelisted: boolean;
  verified: boolean;
  verifiedType: string | null;
  following: string[];
  followers: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp | null;
  totalTransmits: number;
  totalPhotos: number;
  pinnedTransmit: string | null;
  coverPhotoURL: string | null;
};

export type EditableData = Extract<
  keyof User,
  | 'bio'
  | 'name'
  | 'website'
  | 'photoURL'
  | 'job'
  | 'location'
  | 'coverPhotoURL'
  | 'username'
>;

export type EditableUserData = Pick<User, EditableData>;

export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user) {
    return { ...user };
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return { ...data } as User;
  }
};
