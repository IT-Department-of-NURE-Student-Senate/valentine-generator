import { nanoid } from 'nanoid';
import { VALENTINE_COOKIE_KEY } from '~/constants';

export const useValentineRedirect = () => {
  const valentineId = useCookie(VALENTINE_COOKIE_KEY);

  const handleRedirect = () => {
    const id = nanoid(12);

    valentineId.value = id;

    return navigateTo(`/${id}/edit`);
  };

  return { handleRedirect };
};
