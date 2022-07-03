import { AddIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import { json } from '@remix-run/cloudflare';
import { Link, useLoaderData } from '@remix-run/react';

import { EmptyRow, Row } from '~/components/Row';
import type { LoaderFunction } from '~/lib/types';

export const loader: LoaderFunction = async ({ context }) => {
  const links = await context.links.list();
  return json(links.keys.map((item) => item.name));
};

export default function Index() {
  const links = useLoaderData<string[]>();

  return (
    <>
      <Flex justify="space-between">
        <Heading mt={1} size="lg" fontWeight="md">
          Links
        </Heading>
        <Button as={Link} to="/new" colorScheme="green" rightIcon={<AddIcon />}>
          New
        </Button>
      </Flex>

      <TableContainer mt={5}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Slug</Th>
              <Th>Copy Link</Th>
              <Th isNumeric>Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {links.length === 0 && <EmptyRow />}
            {links.map((s) => (
              <Row slug={s} key={s} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
