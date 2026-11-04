import { EnLandingRoute, enLandingMetadata } from "@/components/EnLandingRoute";

export function generateMetadata() {
  return enLandingMetadata("energy-chain");
}

export default function Page() {
  return <EnLandingRoute slug="energy-chain" />;
}
