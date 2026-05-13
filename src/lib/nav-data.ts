export interface NavItem {
  label: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home',       path: '/'           },
  { label: 'News',       path: '/news'        },
  { label: 'Matches',    path: '/fixtures'    },
  { label: 'Teams',      path: '/squad'       },
  { label: 'Shop',       path: '/shop'        },
  { label: 'Membership', path: '/membership'  },
  { label: 'Academy',    path: '/academy'     },
  { label: 'Queens',     path: '/queens'      },
  { label: 'Partners',   path: '/partners'    },
  { label: 'The Club',   path: '/the-club'    },
];

/** True when the nav item's path matches the current route, including sub-paths. */
export function isNavActive(itemPath: string, currentPath: string): boolean {
  if (itemPath === '/') return currentPath === '/';
  return currentPath === itemPath || currentPath.startsWith(itemPath + '/');
}
