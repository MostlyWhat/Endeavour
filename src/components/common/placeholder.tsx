import { CustomIcon } from '@components/ui/custom-icon';
import { SEO } from './seo';

export function Placeholder(): JSX.Element {
  return (
    <main className='flex min-h-screen items-center justify-center'>
      <SEO
        title='Endeavour'
        description='From Earth to the Stars, Explore the Boundless Frontiers of the Universe.'
        image='/home.png'
      />
      <div className=''>
        <i>
          <CustomIcon
            className='h-20 w-20 text-[#1DA1F2]'
            iconName='EndeavourIcon'
          />
        </i>
      </div>
      {/* <div className='grid grid-rows-3 place-content-center items-center justify-center gap-2 text-center'>
        <i>
          <CustomIcon
            className='h-20 w-20 text-[#1DA1F2]'
            iconName='EndeavourIcon'
          />
        </i>
        <p className='text-4xl font-bold'>Endeavour</p>
        <p className='text-2xl'>
          Build Version: <span className='font-bold'>ALPHA</span>
        </p>
      </div> */}
    </main>
  );
}
