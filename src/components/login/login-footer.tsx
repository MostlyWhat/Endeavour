const footerLinks = [
  ['About', 'https://about.twitter.com'],
  ['Privacy Policy', 'https://twitter.com/tos'],
  ['Cookie Policy', 'https://support.twitter.com/articles/20170514'],
  ['Terms of Service', 'https://twitter.com/privacy']
] as const;

export function LoginFooter(): JSX.Element {
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
        <p>© 2022 MostlyWhat Systems</p>
      </nav>
    </footer>
  );
}
