import { EnLandingRoute, enLandingMetadata } from "@/components/EnLandingRoute";

export function generateMetadata() {
  return enLandingMetadata("cable-carrier-price");
}

export default function Page() {
  return <EnLandingRoute slug="cable-carrier-price" />;
}
