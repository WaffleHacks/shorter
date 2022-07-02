import { LinkIcon } from '@heroicons/react/outline';

import Empty from '~/components/Empty';

export default function Index() {
  return <Empty title="No links yet" description="Get started by adding a new short-link" icon={LinkIcon} />;
}
