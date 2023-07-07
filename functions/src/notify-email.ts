import { createTransport } from 'nodemailer';
import { firestore, functions, regionalFunctions } from './lib/utils';
import { EMAIL_API, EMAIL_API_PASSWORD, TARGET_EMAIL } from './lib/env';
import type { Transmit, User } from './types';

export const notifyEmail = regionalFunctions.firestore
  .document('transmits/{transmitId}')
  .onCreate(async (snapshot): Promise<void> => {
    functions.logger.info('Sending notification email.');

    const { text, createdBy, images, parent } = snapshot.data() as Transmit;

    const imagesLength = images?.length ?? 0;

    const { name, username } = (
      await firestore().doc(`users/${createdBy}`).get()
    ).data() as User;

    const client = createTransport({
      service: 'Gmail',
      auth: {
        user: EMAIL_API.value(),
        pass: EMAIL_API_PASSWORD.value()
      }
    });

    const transmitLink = `https://twitter-clone-ccrsxx.vercel.app/transmit/${snapshot.id}`;

    const emailHeader = `New Transmit${
      parent ? ' reply' : ''
    } from ${name} (@${username})`;

    const emailText = `${text ?? 'No text provided'}${
      images ? ` (${imagesLength} image${imagesLength > 1 ? 's' : ''})` : ''
    }\n\nLink to Transmit: ${transmitLink}\n\n- Firebase Function.`;

    await client.sendMail({
      from: EMAIL_API.value(),
      to: TARGET_EMAIL.value(),
      subject: emailHeader,
      text: emailText
    });

    functions.logger.info('Notification email sent.');
  });
