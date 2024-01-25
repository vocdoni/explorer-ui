import { Loader } from '@components/blocks/loader';
import { FlexAlignItem, FlexContainer, FlexJustifyContent } from '@components/elements/flex';
import { EnvelopeDetails } from '@components/pages/envelopes/details';
import i18n from '@i18n';
import { Else, If, Then, When } from 'react-if';
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
