import { ArrowBackIcon, CheckIcon, CloseIcon, CopyIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Link as ChakraLink,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import type { ReactNode } from 'react';

import type { LoaderFunction, ShortLink } from '~/lib/types';

export const loader: LoaderFunction = async ({ params, context }) => {
  const slug = params.slug as string;
  return await context.links.get<ShortLink>(slug, { type: 'json' });
};

interface ItemProps {
  label: string;
  children: ReactNode;
}

function Item({ label, children }: ItemProps): JSX.Element {
  return (
    <Grid
      py={{ base: 4, sm: 5 }}
      templateColumns={{ base: 'repeat(1, minmax(0, 1fr))', sm: 'repeat(3, minmax(0, 1fr))' }}
      gap={{ sm: 4 }}
    >
      <GridItem>
        <Text as="span" size="sm" fontWeight="md" color="gray.500">
          {label}
        </Text>
      </GridItem>
      <GridItem colSpan={{ base: 1, sm: 2 }}>
        <Text as="span" mt={{ base: 1, sm: 0 }} size="sm" color="gray.900">
          {children}
        </Text>
      </GridItem>
    </Grid>
  );
}

export default function ViewLink() {
  const { slug } = useParams();
  const data = useLoaderData<ShortLink>();
  const toast = useToast();

  const onCopy = async () => {
    await navigator.clipboard.writeText(`https://wffl.link/${slug}`);
    toast({
      title: 'Link copied!',
      status: 'success',
      duration: 2500,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <Box>
      <Box>
        <Flex justifyContent="space-between">
          <Heading size="lg" color="gray.900" fontWeight="md" className="text-lg leading-6 font-medium text-gray-900">
            Short-link Information
          </Heading>
          <ButtonGroup size="sm" variant="outline" spacing="3">
            <Button onClick={onCopy} leftIcon={<CopyIcon />}>
              Copy
            </Button>
            <Button as={Link} to="edit" leftIcon={<EditIcon />}>
              Edit
            </Button>
          </ButtonGroup>
        </Flex>
        <Text mt={1} maxW="2xl" size="sm" color="gray.500">
          Analytics and configuration details.
        </Text>
      </Box>

      <Divider mt={5} color="gray.200" />

      <Item label="Slug">{slug}</Item>

      <Divider color="gray.200" />

      <Item label="URL">
        <ChakraLink color="blue.500" href={data.url} isExternal>
          {data.url}
        </ChakraLink>
      </Item>

      <Divider color="gray.200" />

      <Item label="Enabled">
        {data.enabled ? (
          <CheckIcon h={6} w={6} color="green.500" aria-hidden="true" />
        ) : (
          <CloseIcon h={6} w={6} color="red.500" aria-hidden="true" />
        )}
      </Item>

      <Divider color="gray.200" />

      <Item label="Total Clicks">{data.usages}</Item>

      <Divider color="gray.200" />

      <Button as={Link} to="/" mt={3} leftIcon={<ArrowBackIcon />}>
        Back
      </Button>
    </Box>
  );
}
