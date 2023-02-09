import { Outlet, Link } from "react-router-dom";
//import Filter from "../../Components/Filter";

import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">
          <button type="button">Employees</button></Link>
        </li>
        <li className="grow">
          <Link to="/equipment">
            <button type="button">Equipment</button>
          </Link>
        </li>
        <li className="grow">
          <Link to="/tools">
            <button type="button">Tools</button>
          </Link>
        </li>
        <li className="grow">
          <Link to="/missing">
            <button type="button">Missing Employees</button>
          </Link>
        </li>
        <li className="grow">
          <Link to="/top-paid">
            <button type="button">Top-paid Employees</button>
          </Link>
        </li>
        <li className="grow">
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
        </li>
        <li className="grow">
          <Link to="/create-equipment">
            <button type="button">Create Equipment</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
