import { StatusCard } from '@components/elements/cards'
import { Grid } from '@components/elements/grid'
import { useProcessKeys } from '@hooks/use-process-keys'
import { useTranslation } from 'react-i18next'


export const EncryptionKeys = ({
  processId,
}: {
  processId: string
}) => {

  const { i18n } = useTranslation()
  const{loadingProcessKeys, processKeys} = useProcessKeys({processId: processId})

  return (
    <>
    { !loadingProcessKeys &&
      <Grid>
        <StatusCard
          sm={1}
          md={3}
          title={i18n.t('processes.details.published_keys')}
          rightText=""
        >
          <h3>{processKeys?.encryptionPubKeys?.length ?? 0}</h3>
        </StatusCard>
        <StatusCard
          md={3}
          title={i18n.t('processes.details.encrypted_keys')}
          rightText=""
        >
          <h3>{processKeys?.encryptionPrivKeys?.length ?? 0}</h3>
        </StatusCard>
      </Grid>}
    </>
  )
}
