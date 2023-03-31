import { Loader } from '@components/blocks/loader';
import { Button } from '@components/elements/button';
import { FlexAlignItem, FlexContainer, FlexJustifyContent } from '@components/elements/flex';
import { FakedButton } from '@components/elements/styled-divs';
import { EnvelopeDetails } from '@components/pages/envelopes/details';
import VerifyPage from '@components/pages/verify';
import i18n from '@i18n';
import { useEffect, useState } from 'react';
import { Else, If, Then, Unless, When } from 'react-if';
import styled from 'styled-components';
import Router from 'next/router';
import { VERIFY_DETAILS } from '@const/routes';
import { getPath } from '@components/pages/app/components/get-links';
import { useVoteInfo } from '@hooks/use-voconi-sdk';

const VerifySinglePage = ({ voteId }: { voteId: string }) => {
  const {
    loading,
    data: envelope,
    error,
  } = useVoteInfo({
    voteId: voteId,
  });

  const envelopeNotFound = !loading && error !== null;
  const envelopeLoaded = envelope !== null;
  const isLoading = loading && !envelope;

  return (
    <>
      <If condition={isLoading}>
        <Then>
          <Loader visible />
        </Then>
        <Else>
          <If condition={envelopeNotFound}>
            <Then>
              <FlexContainer alignItem={FlexAlignItem.Center} justify={FlexJustifyContent.Center}>
                <h2>{i18n.t('envelopes.details.envelope_not_found')}</h2>
              </FlexContainer>
            </Then>
            <Else>
              <When condition={envelopeLoaded}>
                <EnvelopeDetails envelope={envelope} />
              </When>
            </Else>
          </If>
        </Else>
      </If>
    </>
  );
};

export default VerifySinglePage;
