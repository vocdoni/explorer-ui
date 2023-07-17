import { extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import { tabsTheme } from '@theme/chakra/tabs';
import { tagTheme } from '@theme/chakra/tags';

const chakraDefaultTheme = extendBaseTheme({
  components: { ...chakraTheme.components, Tabs: tabsTheme, Tag: tagTheme },
});

export default chakraDefaultTheme;
