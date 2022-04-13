import { Loader } from '@components/blocks/loader'
import ElectionDetailPage from '@components/pages/elections/details'
import i18n from '@i18n'
import { useProcess } from '@vocdoni/react-hooks'
import { Else, If, Then } from 'react-if'
import { useUrlHash } from 'use-url-hash'

const ElectionsDetailPage = () => {
  const processId = useUrlHash().slice(1)
  const { process: processInfo, loading } = useProcess(processId)
  
  return (
    <If condition={loading}>
      <Then>
        <Loader visible />
      </Then>
      <Else>
        {!!processInfo && !loading
          ? (<ElectionDetailPage processId={processId} processInfo={processInfo} />) 
          : (<h1>{i18n.t('elections.election_not_found')}</h1>)}
      </Else>
    </If>
  )
}

export default ElectionsDetailPage
