import { Loader } from '@components/blocks/loader'
import ProcessDetailPage from '@components/pages/processes/details'
import { Else, If, Then } from 'react-if'
import { useUrlHash } from 'use-url-hash'
import { useTranslation } from 'react-i18next'
import { useElectionInfo } from '@hooks/use-election'

const ProcessesDetailPage = () => {
  const { i18n } = useTranslation()
  const electionId = useUrlHash().slice(1)
  const { electionInfo, loading } =  useElectionInfo( electionId )

  return (
    <If condition={loading}>
      <Then>
        <Loader visible />
      </Then>
      <Else>
        {!!electionInfo && !loading
          ? (<ProcessDetailPage electionInfo={electionInfo} />)
          : (<h1>{i18n.t('processes.details.process_not_found')}</h1>)}
      </Else>
    </If>
  )
}

export default ProcessesDetailPage
