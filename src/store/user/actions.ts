export const getAccountAddressAction = () => ({
  type: 'user/getAccountAddressAction',
});

export const getProfileAction = (payload?: {wallet?: string}) => ({
  type: 'app/getProfileAction',
  payload,
});
