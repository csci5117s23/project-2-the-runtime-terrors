import { ClerkProvider } from '@clerk/nextjs';
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
    <header>Our App</header>
    <ClerkProvider {...pageProps} >
      <Component {...pageProps} />
    </ClerkProvider>
    </>
  );
}