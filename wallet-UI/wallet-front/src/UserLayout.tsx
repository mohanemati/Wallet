import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      <header>
        {/* هدر مخصوص کاربران */}
        <h1>User Dashboard</h1>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>© 2024 User Dashboard Footer</p>
      </footer>
    </div>
  );
};

export default UserLayout;

// اضافه کردن این خط برای حل خطای ماژول
export {};
