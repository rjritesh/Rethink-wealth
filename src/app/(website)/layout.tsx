import Header from "@/components/shared/Header";
import dynamic from "next/dynamic";

const Footer = dynamic(()=>import("@/components/shared/Footer"))
export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}