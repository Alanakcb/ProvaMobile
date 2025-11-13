import 'react-native-get-random-values'
import { AuthProvider } from './src/context/auth';
import { Navigation } from './src/navigations';

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}