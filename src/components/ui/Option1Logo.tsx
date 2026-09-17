import type { SVGProps } from 'react';

export function Option1Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Aetheris mark" {...props}>
      <circle cx="60" cy="60" r="47" stroke="currentColor" strokeWidth="2" opacity=".3" />
      <path d="M60 15 98 82 60 105 22 82 60 15Z" stroke="currentColor" strokeWidth="3" />
      <path d="m60 15 38 67M60 15 22 82m38-28 38 28m-38-28L22 82M60 54v51" stroke="currentColor" strokeWidth="2" opacity=".8" />
      <circle cx="60" cy="54" r="5" fill="#D600E0" />
    </svg>
  );
}