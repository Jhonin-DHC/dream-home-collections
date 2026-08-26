import { ResetPasswordForm } from "@/components/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <section className="container-shell max-w-md py-16">
      <h1 className="section-title">Choose a new password</h1>
      <p className="section-copy mt-2">This link expires one hour after it was sent.</p>
      <div className="mt-6">
        <ResetPasswordForm />
      </div>
    </section>
  );
}
