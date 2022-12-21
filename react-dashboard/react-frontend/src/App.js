import { Routes, Route } from "react-router-dom";
import Main from './screens/main/Main';
import About from './screens/about/About';
import Examples from './screens/examples/Examples';
import NotFound from './screens/notfound/NotFound';
import Invoices from "./screens/invoices/Invoices";
import Dashboard from "./screens/dashboard/Dashboard";
import Question from "./screens/question/Question";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/examples" element={<Examples />}></Route>      
      <Route path="/invoices/:invoiceId" element={<Invoices/>}></Route>
      <Route path="*" element={<NotFound />}></Route>
      <Route path="/dashboards/:dashboardId" element={<Dashboard/>}></Route>
      <Route path="/dashboards/:dashboardId/questions/:questionId" element={<Question/>}></Route>

    </Routes>

  );
}
export default App;
