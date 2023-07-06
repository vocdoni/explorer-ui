import { Else, If, Then } from 'react-if';
import { Loader } from '@components/blocks/loader';
import { ReactNode } from 'react';

const LoaderPage = ({
  loading,
  error,
  hasContent,
  children,
  errorMessage,
}: {
  loading: boolean;
  error: boolean;
  hasContent: boolean;
  children: ReactNode;
  errorMessage: string;
}) => {
  return (
    <If condition={loading && !error}>
      <Then>
        <Loader visible />
      </Then>
      <Else>
        <If condition={hasContent && !error}>
          <Then>{children}</Then>
          <Else>
            <h1>{errorMessage}</h1>
          </Else>
        </If>
      </Else>
    </If>
  );
};

export default LoaderPage;
