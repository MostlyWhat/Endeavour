import Error from 'next/error';
import { useTheme } from '@lib/context/theme-context';
import { HomeLayout, ProtectedLayout } from '@components/layout/common-layout';
import { MainLayout } from '@components/layout/main-layout';
import { SEO } from '@components/common/seo';
import { MainHeader } from '@components/home/main-header';
import { MainContainer } from '@components/home/main-container';
import { Button } from '@components/ui/button';
import { ToolTip } from '@components/ui/tooltip';
import { HeroIcon } from '@components/ui/hero-icon';

export default function NotFound(): JSX.Element {
  const { theme } = useTheme();

  const isDarkMode = ['dim', 'dark'].includes(theme);

  return (
    <ProtectedLayout>
      <MainLayout>
        <HomeLayout>
          <MainContainer>
            <SEO
              title='404 / Endeavour'
              description='Sorry we couldn’t find the page you were looking for.'
            />
            <MainHeader className='flex items-center justify-between'>
              <div className='-mb-1 flex flex-col'>
                <h2 className='-mt-1 text-xl font-bold'>404 Not Found</h2>
              </div>
              <Button
                className='dark-bg-tab group relative p-2 hover:bg-light-primary/10
                     active:bg-light-primary/20 dark:hover:bg-dark-primary/10 
                     dark:active:bg-dark-primary/20'
                // onClick={openModal}
              >
                <HeroIcon className='h-5 w-5' iconName='MegaphoneIcon' />
                <ToolTip
                  className='!-translate-x-20 translate-y-3 md:-translate-x-1/2'
                  tip='Report Issues'
                />
              </Button>
            </MainHeader>
            <section className='mt-0.5'>
              <Error statusCode={404} withDarkMode={isDarkMode} />
            </section>
          </MainContainer>
        </HomeLayout>
      </MainLayout>
    </ProtectedLayout>
  );
}
