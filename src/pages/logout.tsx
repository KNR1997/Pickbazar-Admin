import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Loader from '@/components/ui/loader/loader';
import { useLogoutMutation } from '@/data/user';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function SignOut() {
  const { t } = useTranslation();
  const { mutate: logout } = useLogoutMutation();
  const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY ?? 'authToken';
  const cookies = Cookies.get(AUTH_TOKEN_KEY);

  useEffect(() => {
    let refreshToken = '';
    if (cookies){
      refreshToken = JSON.parse(cookies)['refreshToken'];
      if (refreshToken) {
        logout(refreshToken); // Pass refresh token to logout mutation
      }
    }
  }, []);

  return <Loader text={t('common:signing-out-text')} />;
}

export default SignOut;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});
