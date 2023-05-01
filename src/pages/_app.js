import { ClerkProvider, SignedIn, SignedOut, UserButton, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import Link from 'next/link'
import Navigation from '@/components/Navigation';
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
    <link href="https://fonts.cdnfonts.com/css/caveman" rel="stylesheet" />
    <link href="https://fonts.cdnfonts.com/css/vtks-wine-label-two" rel="stylesheet"/>
    <link href="https://fonts.cdnfonts.com/css/little-dinosaur" rel="stylesheet"></link>
    <link href="https://fonts.cdnfonts.com/css/elegant-2" rel="stylesheet"></link>
                
    

    <ClerkProvider {...pageProps}>

      {/* Check if on public page or not */}
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <Navigation></Navigation>
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