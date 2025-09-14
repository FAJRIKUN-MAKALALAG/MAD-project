import React, {useState} from 'react';
import SignIn from './screens/SignIn';
import App from '../App';

const Root: React.FC = () => {
  const [signedIn, setSignedIn] = useState(false);

  if (!signedIn) {
    return <SignIn onSuccess={() => setSignedIn(true)} />;
  }

  return <App />;
};

export default Root;

