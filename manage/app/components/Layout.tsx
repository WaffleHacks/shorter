import { LinkIcon } from '@heroicons/react/outline';
import type { ReactNode } from 'react';
import React from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props): JSX.Element {
  return (
    <>
      <div className="bg-gray-800 pb-32">
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white flex">
              <LinkIcon className="h-8 w-8 mr-2" aria-hidden="true" />
              Shorter
            </h1>
          </div>
        </header>
      </div>
      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  );
}
