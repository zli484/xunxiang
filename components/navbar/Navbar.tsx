// import NavSearch from './NavSearch';
import LinksDropdown from "./LinksDropdown";
import DarkMode from "./DarkMode";
import Logo from "./Logo";

function Navbar() {
  return (
    <nav className="border-b">
      <div className="container flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <div className="flex">
          <Logo />
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a
              href="/member"
              className="inline-flex items-center border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
            >
              Members
            </a>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a
              href="/mentor"
              className="inline-flex items-center border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
            >
              Mentors
            </a>
          </div>
          {/* <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a
              href="/user"
              className="inline-flex items-center border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
            >
              Search
            </a>
          </div> */}
        </div>
        <div className="flex gap-4 items-center">
          <DarkMode />
          <LinksDropdown />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
