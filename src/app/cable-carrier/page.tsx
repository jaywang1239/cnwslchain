import { EnLandingRoute, enLandingMetadata } from "@/components/EnLandingRoute";

export function generateMetadata() {
  return enLandingMetadata("cable-carrier");
}

export default function Page() {
  return <EnLandingRoute slug="cable-carrier" />;
}
