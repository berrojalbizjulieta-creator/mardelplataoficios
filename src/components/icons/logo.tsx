import type { SVGProps } from 'react';
import Image from 'next/image';

export function Logo(props: any) {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
        {...props}
      >
        <path
          d="M368.6 112.5C337.1 69.4 286.4 48 223.1 48 135.5 48 64 119.5 64 207.1s71.5 159.1 159.1 159.1c46.7 0 89.2-18.5 119.8-48.9l89.3 89.3c15.1 15.1 39.5 15.1 54.6 0s15.1-39.5 0-54.6l-85.2-85.2c16.3-29.4 25.5-63.5 25.5-99.6.1-50.6-26.6-92.4-83.6-114.3zM223.1 336.2c-70.9 0-128.1-57.2-128.1-128.1s57.2-128.1 128.1-128.1 128.1 57.2 128.1 128.1-57.2 128.1-128.1 128.1zM464 368h-48v-48h-48v-48h-48v-48h144v144z"
          fill="currentColor"
        />
      </svg>
      <div className="text-xl font-bold font-headline">
        <span className="text-primary">Cerrajeros</span>
        <span className="text-foreground">Argentinos</span>
      </div>
    </div>
  );
}
