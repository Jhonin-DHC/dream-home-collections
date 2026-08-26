import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="container-shell py-24 text-center">
        <h1 className="section-title">Page not found</h1>
        <p className="section-copy mt-3">That address is not in the collection yet.</p>
        <Link href="/" className="btn-gold mt-8 inline-block">
          Back home
        </Link>
      </section>
      <Footer />
    </>
  );
}
