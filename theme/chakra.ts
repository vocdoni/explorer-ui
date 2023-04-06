import { extendBaseTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import { tabsTheme } from '@theme/chakra/tabs';

const chakraDefaultTheme = extendBaseTheme({ components: { ...chakraTheme.components, Tabs: tabsTheme } });

export default chakraDefaultTheme;
