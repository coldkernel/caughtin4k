import { AuthForm } from "@/components/AuthForm";

export default function SignupPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neon-red/10 via-black to-black opacity-50 pointer-events-none" />
            <AuthForm type="signup" />
        </div>
    );
}
