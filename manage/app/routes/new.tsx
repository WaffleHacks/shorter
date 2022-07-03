import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  VStack,
} from '@chakra-ui/react';
import { json, redirect } from '@remix-run/cloudflare';
import { Form, Link, useActionData, useTransition } from '@remix-run/react';

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
  const transition = useTransition();
  const data = useActionData<Validated>();

  return (
    <Box as={Form} method="post" className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
      <VStack align="stretch">
        <Box>
          <Heading size="lg" color="gray.900" fontWeight="md">
            New Short-link
          </Heading>
          <Text mt={1} size="sm" color="gray.500" maxW="2xl">
            Create a new short-link for people to use.
          </Text>
        </Box>

        <Box mt={{ base: 6, sm: 5 }}>
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
        </Box>

        <Flex pt={5} justifyContent="end">
          <Button as={Link} to="/" variant="outline">
            Back
          </Button>
          <Button type="submit" ml={3} colorScheme="green" isLoading={transition.state !== 'idle'}>
            Create
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}
