import { DashboardShowProcesses } from '@components/pages/elections/list';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
const ProcessesPage = () => {
  return <DashboardShowProcesses />;
};

export default ProcessesPage;
