import styled from 'styled-components';

import { sizes } from '../../../../theme/sizes';
import { MessageAlert } from '../../../blocks/msg-alert';
import { LoadingAlert } from '../../../blocks/loading-alert';

// import { VoteHeader } from '../header/voter'
import { Footer } from '../footer';
// import { useRouter } from 'next/router'

const LayoutContainer = styled.div`
  ${({ theme }) => `padding: 20px ${theme.margins.mobile.horizontal} 120px;`}
  max-width: ${sizes.laptopL * 0.8}px;
  margin-left: auto;
  margin-right: auto;

  @media ${({ theme }) => theme.screenMin.tablet} {
    ${({ theme }) => `padding: 20px ${theme.margins.desktop.horizontal} 120px;`}
  }
`;

export const LayoutVerify = ({ children }: { children }) => {
  // const router = useRouter();
  // const isHomePage = router.pathname === '/'

  return (
    <>
      <MessageAlert />
      <LoadingAlert />
      {/* <VoteHeader /> */}

      <LayoutContainer>{children}</LayoutContainer>

      <Footer />
    </>
  );
};
