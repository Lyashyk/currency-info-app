import ContentScene from '../content-scene/content-scene';
import NavigationButton from '../navigation-button/navigation-button';

import './app-scene.css';

const AppScene = () => {

    return <div className="AppScene">
        <div className="AppScene-nav">
            <div className="AppScene-navItem"><NavigationButton path="/table" title="Таблица" /></div>
            <div className="AppScene-navItem"><NavigationButton path="/converter" title="Конвертер" /></div>
            <div className="AppScene-navItem"><NavigationButton path="/shedule" title="График" /></div>
        </div>

        <div className="AppScene-content">
            <ContentScene />
        </div>
    </div>
}

export default AppScene;