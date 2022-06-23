import {UserProfile} from 'types/api';
import {Account, Banner} from 'types/custom';

export type UserState = {
  account: Account;
  loading: boolean;
  errors: string[];
  profile: UserProfile;
  profileBanner: Banner;
};
