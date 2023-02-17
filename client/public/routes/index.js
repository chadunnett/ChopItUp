import { Switch, Route } from 'react-router-dom';
import UserRoutes from './user';


function App() {
  return (
    <div>
<Switch>
<Route path="/user">
<UserRoutes />
 </Route>
</Switch>
    </div>
  );
}
<Switch>
<Route path="/user">
 <UserRoutes />
</Route>
<NotFoundPage />
</Switch>

export default App;
