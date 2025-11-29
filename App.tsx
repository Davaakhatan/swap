import { StatusBar } from 'expo-status-bar';
import { GameScreen } from './src/ui/screens/GameScreen';

export default function App() {
  return (
    <>
      <GameScreen />
      <StatusBar style="auto" />
    </>
  );
}
