"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!session.data ? (
        <button onClick={() => signIn("github", { redirectTo: "/dashboard" })}>
          Sign In
        </button>
      ) : (
        <button onClick={() => signOut()}>Sign Out</button>
      )}

      {JSON.stringify(session)}
    </main>
  );
}
