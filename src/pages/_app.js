import { ClerkProvider, SignedIn, SignedOut, UserButton, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Link from 'next/link'
import '@/styles/globals.css';

const publicPages = ["/sign-in/[[...index]]", "/sign-up/[[...index]]", "/"];

// Reference: https://clerk.com/docs/nextjs/pages-react
export default function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);

  // If the current route is listed as public, render it directly
  // Otherwise, use Clerk to require authentication
  return (
    <>
    {/* Pure CSS - Reference: https://purecss.io/start/ */}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css" integrity="sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls" crossOrigin="anonymous"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
    
    <ClerkProvider {...pageProps}>

      {/* Bottom navigation */}
      <div className="navbar">
        <Link href="/home"> Home </Link>
        <Link href="/analytics"> Analytics </Link>
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </div>

      {/* Header */}
      <header style={{padding: 20 }}>
        <h1>Chore Tracker</h1>
      </header>

      {/* Check if on public page or not */}
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
    </>
  );
}