import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthModals } from "@/components/auth-modals";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="content">{children}</main>
      <Footer />
      <AuthModals />
    </>
  );
}
