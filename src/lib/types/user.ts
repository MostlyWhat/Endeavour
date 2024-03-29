import type { Theme, Accent } from './theme';
import type { Timestamp, FirestoreDataConverter } from 'firebase/firestore';

export type User = {
  id: string;
  bio: string | null;
  name: string;
  theme: Theme | null;
  accent: Accent | null;
  website: string | null;
  location: string | null;
  username: string;
  email: string;
  password: string;
  photoURL: string;
  verified: boolean;
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
  | 'location'
  | 'coverPhotoURL'
  | 'email'
  | 'username'
  | 'password'
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
