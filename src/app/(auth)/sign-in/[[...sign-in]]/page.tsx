import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: "mx-auto",
                            card: "bg-slate-900/80 border border-white/10 shadow-2xl",
                            headerTitle: "text-white",
                            headerSubtitle: "text-slate-400",
                            socialButtonsBlockButton: "bg-white/10 border-white/20 text-white hover:bg-white/20",
                            socialButtonsBlockButtonText: "text-white",
                            dividerLine: "bg-white/10",
                            dividerText: "text-slate-400",
                            formFieldLabel: "text-slate-300",
                            formFieldInput: "bg-white/5 border-white/10 text-white placeholder:text-slate-500",
                            footerActionLink: "text-violet-400 hover:text-violet-300",
                            formButtonPrimary: "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500",
                        },
                    }}
                />
            </div>
        </div>
    );
}
