import './styles/main.scss';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { ContactsPage } from './pages/ContactsPage';
import { ContactEdit } from './pages/ContactEdit';
import { MainHeader } from './components/MainHeader';

function App() {
  return (
    <Router>
      <MainHeader />
      <main className="app">
        <Switch>
          <Route component={ContactEdit} path="/contact/edit/:id?" />
          <Route component={ContactsPage} path="/contact" />
          <Route component={Home} path="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
