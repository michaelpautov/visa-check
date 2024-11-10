import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";

export function Header() {
  return (
    <header>
      <h1>Logo</h1> 
      <SignedOut>
        <SignInButton/>
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>
    </header>
  )
}
