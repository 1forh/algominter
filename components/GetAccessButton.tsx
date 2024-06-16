'use client';

import { useUser } from '@/providers/UserProvider';
import dayjs from 'dayjs';
import Button from './Button';
import ConnectWalletButton from './ConnectWalletButton';

type Props = {};

const GetAccessButton = (props: Props) => {
  const { activeAddress, getAccess, loading, isSubscribed, user } = useUser();

  if (!activeAddress) {
    return <ConnectWalletButton />;
  }

  if (isSubscribed) {
    return (
      <Button className='px-12' disabled>
        🥳 Subscribed until {dayjs(user?.subscribedOn).add(1, 'year').format('MMM DD, YYYY')}
      </Button>
    );
  }

  return (
    <Button className='px-12' loading={loading} onClick={getAccess}>
      Subscribe
    </Button>
  );
};

export default GetAccessButton;
