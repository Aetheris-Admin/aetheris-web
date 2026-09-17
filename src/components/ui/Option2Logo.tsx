import type { SVGProps } from 'react';

export function Option2Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 180 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Aetheris Studios" {...props}>
      <path d="M4 18 12 4l8 14-8 14L4 18Zm16 0L28 4l8 14-8 14-8-14Z" fill="currentColor" />
      <text x="48" y="24" fill="currentColor" fontFamily="sans-serif" fontSize="16" letterSpacing="3">AETHERIS</text>
    </svg>
  );
}