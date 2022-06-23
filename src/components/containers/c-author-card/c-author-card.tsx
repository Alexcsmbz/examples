import {PAuthorCard} from 'components/primitives/p-author-card';
import {PAuthorCardProps} from 'components/primitives/p-author-card/p-author-card.types';
import {memo, useEffect, useState} from 'react';
import {getProfileService} from 'services/user';
import {UserProfile} from 'types/api';
import {ServerResponse} from 'types/custom';

const CAuthorCard = (props: PAuthorCardProps) => {
  const [avatar, setAvatar] = useState('');
  const [cover, setCover] = useState('');

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await getProfileService({wallet: props.author?.walletAddress});
        if (mounted) {
          setAvatar((res.data as ServerResponse<UserProfile>)?.data?.avatarUrl!);
          setCover((res.data as ServerResponse<UserProfile>)?.data?.backgroundUrl!);
        }
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return <PAuthorCard avatar={avatar} cover={cover} {...props} />;
};

export const CAuthorCardMemoized = memo(CAuthorCard);
