import { Text, View } from 'react-native';
import {
  FrameBoard,
  useResponsiveDimensions,
  type FrameBoardNativeScreen,
} from '@frameboard/react-native';

type NativeDemoProps = {
  body: string;
  items?: string[];
  tone?: 'default' | 'warning' | 'success';
};

function NativeDemoScreen({ body, items = [], tone = 'default' }: NativeDemoProps) {
  const { width } = useResponsiveDimensions();
  const isCompact = width < 390;

  return (
    <View
      style={{
        backgroundColor: tone === 'warning' ? '#FFF0DF' : tone === 'success' ? '#EDF8F0' : '#FAF6ED',
        flex: 1,
        padding: isCompact ? 18 : 26,
      }}
    >
      <Text style={{ color: '#6D6878', fontSize: 12, fontWeight: '900', marginBottom: 10 }}>
        FrameBoard Native
      </Text>
      <Text style={{ color: '#1F1D2B', fontSize: isCompact ? 34 : 44, fontWeight: '900', lineHeight: isCompact ? 36 : 46 }}>
        {body}
      </Text>
      <View style={{ gap: 12, marginTop: 28 }}>
        {items.length > 0 ? (
          items.map((item) => (
            <View
              key={item}
              style={{
                backgroundColor: '#FFFCF7',
                borderColor: '#D8D3C8',
                borderRadius: 12,
                borderWidth: 1,
                padding: 16,
              }}
            >
              <Text style={{ color: '#1F1D2B', fontWeight: '800' }}>{item}</Text>
            </View>
          ))
        ) : (
          <Text style={{ color: '#6D6878', fontSize: 16 }}>No items in this state.</Text>
        )}
      </View>
    </View>
  );
}

const screens: FrameBoardNativeScreen<NativeDemoProps>[] = [
  {
    component: NativeDemoScreen,
    description: 'Native home states with compact-width copy changes.',
    id: 'home',
    name: 'Home',
    states: [
      { id: 'empty', props: { body: 'Start with one important file' } },
      { id: 'populated', props: { body: 'Three things need attention', items: ['Council tax', 'Passport renewal', 'Car insurance'], tone: 'success' } },
      { id: 'error', props: { body: 'Something went wrong', tone: 'warning' } },
    ],
  },
  {
    component: NativeDemoScreen,
    description: 'Native capture states.',
    id: 'capture',
    name: 'Capture',
    states: [
      { id: 'ready', props: { body: 'Save something new', items: ['Scan document', 'Choose photo', 'Pick file'] } },
      { id: 'processing', props: { body: 'Reading the file' } },
    ],
  },
];

export default function App() {
  return (
    <FrameBoard
      renderAppShell={({ children }) => (
        <View style={{ flex: 1 }}>
          {children}
          <View style={{ borderColor: '#D8D3C8', borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-around', padding: 12 }}>
            <Text style={{ fontWeight: '800' }}>Home</Text>
            <Text>Inbox</Text>
            <Text>Library</Text>
          </View>
        </View>
      )}
      screens={screens}
    />
  );
}
