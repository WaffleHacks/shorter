import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ClipboardCopyIcon,
  PencilAltIcon,
  XCircleIcon,
} from '@heroicons/react/outline';
import { Link, useLoaderData, useParams } from '@remix-run/react';

import type { Link as LinkT } from '~/lib/link';
import type { LoaderFunction } from '~/lib/types';

export const loader: LoaderFunction = async ({ params, context }) => {
  const slug = params.slug as string;
  return await context.links.get<LinkT>(slug, { type: 'json' });
};

export default function ViewLink() {
  const { slug } = useParams();
  const data = useLoaderData<LinkT>();

  // TODO: add success notification
  const onCopy = () => navigator.clipboard.writeText(`https://wffl.link/${slug}`);

  return (
    <div>
      <div>
        <div className="flex justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Short-link Information</h3>
          <span className="relative z-0 inline-flex shadow-sm rounded-md">
            <button
              type="button"
              className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              onClick={onCopy}
            >
              <ClipboardCopyIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              Copy
            </button>
            <Link
              to="edit"
              className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <PencilAltIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              Edit
            </Link>
          </span>
        </div>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Analytics and configuration details.</p>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Slug</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{slug}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">URL</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <a href={data.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                {data.url}
              </a>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Enabled</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="sr-only">{data.enabled ? 'Enabled' : 'Disabled'}</span>
              {data.enabled ? (
                <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
              ) : (
                <XCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
              )}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Total Clicks</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{data.usages}</dd>
          </div>
        </dl>
      </div>

      <Link
        to="/"
        className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Back
      </Link>
    </div>
  );
}
