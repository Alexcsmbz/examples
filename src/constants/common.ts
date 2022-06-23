export const MIN_TOKEN_PRICE = 0.0001;
export const MIN_QUANTITY_TOKENS = 1;
export const MIN_ROYALTY = 0;
export const MAX_ROYALTY = 15;
export const MAX_QUANTITY_TOKENS = 5000;
export const MAX_LENGTH_TOKEN_NAME = 60;
export const MAX_LENGTH_TOKEN_DESCRIPTION = 1000;
export const MAX_LENGTH_ABOUT_DESCRIPTION = 1000;
export const MAX_LENGTH_NICKNAME = 30;
export const TAKE_COUNT = 12;
export const THREE_MINUTES = 1000 * 60 * 3;
export const NftStandard = {
  size: 104857600,
  types: [
    {
      type: 'image/png',
      extension: '.png',
    },
    {
      type: 'image/jpeg',
      extension: '.jpg',
    },
    {
      type: 'image/svg+xml',
      extension: '.svg',
    },
    {
      type: 'image/gif',
      extension: '.gif',
    },
    {
      type: 'model/gltf+json',
      extension: '.gltf',
    },
    {
      type: 'model/gltf-binary',
      extension: '.glb',
    },
  ],
};

export const correctNftTokenMessage = `Max size: ${NftStandard.size / 1024 / 1024} MB. Only ${NftStandard.types
  .map(t => t.extension)
  .join(', ')} files are allowed`;

export const initialProfile = {
  isDeleted: false,
  created: '',
  modified: '',
  userId: '',
  nickname: '',
  website: '',
  twitter: '',
  instagram: '',
  facebook: '',
  telegramChannel: '',
  discordServer: '',
  aboutMe: '',
  avatarUrl: '',
  backgroundUrl: '',
  user: {
    id: '',
    wallet: '',
  },
};

export const EMAIL_SERVER = {
  serviceID: 'service_z13t7cb',
  templateID: 'template_ju00j0e',
  publicKey: '-fXk3FW7OFEToiksn',
};

export const IMAGE_LINK_FOR_ALL_CATEGORY = 'https://ipfs.stars.art/ipfs/QmVpgYcUD3ZRUAtW5yXZhai8kg6d8jZt2Tu36rHuACgVXV';
