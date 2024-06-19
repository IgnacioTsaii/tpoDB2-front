// components/LayoutUser1.tsx
import React from 'react';

const LayoutUser1: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div>
      <header>User 1 Header</header>
      <main>{children}</main>
      <footer>User 1 Footer</footer>
    </div>
  );
};

export default LayoutUser1;

// components/LayoutUser2.tsx
const LayoutUser2: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div>
      <header>User 2 Header</header>
      <main>{children}</main>
      <footer>User 2 Footer</footer>
    </div>
  );
};

export default LayoutUser2;
