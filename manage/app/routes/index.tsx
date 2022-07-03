import { AddIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Grid, Heading, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { json } from '@remix-run/cloudflare';
import { Link as RemixLink, useLoaderData } from '@remix-run/react';

import Empty from '~/components/Empty';
import type { LoaderFunction } from '~/lib/types';

export const loader: LoaderFunction = async ({ context }) => {
  const links = await context.links.list();
  return json(links.keys.map((item) => item.name));
};

function LinkList(): JSX.Element {
  const links = useLoaderData<string[]>();

  if (links.length === 0) return <Empty />;

  return (
    <Grid
      gap={4}
      templateColumns={{
        base: 'repeat(1, minmax(0, 1fr))',
        sm: 'repeat(2, minmax(0, 1fr))',
        lg: 'repeat(3, minmax(0, 1fr))',
        xl: 'repeat(4, minmax(0, 1fr))',
      }}
    >
      {links.map((l) => (
        <LinkBox
          key={l}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderRadius="lg"
          borderWidth="1px"
          borderColor="gray.300"
          shadow="sm"
          px={6}
          py={3}
          _hover={{ borderColor: 'gray.400' }}
        >
          <LinkOverlay as={RemixLink} to={`/links/${l}`} color="gray.900" fontSize="md" fontWeight="md">
            {l}
          </LinkOverlay>
          <ChevronRightIcon h={4} w={4} aria-hidden="true" />
        </LinkBox>
      ))}
    </Grid>
  );
}

export default function Index() {
  return (
    <>
      <Flex justify="space-between">
        <Heading mt={1} size="lg" fontWeight="md">
          Links
        </Heading>
        <Button as={RemixLink} to="/new" colorScheme="green" rightIcon={<AddIcon />}>
          New
        </Button>
      </Flex>

      <Box mt={5}>
        <LinkList />
      </Box>
    </>
  );
}
