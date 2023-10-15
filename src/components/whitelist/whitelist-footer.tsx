const footerLinks = [
  ['About', '/legal/about'],
  ['Privacy Policy', '/legal/privacy-policy'],
  ['Cookie Policy', '/legal/cookie-policy'],
  ['Terms of Service', '/legal/terms-of-service'],
  ['Open Source Licenses', '/legal/open-source-licenses']
] as const;

export function WhitelistFooter(): JSX.Element {
  return (
    <footer className='hidden justify-center p-4 text-sm text-light-secondary dark:text-dark-secondary lg:flex'>
      <nav className='flex flex-wrap justify-center gap-4 gap-y-2'>
        {footerLinks.map(([linkName, href]) => (
          <a
            className='custom-underline'
            target='_blank'
            rel='noreferrer'
            href={href}
            key={linkName}
          >
            {linkName}
          </a>
        ))}
        <p>© 2023 MostlyWhat Systems</p>
      </nav>
    </footer>
  );
}
