'use client'
import HomeBanner from "@/components/home/HomeBanner";
// import MutualFund from "@/components/home/MutualFund";
import dynamic from "next/dynamic";

const JoinEliteClub = dynamic(()=>import("@/components/home/JoinEliteClub"));
const RethinkWealth = dynamic(()=>import("@/components/home/RethinkWealth"));
const Testimonials = dynamic(()=>import("@/components/home/Testimonials"));
const EquitySection = dynamic(()=>import("@/components/home/EquitySection"));

export default function Home() {
  return (
    <>
      <HomeBanner />
      {/* <MutualFund /> */}
      <JoinEliteClub />
      <EquitySection />
      <Testimonials />
      {/* <HowToBuy /> */}
      <RethinkWealth />
    </>
  );
}
