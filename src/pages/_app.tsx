import React from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../auth-machine';
import { useAuth } from '../auth-machine';
import Image from 'next/image';

export const Navbar: React.FC<{}> = () => {
  const { isAuthenticated, goToSignIn } = useAuth();

  return (
    <section>
      <span>Reproduction</span>
      <div>
        <ul></ul>
        <ul>
          <li>
            {isAuthenticated ? (
              <Image src="" alt="Profile Avatar" />
            ) : (
              <button
                onClick={() => {
                  console.log('HIT GO TO SIGN IN');
                  goToSignIn();
                }}
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
      </div>
    </section>
  );
};

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
