import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { FrameBoard, type FrameBoardReactScreen } from '../src';

type DemoProps = {
  title: string;
};

function DemoScreen({ title }: DemoProps) {
  return <main>{title}</main>;
}

const screens: FrameBoardReactScreen<DemoProps>[] = [
  {
    component: DemoScreen,
    id: 'home',
    name: 'Home',
    states: [
      {
        id: 'ready',
        props: { title: 'Ready state' },
      },
    ],
  },
];

describe('FrameBoard React renderer', () => {
  it('renders a board with registered screens and states', () => {
    const html = renderToString(<FrameBoard screens={screens} />);

    expect(html).toContain('FrameBoard');
    expect(html).toContain('Home');
    expect(html).toContain('Ready state');
  });

  it('can hide optional toolbar controls', () => {
    const html = renderToString(
      <FrameBoard
        controls={{
          devices: false,
          export: false,
          notes: false,
        }}
        screens={screens}
      />,
    );

    expect(html).not.toContain('Desktop');
    expect(html).not.toContain('Export screen states');
    expect(html).not.toContain('Small-device fit');
    expect(html).toContain('Product Board');
  });

  it('renders responsive size controls for the responsive preset', () => {
    const html = renderToString(
      <FrameBoard
        defaultDeviceId='responsive'
        params={{
          device: 'responsive',
          height: '720',
          width: '1280',
        }}
        screens={screens}
      />,
    );

    expect(html).toContain('aria-label="Responsive width"');
    expect(html).toContain('value="1280"');
    expect(html).toContain('aria-label="Responsive height"');
    expect(html).toContain('value="720"');
    expect(html).toContain('Responsive<!-- --> · <!-- -->1280 x 720');
  });
});
