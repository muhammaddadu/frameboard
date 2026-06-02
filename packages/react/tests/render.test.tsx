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
});
