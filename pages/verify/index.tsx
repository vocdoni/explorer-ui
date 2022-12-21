import { Button } from '@components/elements/button'
import { FakedButton } from '@components/elements/styled-divs'
import { DefaultLayout } from '@components/pages/app/layout/layout'
import { LayoutVerify } from '@components/pages/app/layout/verify'
import VerifyPage from '@components/pages/verify'
import VerifySinglePage from '@components/pages/verify/single-page'
import i18n from '@i18n'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'
import { useUrlHash } from 'use-url-hash'

const VerifyIndexPage = () => {

  return <VerifySinglePage />
}

// Defining the custom layout to use
VerifyIndexPage['Layout'] = process.env.VERIFY_SINGLE_PAGE ? LayoutVerify : DefaultLayout

export default VerifyIndexPage
