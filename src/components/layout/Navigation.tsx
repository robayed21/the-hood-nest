import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from '../../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Shop All', path: '/shop' },
  { label: 'Hoodies', path: '/category/hoodies', badge: 'Hot' },
  { label: 'Sweatshirts', path: '/category/sweatshirts' },
  { label: 'Jackets', path: '/category/jackets' },
  { label: 'Sweaters', path: '/category/sweaters' },
  { label: 'Winter Bottoms', path: '/category/winter-bottoms' },
  { label: 'About Us', path: '/about' },
];

export const Navigation: React.FC = () => {
  return (
    <nav className="hidden lg:flex items-center gap-7">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `relative text-xs tracking-wider uppercase font-semibold transition-colors duration-150 py-1 flex items-center gap-1.5 ${
              isActive
                ? 'text-accent'
                : 'text-primary/80 hover:text-primary'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-[9px] px-1.5 py-0.2 font-bold uppercase rounded bg-accent/15 text-accent">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

