import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: string; // Couleur personnalisable
}

const Badge: React.FC<BadgeProps> = ({ children, color }) => {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-sm font-medium text-white rounded-full ${color} transition-transform transform hover:scale-125`}
      style={{ transition: 'transform 0.2s ease-in-out' }}
    >
      {children}
    </span>
  );
};

export default Badge;
