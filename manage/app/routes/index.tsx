import { ChevronRightIcon, LinkIcon, PlusIcon } from '@heroicons/react/outline';
import { json } from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';

import Empty from '~/components/Empty';
import type { LoaderFunction } from '~/lib/types';

export const loader: LoaderFunction = async ({ context }) => {
  const links = await context.links.list();
  return json(links.keys.map((item) => item.name));
};

function LinkList(): JSX.Element {
  const links = useLoaderData<string[]>();

  if (links.length === 0)
    return <Empty title="No links yet" description="Get started by adding a new short-link" icon={LinkIcon} />;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {links.map((l) => (
        <Link
          key={l}
          to={`/links/${l}`}
          className="flex justify-between rounded-lg border border-gray-300 bg-white px-6 py-3 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
        >
          <p className="text-md font-medium text-gray-900">{l}</p>
          <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}

export default function Index() {
  return (
    <>
      <div className="flex justify-end">
        <Link
          to="/new"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          New
          <PlusIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-5">
        <LinkList />
      </div>
    </>
  );
}
