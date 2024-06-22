import { Loader2 } from "lucide-react";
import { SignUp, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import AuthBanner from "../../components/AuthBanner";

function SignUpPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* left: first column */}
      <AuthBanner />

      {/* right: second column on desktop*/}
      <section className="h-full flex flex-col items-center justify-center px-4">
        <div>
          <div className="text-center">
            <h1 className="font-bold text-3xl">Welcome back</h1>
            <h4 className="text-center text-xs mt-2">
              Login or create account to get to the dashboard
            </h4>
          </div>
          <div className="space-y-8 mt-2">
            <ClerkLoaded>
              <SignUp />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="m-auto animate-spin text-muted-foreground" />
            </ClerkLoading>
          </div>
        </div>
      </section>
    </main>
  );
}
export default SignUpPage;
