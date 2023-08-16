import { useRef } from 'react';
import cn from 'clsx';
import { Button } from '@components/ui/button';
import { CustomIcon } from '@components/ui/custom-icon';
import { NextImage } from '@components/ui/next-image';

type GifModalProps = {
  closeModal: () => void;
  onSelectGif: (gifUrl: string) => void;
};

export function GifModal({
  closeModal,
  onSelectGif
}: GifModalProps): JSX.Element {
  // For simplicity, we'll use a sample GIF URL here.
  const sampleGifUrl =
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2ZmeGN4OXdodDcxMzNldHRzbDY1ODcweDVqM243OTV3aHRrcGt5ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tsBu4h4VjHSeci6w0l/giphy.gif';
  const gifUrl = useRef<string | null>(null);

  // Handle GIF selection and close the modal
  const handleGifSelection = () => {
    onSelectGif(sampleGifUrl);
    closeModal();
  };

  const gifContainerRef = useRef<HTMLInputElement>(null);

  const handleGifClick = () => {
    gifContainerRef.current?.click();
  };

  return (
    <>
      <div className='absolute flex w-full items-center gap-6 rounded-tl-2xl'>
        <h2 className='text-2xl font-bold'>Select a GIF</h2>
        <Button
          className='dark-bg-tab group relative p-2 hover:bg-light-primary/10 active:bg-light-primary/20 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/10'
          onClick={closeModal}
        >
          <CustomIcon className='h-5 w-5' iconName={'XMarkIcon'} />
        </Button>
      </div>
      <section className='h-full overflow-y-auto transition-opacity'>
        <div className='flex flex-col items-center gap-6'>
          <div className='flex flex-col gap-3 text-center'>
            <p className='text-light-secondary dark:text-dark-secondary'>
              Choose a GIF to include in your transmit.
            </p>
          </div>
          <div className='w-full'>
            {/* Display sample GIF */}
            <div
              className={cn(
                'bg-image-preview/75 group relative h-32 w-32 overflow-hidden rounded-lg',
                {
                  'cursor-pointer': !gifUrl
                }
              )}
              onClick={handleGifClick}
            >
              <NextImage
                useSkeleton
                className='h-full w-full object-cover transition duration-200 group-focus-within:brightness-75 group-hover:brightness-75'
                src={sampleGifUrl}
                alt='Sample GIF'
                layout='fill'
              />
              <Button
                className={cn(
                  'group/inner absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-image-preview-hover/50 p-2 focus-visible:bg-image-preview-hover/50',
                  {
                    hidden: !!gifUrl
                  }
                )}
                onClick={handleGifClick}
              >
                <CustomIcon
                  className='hover-animation h-6 w-6 text-dark-primary group-hover:text-white'
                  iconName='AppleIcon'
                />
              </Button>
              {gifUrl && (
                <Button
                  className='group/inner absolute right-2 top-2 bg-image-preview-hover/50 p-2 focus-visible:bg-image-preview-hover/50'
                  // onClick={removeGif}
                >
                  <CustomIcon
                    className='hover-animation h-6 w-6 text-dark-primary group-hover:text-white'
                    iconName='XMarkIcon'
                  />
                </Button>
              )}
            </div>
            <input
              className='hidden'
              type='file'
              accept='image/*'
              ref={gifContainerRef}
              onChange={handleGifSelection}
            />
          </div>
          {/* Button to select the GIF */}
          <Button
            className='bg-light-primary px-4 py-1 font-bold text-white focus-visible:bg-light-primary/90 enabled:hover:bg-light-primary/90 enabled:active:bg-light-primary/80 disabled:brightness-75 dark:bg-light-border dark:text-light-primary dark:focus-visible:bg-light-border/90 dark:enabled:hover:bg-light-border/90 dark:enabled:active:bg-light-border/75'
            onClick={handleGifSelection}
          >
            <CustomIcon
              className='h-6 w-6 text-light-primary dark:text-dark-primary'
              iconName='GitHubIcon'
            />
            <span>Select GIF</span>
          </Button>
        </div>
      </section>
    </>
  );
}
