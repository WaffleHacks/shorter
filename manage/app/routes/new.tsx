import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { json, redirect } from '@remix-run/cloudflare';
import { Form, Link, useActionData, useTransition } from '@remix-run/react';

import type { Link as LinkT } from '~/lib/link';
import type { ActionFunction } from '~/lib/types';

interface Validated {
  errors?: Partial<Params>;
  values: Params;
}

interface Params {
  slug: string;
  url: string;
}

const getString = (form: FormData, key: string): string | null => {
  const value = form.get(key);
  if (typeof value !== 'string') return null;
  else return value;
};

const isValidURL = (test: string): boolean => {
  try {
    new URL(test);
    return true;
  } catch {
    return false;
  }
};

const validateInputs = (formData: FormData): Validated => {
  const errors: Partial<Params> = {};

  // Ensure fields exist
  const slug = getString(formData, 'slug');
  if (!slug) errors.slug = 'This field is required';
  else if (!/^[a-z0-9-]+$/.test(slug)) errors.slug = 'Can only contain lowercase alphanumeric characters and dashes';

  const url = getString(formData, 'url');
  if (!url) errors.url = 'This field is required';
  else if (!isValidURL(url)) errors.url = 'Invalid URL';

  return {
    errors: Object.keys(errors).length === 0 ? undefined : errors,
    values: { slug: slug || '', url: url || '' },
  };
};

export const action: ActionFunction = async ({ request, context }) => {
  const params = await request.formData();

  // Validate inputs
  const result = validateInputs(params);
  if (result.errors) return json(result);

  const { values } = result;

  // Insert into the database
  const link: LinkT = { enabled: false, usages: 0, url: values.url };
  await context.links.put(values.slug, JSON.stringify(link));

  return redirect(`/links/${values.slug}`);
};

export default function New(): JSX.Element {
  const transition = useTransition();
  const data = useActionData<Validated>();

  return (
    <Form method="post" className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <div>
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">New Short-link</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Create a new short-link for people to use.</p>
        </div>

        <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              Slug
            </label>
            <div className="max-w-lg mt-1 sm:mt-0 sm:col-span-2">
              <div className="relative flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  wffl.link/
                </span>
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  defaultValue={data?.values.slug}
                  autoComplete="off"
                  className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  aria-describedby={data?.errors?.slug ? `slug-error` : undefined}
                  aria-invalid={!!data?.errors?.slug}
                />
                {data?.errors?.slug && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                )}
              </div>
              {data?.errors?.slug && (
                <p className="mt-2 text-sm text-red-600" id="slug-error">
                  {data?.errors?.slug}
                </p>
              )}
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
              URL
            </label>
            <div className="max-w-lg mt-1 sm:mt-0 sm:col-span-2">
              <div className="relative">
                <input
                  type="url"
                  name="url"
                  id="url"
                  defaultValue={data?.values.url}
                  autoComplete="off"
                  className="block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                  aria-describedby={data?.errors?.url ? `slug-error` : undefined}
                  aria-invalid={!!data?.errors?.url}
                />
                {data?.errors?.url && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                  </div>
                )}
              </div>
              {data?.errors?.url && (
                <p className="mt-2 text-sm text-red-600" id="url-error">
                  {data?.errors?.url}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <Link
            to="/"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back
          </Link>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 disabled:bg-indigo-300 disabled:hover:bg-indigo-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={transition.state === 'submitting'}
          >
            Create
          </button>
        </div>
      </div>
    </Form>
  );
}
