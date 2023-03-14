import { ReactNode } from 'react';

export const FilterForm = ({ onEnableFilter, children }: { onEnableFilter: () => void; children: ReactNode }) => {
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        onEnableFilter();
      }}
    >
      {children}
    </form>
  );
};
