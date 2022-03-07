import { Loader } from '@components/blocks/loader'
import { BlockView } from '@components/pages/blocks/details'
import { useBlock } from '@hooks/use-blocks'
import { ViewStrategy } from '@lib/strategy'
import { Else, If, Then } from 'react-if'
import { useUrlHash } from 'use-url-hash'

const BlockDetailPage = () => {
  const blockHeight: number = +useUrlHash().slice(1)
  const { block, loading } = useBlock({ blockHeight: blockHeight })

  // todo(ritmo): create an error page
  return (
    <If condition={loading}>
      <Then>
        <Loader visible />
      </Then>
      <Else>
          <BlockView blockData={block} ></BlockView>
      </Else>
    </If>
  )
}

export default BlockDetailPage
