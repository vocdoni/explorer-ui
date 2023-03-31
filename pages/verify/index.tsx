import { DefaultLayout } from '@components/pages/app/layout/layout';
import { LayoutVerify } from '@components/pages/app/layout/verify';
import VerifySinglePage from '@components/pages/verify/single-page';
import { useUrlHash } from 'use-url-hash';
import styled from 'styled-components';
import VerifyPage from '@components/pages/verify';
import Router from 'next/router';
import { getPath } from '@components/pages/app/components/get-links';
import { VERIFY_DETAILS } from '@const/routes';
import { useEffect, useState } from 'react';

const VerifyIndexPage = () => {
  const urlVoteId = useUrlHash().slice(1);
  const [voteId, setVoteId] = useState('');

  const hasVoteId = voteId !== '';

  const onClick = (etVoteId: string) => {
    if (etVoteId.length) {
      // Update the url
      Router.push(
        getPath(VERIFY_DETAILS, {
          voteId: etVoteId,
        })
      );
      // Update the state
      setVoteId(etVoteId);
    }
  };

  useEffect(() => {
    setVoteId(urlVoteId);
  }, [urlVoteId]);

  return (
    <>
      <VerifyPageContainer>
        <VerifyPage minified={hasVoteId} onSubmit={onClick} />
      </VerifyPageContainer>
      {hasVoteId && <VerifySinglePage voteId={voteId} />}
    </>
  );
};

const VerifyPageContainer = styled.div`
  margin-bottom: 20px;
`;

// Defining the custom layout to use
VerifyIndexPage['Layout'] = process.env.VERIFY_SINGLE_PAGE ? LayoutVerify : DefaultLayout;

export default VerifyIndexPage;
