import { PageCard } from '../components/elements/cards';
import NotFoundComponent from '../components/pages/not-found';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
const NotFound = () => (
  <PageCard>
    <NotFoundComponent />
  </PageCard>
);

export default NotFound;
