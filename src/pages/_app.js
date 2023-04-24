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

  return (
    <>
    {/* Pure CSS - Reference: https://purecss.io/start/ */}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css" integrity="sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls" crossOrigin="anonymous"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/grids-responsive-min.css" />

    
    <ClerkProvider {...pageProps}>

      {/* Check if on public page or not */}
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            {/* Header */}
            <div className="header">
              <div className="title">Chore Tracker</div>
              <div id="userBtn"><UserButton/></div>
            </div>

            {/* Bottom navigation */}
            <div className="navbar">
              <Link href="/home"><img className="icon" src="home.png" alt="Home"></img></Link>
              <Link href="/analytics"><img className="icon" src="analytics.png" alt="Analytics"></img></Link>

              {/* Only have add button for parent ??? */}
              <Link href="/addChore"><img className="icon" src="add.png" alt="Add Chore"></img></Link>

              <Link href="/connect"><img className="icon" src="connect2.png" alt="Connect Account"></img></Link>
              <Link href="/done???"><img className="icon" src="done.png" alt="Done Chores"></img></Link>
            </div>
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