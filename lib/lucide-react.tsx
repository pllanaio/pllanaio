import type { ReactElement, SVGProps } from "react";

export type LucideIcon = (props: SVGProps<SVGSVGElement>) => ReactElement;

function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

function BrandIcon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Icon>;
}

export function AtSign(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><circle cx="12" cy="12" r="4" /><path d="M16 8v5" /><path d="M20 12a8 8 0 1 1-2-5" /></Icon>;
}

export function Instagram(props: SVGProps<SVGSVGElement>) {
  return <BrandIcon {...props}><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /></BrandIcon>;
}

export function Linkedin(props: SVGProps<SVGSVGElement>) {
  return <BrandIcon {...props}><path d="M5.2 3.5A2.2 2.2 0 1 1 5.2 8a2.2 2.2 0 0 1 0-4.5ZM3.3 9.5h3.8V21H3.3V9.5Zm6.1 0H13v1.6h.1c.5-.9 1.7-2 3.6-2 3.9 0 4.6 2.5 4.6 5.8V21h-3.8v-5.4c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21H9.4V9.5Z" /></BrandIcon>;
}

export function MessageCircle(props: SVGProps<SVGSVGElement>) {
  return <BrandIcon {...props}><path d="M12 2a9.8 9.8 0 0 0-8.4 14.9L2 22l5.3-1.5A9.9 9.9 0 1 0 12 2Zm0 17.8a7.8 7.8 0 0 1-4-1.1l-.3-.2-3.1.9.9-3-.2-.3A7.8 7.8 0 1 1 12 19.8Zm4.3-5.8c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-1.3-.6-2.7-1.3-3.6-2.9-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4H8.2c-.2 0-.5.1-.7.3-.7.7-1.1 1.7-1.1 2.7 0 1.6 1.1 3.1 1.3 3.3.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.6.8.2 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.2-.2-.4-.3Z" /></BrandIcon>;
}

export function Music2(props: SVGProps<SVGSVGElement>) {
  return <BrandIcon {...props}><path d="M16.7 2c.3 2.4 1.7 4 4 4.2v3.5a8.2 8.2 0 0 1-4-1.2v6.7a6.8 6.8 0 1 1-5.9-6.7v3.6a3.3 3.3 0 1 0 2.3 3.1V2h3.6Z" /></BrandIcon>;
}

export function Check(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="m20 6-11 11-5-5" /></Icon>;
}

export function Moon(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M12 3a6 6 0 0 0 9 7.5A9 9 0 1 1 12 3z" /></Icon>;
}

export function Sun(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M2 12h2" /><path d="M20 12h2" /></Icon>;
}

export function Code2(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></Icon>;
}

export function Layers3(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="m12 3 9 5-9 5-9-5 9-5z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></Icon>;
}

export function Network(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><rect x="16" y="16" width="6" height="6" rx="1" /><rect x="2" y="16" width="6" height="6" rx="1" /><rect x="9" y="2" width="6" height="6" rx="1" /><path d="M5 16v-3h14v3" /><path d="M12 8v8" /></Icon>;
}

export function ShieldCheck(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8z" /><path d="m9 12 2 2 4-4" /></Icon>;
}

export function Sparkles(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z" /><path d="M19 15l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" /></Icon>;
}

export function Workflow(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /><path d="M9 6h4a5 5 0 0 1 5 5v4" /><path d="M6 9v6a3 3 0 0 0 3 3h6" /></Icon>;
}
