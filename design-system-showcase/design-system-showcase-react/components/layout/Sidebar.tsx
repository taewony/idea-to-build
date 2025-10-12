
import React from 'react';
import { ComponentType } from '../../types';

interface SidebarProps {
  activeComponent: ComponentType;
  setActiveComponent: (component: ComponentType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems = [
  { id: ComponentType.Buttons, icon: 'toggle_on', label: 'Buttons' },
  { id: ComponentType.Cards, icon: 'badge', label: 'Cards' },
  { id: ComponentType.Inputs, icon: 'edit_square', label: 'Inputs' },
  { id: ComponentType.Modals, icon: 'picture_in_picture', label: 'Modals' },
  { id: ComponentType.Tables, icon: 'dvr', label: 'Tables' },
];

const Sidebar: React.FC<SidebarProps> = ({ activeComponent, setActiveComponent, isOpen, setIsOpen }) => {
  const handleNavClick = (component: ComponentType) => {
    setActiveComponent(component);
    if(window.innerWidth < 640) {
      setIsOpen(false);
    }
  };

  const NavLink: React.FC<{ item: typeof navItems[0] }> = ({ item }) => {
    const isActive = activeComponent === item.id;
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick(item.id);
        }}
        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-primary/10 text-primary dark:bg-primary/20 font-semibold'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
        }`}
      >
        <span className="material-symbols-outlined text-lg">{item.icon}</span>
        {item.label}
      </a>
    );
  };
  
  const sidebarContent = (
    <>
      <div className="sm:hidden mb-6 flex items-center gap-4 px-4">
        <div className="size-6 text-primary">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z" fill="currentColor" fillRule="evenodd"></path>
          </svg>
        </div>
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Stitch</h2>
      </div>
      <nav className="flex flex-col gap-1 px-4">
        {navItems.map((item) => (
          <NavLink key={item.id} item={item} />
        ))}
      </nav>
    </>
  );

  return (
    <>
        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 z-40 sm:hidden transition-opacity ${isOpen ? 'bg-black/50' : 'bg-transparent pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
        <aside className={`fixed sm:hidden z-50 flex h-full w-64 flex-shrink-0 flex-col border-r border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-900/50 py-6 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {sidebarContent}
        </aside>

        {/* Desktop Sidebar */}
        <aside className="w-64 flex-shrink-0 border-r border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/10 py-6 hidden sm:flex flex-col">
            {sidebarContent}
        </aside>
    </>
  );
};

export default Sidebar;