import { AddIcon, LinkIcon } from '@chakra-ui/icons';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import React from 'react';

export default function Empty(): JSX.Element {
  return (
    <Box
      mx="auto"
      textAlign="center"
      borderRadius="lg"
      p={12}
      borderWidth={4}
      borderColor="gray.300"
      borderStyle="dashed"
    >
      <LinkIcon mx="auto" h={12} w={12} color="gray.400" aria-hidden="true" />
      <Heading size="md" mt={2} color="gray.900" fontWeight="md">
        No links yet
      </Heading>
      <Text mt={1} size="sm" color="gray.500">
        Get started by adding a new short-link
      </Text>
      <Box mt={6}>
        <Button as={Link} to="/new" leftIcon={<AddIcon />}>
          New
        </Button>
      </Box>
    </Box>
  );
}
