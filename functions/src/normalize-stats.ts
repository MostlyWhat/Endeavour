import { functions, firestore, regionalFunctions } from './lib/utils';
import { transmitConverter, bookmarkConverter } from './types';
import type { Transmit } from './types';

export const normalizeStats = regionalFunctions.firestore
  .document('transmits/{transmitId}')
  .onDelete(async (snapshot): Promise<void> => {
    const transmitId = snapshot.id;
    const transmitData = snapshot.data() as Transmit;

    functions.logger.info(`Normalizing stats from transmit ${transmitId}`);

    const { userRetransmits, userLikes } = transmitData;

    const usersStatsToDelete = new Set([...userRetransmits, ...userLikes]);

    const batch = firestore().batch();

    usersStatsToDelete.forEach((userId) => {
      functions.logger.info(`Deleting stats from ${userId}`);

      const userStatsRef = firestore()
        .doc(`users/${userId}/stats/stats`)
        .withConverter(transmitConverter);

      batch.update(userStatsRef, {
        transmits: firestore.FieldValue.arrayRemove(transmitId),
        likes: firestore.FieldValue.arrayRemove(transmitId)
      });
    });

    const bookmarksQuery = firestore()
      .collectionGroup('bookmarks')
      .where('id', '==', transmitId)
      .withConverter(bookmarkConverter);

    const docsSnap = await bookmarksQuery.get();

    functions.logger.info(`Deleting ${docsSnap.size} bookmarks`);

    docsSnap.docs.forEach(({ id, ref }) => {
      functions.logger.info(`Deleting bookmark ${id}`);
      batch.delete(ref);
    });

    await batch.commit();

    functions.logger.info(
      `Normalizing stats for transmit ${transmitId} is done`
    );
  });
