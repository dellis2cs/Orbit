import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/dashboard">
          <h1 className="text-xl font-semibold">Orbit</h1>
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          Share
        </Button>
        <Button variant="ghost" size="sm">
          Comments
        </Button>
        <Button size="sm">Publish</Button>
      </div>
    </header>
  );
};

export default Header;
