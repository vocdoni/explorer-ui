import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useCallback } from 'react';
import { HiLanguage } from 'react-icons/hi2';
import router from 'next/router';

type LanguageOption = {
  code: string;
  name: string;
};

const languages: LanguageOption[] = [
  { code: 'en', name: 'English' },
  { code: 'ca', name: 'Català' },
  { code: 'es', name: 'Español' },
];

const LanguageSelector = ({ bg = 'transparent', size, color }: { bg?: string; size?: string; color?: string }) => {
  const handleLanguageChange = useCallback((languageCode: string) => {
    const { pathname, query } = router;
    router.push({ pathname, query }, router.asPath, { locale: languageCode });
  }, []);

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HiLanguage />}
        variant="outline"
        bg={bg}
        size={size}
        color={color}
      />
      <MenuList>
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            border={'none'}
            fontSize="md"
          >
            {language.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSelector;
