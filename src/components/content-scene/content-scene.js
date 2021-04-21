import { Route, Switch, Redirect } from 'react-router-dom';

import ContentTable from '../content-table/content-table';
import ContentConterter from '../content-converter/content-converter';
import ContentShedule from '../content-shedule/content-shedule';
import ErrorRoute from '../content-error-route/content-error-route';

const ContentScene = () => (
    <Switch>
        <Route path="/table" component={ContentTable} exact />
        <Route path="/converter" component={ContentConterter} exact />
        <Route path="/shedule" component={ContentShedule} exact />
        <Route path="/eror-404" component={ErrorRoute} exact />
        <Redirect from="/" to="/table" />
        <Redirect to="/eror-404" />
    </Switch>
)

export default ContentScene;