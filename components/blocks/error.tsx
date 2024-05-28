import { useTranslation } from 'next-i18next';

const ErrorPage = (props: { message?: string }) => {
  const { t } = useTranslation();
  return <div>{(props && props.message) || t('errors.general_error')}</div>;
};

export default ErrorPage;
