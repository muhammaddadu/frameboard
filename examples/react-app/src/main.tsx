import { createRoot } from 'react-dom/client';
import { FrameBoard, type FrameBoardReactScreen } from '@frameboard/react';
import '@frameboard/react/styles.css';
import './styles.css';

type DemoProps = {
  body: string;
  eyebrow: string;
  items?: string[];
  tone?: 'calm' | 'warning' | 'success';
};

function DemoScreen({ body, eyebrow, items = [], tone = 'calm' }: DemoProps) {
  return (
    <main className={`demo-screen demo-screen-${tone}`}>
      <header>
        <p>{eyebrow}</p>
        <h1>{body}</h1>
      </header>
      <section>
        {items.length > 0 ? (
          items.map((item) => <article key={item}>{item}</article>)
        ) : (
          <div className="demo-empty">Nothing to review yet.</div>
        )}
      </section>
    </main>
  );
}

const screens: FrameBoardReactScreen<DemoProps>[] = [
  {
    component: DemoScreen,
    description: 'Home states for first-run, populated, and recovery paths.',
    id: 'home',
    name: 'Home',
    states: [
      {
        id: 'loading',
        name: 'Loading',
        props: { body: 'Loading your workspace', eyebrow: 'Home' },
      },
      {
        id: 'empty',
        name: 'Empty',
        props: { body: 'Start by adding one file', eyebrow: 'Home' },
      },
      {
        id: 'documentsExist',
        name: 'Documents Exist',
        props: {
          body: 'Three files need attention',
          eyebrow: 'Home',
          items: ['Passport renewal', 'Energy bill', 'Tenancy agreement'],
          tone: 'success',
        },
      },
    ],
  },
  {
    component: DemoScreen,
    description: 'Capture states for permission, processing, and saved outcomes.',
    id: 'capture',
    name: 'Capture',
    states: [
      {
        id: 'ready',
        props: { body: 'Save something new', eyebrow: 'Capture', items: ['Scan', 'Photo', 'File'] },
      },
      {
        id: 'permissionDenied',
        props: { body: 'Camera permission is needed', eyebrow: 'Capture', tone: 'warning' },
      },
      {
        id: 'processing',
        props: { body: 'Checking your file', eyebrow: 'Capture' },
      },
    ],
  },
];

createRoot(document.getElementById('root')!).render(
  <FrameBoard
    renderAppShell={({ children }) => <div className="demo-shell">{children}</div>}
    screens={screens}
  />,
);
