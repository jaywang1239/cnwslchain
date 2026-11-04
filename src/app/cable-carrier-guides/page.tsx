import { EnGuidesHub, enGuidesHubMetadata } from "@/components/EnGuidesHub";

export function generateMetadata() {
  return enGuidesHubMetadata();
}

export default function Page() {
  return <EnGuidesHub />;
}
