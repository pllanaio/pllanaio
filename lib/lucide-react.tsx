import type { ReactElement, SVGProps } from "react";

export type LucideIcon = (props: SVGProps<SVGSVGElement>) => ReactElement;

function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
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

export const Instagram = AtSign;

export function Linkedin(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /><path d="M10 21V9" /><path d="M14 21v-7a3 3 0 0 1 6 0v7" /></Icon>;
}

export function Check(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="m20 6-11 11-5-5" /></Icon>;
}

export function MessageCircle(props: SVGProps<SVGSVGElement>) {
  return <Icon {...props}><path d="M21 12a8 8 0 0 1-11.5 7L3 21l2-6.5A8 8 0 1 1 21 12z" /></Icon>;
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
