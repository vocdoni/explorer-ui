import { StatusCard } from '@components/elements/cards';
import { Grid } from '@components/elements/grid';
import { Typography, TypographyVariant } from '@components/elements/typography';
import { colors } from '@theme/colors';
import { useTranslation } from 'react-i18next';
import { useElectionKeys } from '@hooks/use-voconi-sdk';

export const EncryptionKeys = ({ electionId }: { electionId: string }) => {
  const { i18n } = useTranslation();
  // todo(kon): implement encryption keys hook and interface properly
  const { loading, data: processKeys } = useElectionKeys({ electionId: electionId });
  return (
    <>
      {!loading && (
        <>
          <Typography variant={TypographyVariant.Small} color={colors.lightText} margin={'16px 0 0 0'}>
            <span>{i18n.t('processes.details.election_encryption_keys')}</span>
          </Typography>
          <Grid>
            <StatusCard sm={1} md={3} title={i18n.t('processes.details.published')} rightText="">
              <h3>{processKeys?.publicKeys?.length ?? 0}</h3>
            </StatusCard>
            <StatusCard md={3} title={i18n.t('processes.details.revealed')} rightText="">
              <h3>{processKeys?.privateKeys?.length ?? 0}</h3>
            </StatusCard>
          </Grid>
        </>
      )}
    </>
  );
};
