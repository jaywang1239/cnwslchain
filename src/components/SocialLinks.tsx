import {
  socialIcons,
  socialPlatforms,
  type SocialPlatform,
} from "@/lib/social";

type Props = {
  className?: string;
  iconClassName?: string;
};

export default function SocialLinks({
  className = "",
  iconClassName = "h-5 w-5",
}: Props) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {socialPlatforms.map((item) => (
        <li key={item.id}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-brand-accent hover:bg-brand-accent/20 hover:text-brand-accent"
          >
            <svg
              className={iconClassName}
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={socialIcons[item.id as SocialPlatform]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
