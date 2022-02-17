import { Typography, TypographyVariant } from "@components/elements/typography";
import { useEntityCount } from "@hooks/use-entities";
import { colors } from "@theme/colors";
import i18n from '@i18n'


interface IDashboardShowEntitiesProps {
}
const ENTITIES_PER_PAGE = 10

export const DashboardShowEntities = ({

} : IDashboardShowEntitiesProps)  => {
    const {entitiesCount} = useEntityCount({});

    return (<>
      <Typography variant={TypographyVariant.H3} color={colors.blueText}>
          {i18n.t('organizations_list.organizations_list_title')}
        </Typography>
        <Typography variant={TypographyVariant.Small} color={colors.lightText}>
          {i18n.t('organizations_list.total_n_organizations')} {entitiesCount}
        </Typography>

      {/* <DashboardProcessList 
        totalProcessCount={processCount} 
        pageSize={PROCESS_PER_PAGE}/> */}
    </>
  )
}
