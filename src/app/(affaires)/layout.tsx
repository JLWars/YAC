import HeaderAffaires from "@/components/HeaderAffaires";
import FooterAffaires from "@/components/FooterAffaires";

export default function AffairesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderAffaires />
      <main>{children}</main>
      <FooterAffaires />
    </>
  );
}
