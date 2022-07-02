import { PlusIcon } from '@heroicons/react/outline';
import { Link } from '@remix-run/react';
import type { ComponentProps, ElementType } from 'react';
import React from 'react';

interface Props {
  title: string;
  description: string;
  icon: ElementType<ComponentProps<'svg'>>;
}

export default function Empty({ title, description, icon: Icon }: Props): JSX.Element {
  return (
    <div className="mx-auto text-center border-4 border-gray-300 border-dashed rounded-lg p-12">
      <Icon className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
      <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
      <div className="mt-6">
        <Link
          to="/new"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          New
        </Link>
      </div>
    </div>
  );
}
