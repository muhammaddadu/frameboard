import {
  BookOpen,
  Boxes,
  Clipboard,
  FileText,
  Library,
  MonitorSmartphone,
  PackagePlus,
  PanelsTopLeft,
  Route,
  Sparkles,
  Terminal,
} from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';
import { demoPath, docsNavItems, githubUrl, heroImageUrl, rootPath } from './siteConfig';
import {
  docsFiles,
  docsSections,
  gettingStartedSteps,
  nativeGuide,
  promptCards,
  reactGuide,
  valueCards,
  workflowSteps,
} from './siteData';
import { routeFromPathname } from './routing';
import type { SiteRoute, SiteScreenProps } from './types';

function Hero() {
  return (
    <section className='hero-section'>
      <div className='hero-media' style={{ '--hero-image': `url(${heroImageUrl})` } as CSSProperties}>
        <div className='hero-copy'>
          <p className='signal'>For vibe coders, UX designers, and FE engineers</p>
          <h1>See every screen and <span>state</span> of your app in <span>one place.</span></h1>
          <p>
            Built for developers, designers, and product teams making cross-collaboration easier.
            Review every screen, state, and responsive layout without clicking through the app.
          </p>
          <div className='hero-actions'>
            <a className='button primary' href={demoPath}>Open the live board</a>
            <a className='button secondary' href={`${rootPath}docs/`}>Read developer docs</a>
          </div>
        </div>
        <div className='hero-snapshot product-mock' aria-label='FrameBoard product preview'>
          <div className='mock-topbar'>
            <span className='mock-logo'><PanelsTopLeft size={15} /> FrameBoard</span>
            <div>
              <button type='button'>Product Board</button>
              <button type='button'>Focus View</button>
            </div>
            <small>50%</small>
          </div>
          <div className='mock-body'>
            <aside className='mock-sidebar'>
              <strong>Screens</strong>
              {['Onboarding', 'Home', 'Dashboard', 'Profile', 'Settings', 'Empty States'].map((item, index) => (
                <span className={index === 0 ? 'active' : ''} key={item}>
                  {item}
                  <small>{index === 0 ? 7 : 6} states</small>
                </span>
              ))}
            </aside>
            <section className='mock-board'>
              <div>
                <h3>Onboarding</h3>
                <p>7 states · First-run and replay onboarding flow</p>
              </div>
              <div className='mock-devices'>
                {['Welcome', 'Permissions', 'Create Account', 'Personalize'].map((item, index) => (
                  <article key={item}>
                    <small>{item}</small>
                    <div className='mock-phone-notch' />
                    <h4>{index === 0 ? 'Welcome to FrameBoard' : item}</h4>
                    <span />
                    <span />
                    <button type='button'>{index === 1 ? 'Allow' : 'Continue'}</button>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewTile({ state, title }: { state: string; title: string }) {
  return (
    <article>
      <small>{title}</small>
      <h3>{state}</h3>
      <span />
      <span />
      <span />
    </article>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <section className='page-section split-section'>
        <div>
          <p className='signal'>Value perspective</p>
          <h2>Designed for product-state review, not component browsing.</h2>
          <p>
            Storybook documents components. FrameBoard reviews whole screens as product surfaces:
            what they say, how they respond, how they fail, and whether they still hold up across
            device and theme changes.
          </p>
        </div>
        <div className='value-grid'>
          {valueCards.map((card) => (
            <article key={card.title}>
              <card.icon size={21} />
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className='page-section workflow-section'>
        <div className='section-heading'>
          <p className='signal'>Getting started</p>
          <h2>Install the library, then refactor screens into reviewable fixtures.</h2>
        </div>
        <div className='quickstart-panel'>
          <div>
            <h3>Ask your agent to set up the pattern</h3>
            <p>
              FrameBoard works best when screens receive props from the top, fixture data is deterministic,
              and the review board is exposed through a dedicated route.
            </p>
          </div>
          <a className='button primary' href={`${rootPath}docs/prompts/`}>Copy setup prompt</a>
        </div>
        <div className='agent-prompt-card'>
          <div>
            <Sparkles size={20} />
            <h3>Recommended agent prompt</h3>
          </div>
          <pre><code>{`Install FrameBoard from npm in this project.
For React DOM use @frameboard/react and @frameboard/core.
For Expo or React Native use @frameboard/react-native and @frameboard/core.
Audit the existing codebase and refactor valuable screens so state comes from top-level props.
Create deterministic fixtures for loading, empty, error, permission, success, long content, responsive, and dark-mode states.
Expose a private FrameBoard route that wraps screens in the real app shell without causing navigation, network, analytics, or storage side effects.
Document how future screens should be added to the board.`}</code></pre>
        </div>
        <div className='quickstart-steps'>
          {gettingStartedSteps.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <pre><code>{step.code}</code></pre>
              </div>
            </article>
          ))}
        </div>
        <div className='workflow-grid'>
          {workflowSteps.map((step, index) => (
            <article key={step}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>
      <section className='page-section example-section'>
        <div>
          <p className='signal'>Live example</p>
          <h2>This website is also the React example.</h2>
          <p>
            The public docs site and the demo are the same app. Open the board to review these pages
            as real FrameBoard screens across desktop, responsive, tablet, phone, theme, notes, and
            route states.
          </p>
          <div className='link-stack'>
            <a href={demoPath}>Open /examples/react/</a>
            <a href={`${demoPath}?review=screen&galleryScreen=developer-docs&state=docs&view=selected&device=responsive&width=1280&height=720&zoom=75`}>
              Open developer docs state
            </a>
          </div>
        </div>
        <div className='mini-board' aria-label='Example board preview'>
          <PreviewTile title='Home' state='Value' />
          <PreviewTile title='Docs' state='API' />
          <PreviewTile title='React' state='Guide' />
        </div>
      </section>
    </>
  );
}

function DeveloperDocsPage() {
  return (
    <DocsLayout route='docs'>
      <DocHero
        icon={<BookOpen size={24} />}
        label='Developer documentation'
        title='A product-review board for real app screens.'
        body='Use FrameBoard to register whole screens, fixture states, devices, themes, app shells, params, notes, and exports. The highest value comes from treating the board as a product quality surface, not a gallery of screenshots.'
      />
      <div className='docs-grid'>
        {docsSections.map((section) => (
          <article key={section.title}>
            <h3>{section.title}</h3>
            <p>{section.body}</p>
            <pre><code>{section.code}</code></pre>
          </article>
        ))}
      </div>
      <BestPractices />
    </DocsLayout>
  );
}

function ReactGuidePage() {
  return (
    <DocsLayout route='react'>
      <DocHero
        icon={<MonitorSmartphone size={24} />}
        label='React guide'
        title='Build a DOM review board with real routed screens.'
        body='Use the React renderer for web apps, docs sites, dashboards, and internal tools. Register screen components with stable fixture states and use params to link directly to every review target.'
      />
      <GuideSteps items={reactGuide} />
      <Callout title='Responsive review'>
        Select Responsive and enter width and height values in the toolbar, or link to
        <code>?device=responsive&amp;width=1280&amp;height=720</code>.
      </Callout>
    </DocsLayout>
  );
}

function ReactNativeGuidePage() {
  return (
    <DocsLayout route='react-native'>
      <DocHero
        icon={<PackagePlus size={24} />}
        label='React Native guide'
        title='Review native screens with simulated device dimensions.'
        body='React Native boards default to phone and tablet presets. Use the responsive dimension hook so audited screens react to the selected FrameBoard device instead of the host browser window.'
      />
      <GuideSteps items={nativeGuide} />
      <Callout title='Expo projects'>
        Use the same renderer in Expo. Add a private route or internal tools screen, keep fixtures
        side-effect free, and avoid triggering navigation or native pickers inside the board.
      </Callout>
    </DocsLayout>
  );
}

function ExpoPage() {
  return (
    <DocsLayout route='expo'>
      <DocHero
        icon={<Boxes size={24} />}
        label='Expo guide'
        title='Add FrameBoard to Expo without changing runtime behavior.'
        body='Create an internal review entry point, wrap screens in passive providers, and use fixture data instead of network calls. Keep the board excluded from normal production navigation unless your app already has an internal tools area.'
      />
      <div className='docs-grid'>
        <article>
          <h3>Expo install</h3>
          <pre><code>pnpm add @frameboard/react-native @frameboard/core</code></pre>
        </article>
        <article>
          <h3>Provider pattern</h3>
          <p>Wrap screens with theme, safe-area, query, or navigation providers only when those providers are passive in the review board.</p>
        </article>
      </div>
    </DocsLayout>
  );
}

function PromptsPage() {
  return (
    <main className='site-main prompt-page'>
      <section className='prompt-hero'>
        <div className='prompt-intro'>
          <p className='signal'>Prompts to run in your project</p>
          <h1>Give agents the product-review pattern.</h1>
          <p>
            These prompts help a coding agent install FrameBoard, discover the states worth
            reviewing, and turn fixtures into a repeatable UX quality system.
          </p>
          <div className='prompt-stats' aria-label='Prompt workflow summary'>
            <span><strong>3</strong> prompts</span>
            <span><strong>7+</strong> state types</span>
            <span><strong>1</strong> review route</span>
          </div>
        </div>
        <div className='prompt-terminal' aria-label='Agent setup preview'>
          <div>
            <Terminal size={17} />
            <span>agent prompt</span>
          </div>
          <pre><code>{`Install FrameBoard from npm.
Register risky screens.
Add states users actually hit.
Make the review board impossible to ignore.`}</code></pre>
        </div>
      </section>
      <section className='prompt-workbench'>
        <div className='prompt-rail'>
          <Sparkles size={22} />
          <h2>Run them in order.</h2>
          <p>
            Start with wiring, then ask the agent to find the highest-value surfaces, then improve
            fixture quality until the board exposes real product risk.
          </p>
        </div>
        <div className='prompt-list'>
          {promptCards.map((prompt, index) => (
            <article className='prompt-card' key={prompt.title}>
              <div className='prompt-card-head'>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <small>{prompt.audience}</small>
                  <h3>{prompt.title}</h3>
                </div>
                <button
                  type='button'
                  onClick={() => {
                    void navigator.clipboard.writeText(prompt.body);
                  }}
                >
                  <Clipboard size={15} />
                  Copy
                </button>
              </div>
              <p>{prompt.outcome}</p>
              <pre><code>{prompt.body}</code></pre>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function DocsLibraryPage() {
  const groups = Array.from(new Set(docsFiles.map((file) => file.group)));

  return (
    <DocsLayout route='library'>
      <DocHero
        icon={<Library size={24} />}
        label='Docs library'
        title='Browse every markdown document in the repo.'
        body='The GitHub Pages site exposes the structured documentation set with direct source links, so contributors can move from product explanation to the exact markdown file.'
      />
      <div className='library-grid'>
        {groups.map((group) => (
          <section key={group}>
            <h3>{group}</h3>
            {docsFiles.filter((file) => file.group === group).map((file) => (
              <a href={`${githubUrl}/blob/main/${file.path}`} key={file.path}>
                <FileText size={16} />
                <span>{file.title}</span>
                <small>{file.path}</small>
              </a>
            ))}
          </section>
        ))}
      </div>
    </DocsLayout>
  );
}

function DocsLayout({ children, route }: { children: ReactNode; route: SiteRoute }) {
  const icons: Record<SiteRoute, ReactNode> = {
    docs: <BookOpen size={15} />,
    react: <MonitorSmartphone size={15} />,
    'react-native': <PackagePlus size={15} />,
    expo: <Boxes size={15} />,
    prompts: <Sparkles size={15} />,
    library: <Library size={15} />,
    home: null,
  };

  return (
    <main className='site-main docs-layout'>
      <aside className='docs-nav' aria-label='Documentation sections'>
        {docsNavItems.map((item) => (
          <a className={route === item.route ? 'active' : ''} href={item.href} key={item.route}>
            {icons[item.route]}
            {item.label}
          </a>
        ))}
      </aside>
      <section className='docs-content'>{children}</section>
    </main>
  );
}

function DocHero({ body, icon, label, title }: { body: string; icon: ReactNode; label: string; title: string }) {
  return (
    <section className='doc-hero'>
      <div className='doc-icon'>{icon}</div>
      <p className='signal'>{label}</p>
      <h1>{title}</h1>
      <p>{body}</p>
    </section>
  );
}

function GuideSteps({ items }: { items: Array<{ code: string; title: string }> }) {
  return (
    <div className='guide-stack'>
      {items.map((item, index) => (
        <article key={item.title}>
          <span>{index + 1}</span>
          <div>
            <h3>{item.title}</h3>
            <pre><code>{item.code}</code></pre>
          </div>
        </article>
      ))}
    </div>
  );
}

function BestPractices() {
  return (
    <section className='best-practices'>
      <h2>Best practices</h2>
      <div>
        <article>
          <h3>Prioritize risk</h3>
          <p>Start with screens where bad states hurt trust: purchase, onboarding, permissions, upload, sync, delete, and recovery flows.</p>
        </article>
        <article>
          <h3>Name states clearly</h3>
          <p>Use stable ids like <code>paymentError</code>, <code>permissionDenied</code>, and <code>longContent</code> so review links and screenshots stay predictable.</p>
        </article>
        <article>
          <h3>Keep fixtures deterministic</h3>
          <p>Do not fetch data, mutate storage, trigger analytics, open native pickers, or navigate as a side effect of rendering a state.</p>
        </article>
      </div>
    </section>
  );
}

function Callout({ children, title }: { children: ReactNode; title: string }) {
  return (
    <aside className='callout'>
      <Route size={20} />
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </aside>
  );
}

function LoadingPage({ route }: { route: SiteRoute }) {
  const isDocs = route !== 'home' && route !== 'prompts';

  return (
    <main className={isDocs ? 'site-main docs-layout loading-page' : 'site-main loading-page'}>
      {isDocs ? (
        <aside className='docs-nav loading-nav' aria-label='Loading documentation navigation'>
          <span />
          <span />
          <span />
          <span />
        </aside>
      ) : null}
      <section className={isDocs ? 'docs-content' : 'page-section'}>
        <div className='loading-hero-card'>
          <span className='loading-icon' />
          <span className='loading-line short' />
          <span className='loading-title' />
          <span className='loading-title medium' />
          <span className='loading-line' />
          <span className='loading-line wide' />
        </div>
        <div className='loading-card-grid'>
          <span />
          <span />
          <span />
        </div>
      </section>
    </main>
  );
}

export function WebsitePage({ embedded = false, loading = false, route }: SiteScreenProps) {
  const activeRoute = route ?? routeFromPathname(window.location.pathname);

  return (
    <div className={embedded ? 'site-shell embedded' : 'site-shell'}>
      {loading ? <LoadingPage route={activeRoute} /> : null}
      {!loading && activeRoute === 'home' ? <main className='site-main'><HomePage /></main> : null}
      {!loading && activeRoute === 'docs' ? <DeveloperDocsPage /> : null}
      {!loading && activeRoute === 'react' ? <ReactGuidePage /> : null}
      {!loading && activeRoute === 'react-native' ? <ReactNativeGuidePage /> : null}
      {!loading && activeRoute === 'expo' ? <ExpoPage /> : null}
      {!loading && activeRoute === 'prompts' ? <PromptsPage /> : null}
      {!loading && activeRoute === 'library' ? <DocsLibraryPage /> : null}
    </div>
  );
}
