import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FrameBoard } from '@frameboard/react';
import '@frameboard/react/styles.css';
import './styles.css';
import { SiteAppShell } from './SiteShell';
import { WebsitePage } from './SitePages';
import { screens } from './frameboardScreens';
import { readParamsFromLocation, routeFromPathname, routeFromState, writeParamsToLocation } from './routing';
import type { DemoFrameBoardParams } from './types';

function DemoFrameBoard() {
  const initialParams = useMemo(() => readParamsFromLocation(), []);
  const [params, setParams] = useState<DemoFrameBoardParams>(initialParams);

  return (
    <FrameBoard
      defaultDeviceId='responsive'
      onParamsChange={(nextParams) => {
        setParams(nextParams);
        writeParamsToLocation(nextParams);
      }}
      params={params}
      renderAppShell={({ children, state }) => (
        <div className='example-shell'>
          <SiteAppShell activeRoute={routeFromState(state)}>
            {children}
          </SiteAppShell>
        </div>
      )}
      screens={screens}
      subtitle='The FrameBoard website reviewed as real routed screens.'
    />
  );
}

function App() {
  const isExampleRoute = window.location.pathname.includes('/examples/react');
  const activeRoute = routeFromPathname(window.location.pathname);

  return isExampleRoute ? (
    <DemoFrameBoard />
  ) : (
    <SiteAppShell activeRoute={activeRoute}>
      <WebsitePage route={activeRoute} />
    </SiteAppShell>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
