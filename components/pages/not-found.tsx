import { useTranslation } from 'next-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>Vocdoni</h1>
      <p>{t('errors.page_not_found')}</p>
    </div>
  );
};

export default NotFound;
