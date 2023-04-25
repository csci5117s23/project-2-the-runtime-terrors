import { useAuth, SignIn, SignedOut} from '@clerk/nextjs'
import { useRouter } from 'next/router';

export default function Splash() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  // User is already logged in - Reference: https://sourcefreeze.com/how-to-redirect-to-another-page-in-next-js/
  if(isLoaded && userId){
    const router = useRouter();
    router.push('/home');
  }

  return (
    <main>
      <h1>
        Welcome! 
      </h1>
      <SignedOut>
        <SignIn afterSignInUrl={"/home"} afterSignUpUrl={"/account"} />
      </SignedOut>
    </main>
  )
}