import { StatusCard } from '@components/elements/cards';
import { Grid } from '@components/elements/grid';
import { Typography, TypographyVariant } from '@components/elements/typography';
import { useProcessKeys } from '@hooks/use-process-keys';
import { colors } from '@theme/colors';
import { useTranslation } from 'react-i18next';

export const EncryptionKeys = ({ processId }: { processId: string }) => {
  const { i18n } = useTranslation();
  const { loadingProcessKeys, processKeys } = useProcessKeys({ processId: processId });

  return (
    <>
      {!loadingProcessKeys && (
        <>
          <Typography variant={TypographyVariant.Small} color={colors.lightText} margin={'16px 0 0 0'}>
            <span>{i18n.t('processes.details.election_encryption_keys')}</span>
          </Typography>
          <Grid>
            <StatusCard sm={1} md={3} title={i18n.t('processes.details.published')} rightText="">
              <h3>{processKeys?.encryptionPubKeys?.length ?? 0}</h3>
            </StatusCard>
            <StatusCard md={3} title={i18n.t('processes.details.revealed')} rightText="">
              <h3>{processKeys?.encryptionPrivKeys?.length ?? 0}</h3>
            </StatusCard>
          </Grid>
        </>
      )}
    </>
  );
};
