import {Icon} from 'assets/icons';
import {Route} from 'constants/routes';

export const navLinks = [
  {
    title: 'Categories',
    href: Route.categories.path,
    icon: <Icon.Categories />,
  },
  {
    title: 'F.A.Q.',
    href: Route.faq.path,
    icon: <Icon.Info />,
  },
];

export const userLinks = [
  {
    title: 'My collections',
    href: Route.myCollections.path,
    icon: <Icon.Folder />,
  },
  {
    title: 'My history',
    href: Route.myHistory.path,
    icon: <Icon.TimeCircle />,
  },
  {
    title: 'My favorites',
    href: Route.myFavorites.path,
    icon: <Icon.Heart />,
  },
  {
    title: 'Profile',
    href: Route.myProfile.path,
    icon: <Icon.Settings />,
  },
];
