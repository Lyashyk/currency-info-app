import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import cn from 'classnames';

import './navigation-button.css';

const NavigationButton = ({ path, title }) => {
    const location = useLocation();

    return <Link className={cn("NavigationButton", {
        "NavigationButton--active": path === location.pathname
    })} to={path}>
        {title}
    </Link>;

}

export default NavigationButton;