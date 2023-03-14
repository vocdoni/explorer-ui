import { DefaultLayout } from '@components/pages/app/layout/layout';
import { LayoutVerify } from '@components/pages/app/layout/verify';
import VerifySinglePage from '@components/pages/verify/single-page';
import { useUrlHash } from 'use-url-hash';

const VerifyIndexPage = () => {
  const voteId = useUrlHash().slice(1);

  return <VerifySinglePage urlVoteId={voteId} />;
};

// Defining the custom layout to use
VerifyIndexPage['Layout'] = process.env.VERIFY_SINGLE_PAGE ? LayoutVerify : DefaultLayout;

export default VerifyIndexPage;
