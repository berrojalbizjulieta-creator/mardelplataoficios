import type { SVGProps } from 'react';
import Image from 'next/image';

export function Logo(props: any) {
  return (
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-primary"
        {...props}
      >
        <path d="M12.793 2.207a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 0 1.414l5 5a1 1 0 0 0 1.414-1.414L9.414 8.828 12.243 6H19a1 1 0 1 0 0-2h-6.757l2.828-2.828a1 1 0 0 0 0-1.414zM10 14a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      </svg>
      <div className="text-xl font-bold font-headline">
        <span className="text-primary">Cerrajeros</span>
        <span className="text-foreground">Argentinos</span>
      </div>
    </div>
  );
}
