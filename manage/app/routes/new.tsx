import { FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { json, redirect } from '@remix-run/cloudflare';
import { useActionData } from '@remix-run/react';

import Form from '~/components/Form';
import type { ActionFunction, ShortLink } from '~/lib/types';

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
  const link: ShortLink = { enabled: true, usages: 0, url: values.url };
  await context.links.put(values.slug, JSON.stringify(link));

  return redirect(`/links/${values.slug}`);
};

export default function New(): JSX.Element {
  const data = useActionData<Validated>();

  return (
    <Form title="New Short-link" description="Create a new short-link for people to use">
      <FormControl isRequired isInvalid={!!data?.errors?.slug}>
        <FormLabel htmlFor="slug">Slug</FormLabel>
        <InputGroup>
          <InputLeftAddon children="wffl.link/" />
          <Input id="slug" name="slug" defaultValue={data?.values.slug} />
        </InputGroup>
        {data?.errors?.slug && <FormErrorMessage>{data?.errors?.slug}</FormErrorMessage>}
      </FormControl>

      <FormControl mt={{ base: 6, sm: 5 }} isRequired isInvalid={!!data?.errors?.url}>
        <FormLabel htmlFor="url">URL</FormLabel>
        <Input id="url" name="url" defaultValue={data?.values.url} />
        {data?.errors?.url && <FormErrorMessage>{data?.errors?.url}</FormErrorMessage>}
      </FormControl>
    </Form>
  );
}
