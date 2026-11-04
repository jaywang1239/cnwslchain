import { EnLandingRoute, enLandingMetadata } from "@/components/EnLandingRoute";

export function generateMetadata() {
  return enLandingMetadata("drag-chain");
}

export default function Page() {
  return <EnLandingRoute slug="drag-chain" />;
}
