import { Github, PanelsTopLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { demoPath, githubUrl, navItems, rootPath } from './siteConfig';
import type { SiteRoute } from './types';

export function SiteHeader({ activeRoute }: { activeRoute: SiteRoute }) {
  return (
    <header className='site-header'>
      <a className='brand' href={rootPath} aria-label='FrameBoard home'>
        <span className='brand-mark'><PanelsTopLeft size={17} /></span>
        <span>FrameBoard</span>
      </a>
      <nav aria-label='Primary navigation'>
        {navItems.map((item) => (
          <a className={item.route && activeRoute === item.route ? 'active' : ''} href={item.href} key={item.label}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className='header-actions'>
        <a className='header-action' href={`${rootPath}docs/`}>Get Started</a>
        <a className='icon-action' href={githubUrl} aria-label='GitHub'><Github size={17} /></a>
      </div>
    </header>
  );
}

export function SiteAppShell({ activeRoute, children }: { activeRoute: SiteRoute; children: ReactNode }) {
  return (
    <div className='site-app-shell'>
      <SiteHeader activeRoute={activeRoute} />
      {children}
      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className='site-footer'>
      <div>
        <a className='footer-brand' href={rootPath}>
          <span className='brand-mark'><PanelsTopLeft size={17} /></span>
          <span>FrameBoard</span>
        </a>
        <p>Review real app screens, fixture states, responsive layouts, themes, and app chrome from one product board.</p>
      </div>
      <nav aria-label='Footer navigation'>
        <section>
          <h3>Product</h3>
          <a href={demoPath}>Live example</a>
          <a href={`${rootPath}docs/`}>Developer docs</a>
          <a href={`${rootPath}docs/prompts/`}>Agent prompts</a>
        </section>
        <section>
          <h3>Guides</h3>
          <a href={`${rootPath}docs/react/`}>React</a>
          <a href={`${rootPath}docs/react-native/`}>React Native</a>
          <a href={`${rootPath}docs/expo/`}>Expo</a>
        </section>
        <section>
          <h3>Project</h3>
          <a href={`${rootPath}docs/library/`}>Docs library</a>
          <a href={githubUrl}>GitHub</a>
          <a href={`${githubUrl}/issues`}>Issues</a>
        </section>
      </nav>
    </footer>
  );
}
