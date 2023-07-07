import type {
  Timestamp,
  FirestoreDataConverter
} from 'firebase-admin/firestore';

export type ImageData = {
  src: string;
  alt: string;
};

export type ImagesPreview = (ImageData & {
  id: number;
})[];

export type Transmit = {
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

export const transmitConverter: FirestoreDataConverter<Transmit> = {
  toFirestore(transmit) {
    return { ...transmit };
  },
  fromFirestore(snapshot) {
    const data = snapshot.data();

    return { ...data } as Transmit;
  }
};
