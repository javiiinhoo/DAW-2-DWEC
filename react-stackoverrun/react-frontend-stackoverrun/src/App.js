import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import DashboardDetail from './screens/dashboard_detail/DashboardDetail';
import NewAnswer from './screens/new_answer/NewAnswer';
import NewQuestion from './screens/new_question/NewQuestion';
import Dashboards from './screens/dashboards/Dashboards';
import QuestionDetail from './screens/question_detail/QuestionDetail';
import NotFound from './screens/not_found/NotFound';
import UserRegister from './screens/register/UserRegister';
import UserLogin from './screens/user/login/UserLogin';
import Container from './screens/container/Container';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Container />}>
        <Route index element={<Dashboards />}></Route>
        <Route path='register' element={<UserRegister />}></Route>
        <Route path='login' element={<UserLogin />}></Route>
        <Route path='dashboards/:dashboardId' element={<DashboardDetail />}></Route>
        <Route path='dashboards/:dashboardId/newQuestion' element={<NewQuestion />}></Route>
        <Route path='dashboards/:dashboardId/questions/:questionId' element={<QuestionDetail />}></Route>
        <Route path='dashboards/:dashboardId/questions/:questionId/newAnswer' element={<NewAnswer />}></Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>

  );
}

export default App;
