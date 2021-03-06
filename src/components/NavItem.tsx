import React, { ReactNode, useEffect, useState } from 'react';

import { FaCaretDown, FaCaretRight, FaSpinner } from 'react-icons/fa';

interface NavItemProps {
  isDropdown: boolean;
  open: boolean;
  isNested: boolean;
  titleContent: ReactNode;
  dropdownContent?: ReactNode;
  onClick?: Function;
  isLoading?: boolean;
}

const NavItem = (props: NavItemProps) => {
  useEffect(() => {
    if (props.open) {
      setNavItemOpen(props.open);
    }
  }, []);
  const [navItemOpen, setNavItemOpen] = useState(false);
  return (
    <>
      <div
        className={`flex w-full text-lg font-medium justify-between ${
          navItemOpen && props.isNested ? 'bg-gray-100' : null
        } ${props.isNested ? 'border-b px-3 py-1' : 'p-3'} ${
          props.isDropdown && navItemOpen ? 'shadow-md' : 'border-b'
        } ${
          props.isDropdown || props.isNested
            ? 'hover:bg-gray-200 cursor-pointer'
            : null
        }`}
        onClick={() => {
          if (props.isDropdown) setNavItemOpen(!navItemOpen);
          if (props.onClick) {
            props.onClick();
          }
        }}
      >
        {props.titleContent}
        {props.isDropdown && !props.isLoading ? (
          navItemOpen ? (
            <FaCaretDown className="my-auto group-hover:text-gray-700" />
          ) : (
            <FaCaretRight className="my-auto group-hover:text-gray-700" />
          )
        ) : null}
        {props.isLoading ? (
          <FaSpinner className="animate-spin my-auto" />
        ) : null}
      </div>
      {props.isDropdown ? (
        <div
          className={`duration-200 ease-in-out transition-all overflow-hidden max-h-0 border-l-8 ${
            props.isNested ? 'border-gray-500' : 'border-gray-300'
          } ${navItemOpen ? 'max-h-full' : null}`}
        >
          {props.dropdownContent}
        </div>
      ) : null}
    </>
  );
};

export default NavItem;
