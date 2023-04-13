import { ClerkProvider, useUser, useAuth, UserButton, SignIn, SignedOut, SignedIn} from '@clerk/nextjs'

export default function Splash() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  return (
    <main>
      <h1>
        Welcome! 
      </h1>
      <SignedOut>
        <SignIn afterSignInUrl={"/home"} afterSignUpUrl={"/account"} />
      </SignedOut>

      {/* if already logged in, go directly to /home  ??? */}
    </main>
  )
}