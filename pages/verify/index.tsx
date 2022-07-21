import { Button } from '@components/elements/button'
import VerifyPage from '@components/pages/verify'
import i18n from '@i18n'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

const Page = () => {
  
  const [nullifier, setNullifier] = useState('')

  return (
    <>
      <VerifyPage
        button={
          <Button positive small>
            <LinkContainer>
              <Link href={'/envelopes/show/#/' + nullifier} passHref>
                {i18n.t('verify.verify')}
              </Link>
            </LinkContainer>
          </Button>
        }
        setNullifier={setNullifier}
      />
    </>
  )
}

export default Page

const LinkContainer = styled.div`
  & > a {
    color: #fff;
  }
`
