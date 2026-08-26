import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthModals } from "@/components/auth-modals";

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="container-shell py-12">{children}</main>
      <Footer />
      <AuthModals />
    </>
  );
}
