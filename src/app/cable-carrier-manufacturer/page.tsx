import { EnLandingRoute, enLandingMetadata } from "@/components/EnLandingRoute";

export function generateMetadata() {
  return enLandingMetadata("cable-carrier-manufacturer");
}

export default function Page() {
  return <EnLandingRoute slug="cable-carrier-manufacturer" />;
}
