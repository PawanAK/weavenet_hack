import { ConnectButton } from "@arweave-wallet-kit/react";
import { Link } from "react-router-dom";

const Header = () => {
  const navLinks = [
    { title: "View", path: "/view" },
    { title: "Create", path: "/create" },
  ];

  return (
    <header className="bg-primary shadow p-4 flex justify-between items-center w-full fixed top-0 z-10">
      <Link to="/" className="text-2xl font-bold text-white no-underline">BlinkBlog</Link>
      <div className="flex space-x-4">
        {navLinks.map((link) => (
          <Link key={link.title} to={link.path} className="text-white no-underline hover:underline">{link.title}</Link>
        ))}
      </div>
      <ConnectButton profileModal={true} showBalance={false} showProfilePicture={true} />
    </header>
  );
};

export default Header;
