import logo from './logo.svg';
import './App.css';
import SimpleTable from './components/simple_table/SimpleTable';
import SimpleFigure from './components/simple_figure/SimpleFigure';
import SimpleMenu from './components/simple_menu/SimpleMenu';
import Welcome from './components/welcome/Welcome';
import AttendanceControlTable from './components/attendance_control/AttendanceControlTable'
import MultiplicationTable from './components/multiplication_table/MultiplicationTable'
import CalendarMonth from './components/calendar/calendarMonth';
import Counter from './components/counter/Counter';
import BetterCounter from './components/counter/BetterCounter';
import EvenBetterCounter from './components/counter/EvenBetterCounter';
import BestCounter from './components/counter/BestCounter';
import SimpleMessagesList from './components/chat_room/SimpleMessagesList';
import ChatRoom from './components/chat_room/ChatRoom';
import Adivinator from './components/adivinator/Adivinator';
function App() {
  return (
    <div>
      <div data-cy='issue1'>
        <h1>Ejercicio 1</h1>
        <div data-cy='issue1div'>
          Hola mundo
        </div>
      </div>
      <div data-cy='issue2'>
        <h1>Ejercicio 2</h1>
        <p>3 interesantes presidentes de EE.UU.</p>
        <ul data-cy='issue2list'>
          <li>James Madison</li>
          <li>John Tyler</li>
          <li>Theodore Roosevelt</li>
        </ul>
      </div>
      <div data-cy='issue3'>
        <h1>Ejercicio 3</h1>
        <SimpleTable />
      </div>
      <div data-cy='issue4'>
        <h1>Ejercicio 4</h1>
        <SimpleFigure />
      </div>
      <div data-cy='issue5'>
        <h1>Ejercicio 5</h1>
        <SimpleMenu />
      </div>
      <div data-cy='issue6'>
        <h1>Ejercicio 6</h1>
        <Welcome name='Alice' />.
      </div>
      <div data-cy='issue7'>
        <h1>Ejercicio 7</h1>
        <Welcome name='Marge' />
        <Welcome />
      </div>
      <div data-cy='issue8'>
        <h1>Ejercicio 8</h1>
        <AttendanceControlTable />.
      </div>
      <div data-cy='issue9'>
        <h1>Ejercicio 9</h1>
        <MultiplicationTable number='1' />.
      </div>
      <div data-cy='issue10'>
        <h1>Ejercicio 10</h1>
        <h2>MARZO</h2>
        <h3>2023</h3>
        <CalendarMonth startWeekDay={2} numberOfDays={31} />
      </div>
      <div data-cy='issue11'>
        <h1>Ejercicio 11</h1>
        <Counter />
      </div>
      <div data-cy='issue12'>
        <h1>Ejercicio 12</h1>
        <BetterCounter />
      </div>
      <div data-cy='issue13'>
        <h1>Ejercicio 13</h1>
        <BetterCounter startValue={87} />
      </div>
      <div data-cy='issue14'>
        <h1>Ejercicio 14</h1>
        <EvenBetterCounter startValue={0} minValue={0} maxValue={3} />
      </div>
      <div data-cy='issue15'>
        <h1>Ejercicio 15</h1>
        <BestCounter startValue={0} minValue={0} maxValue={3} />
      </div>
      <div data-cy='issue16'>
        <h1>Ejercicio 16</h1>
        <SimpleMessagesList />
      </div>
      <div data-cy='issue17'>
        <h1>Ejercicio 17</h1>
        <ChatRoom />
      </div>
      <div data-cy='issue18'>
        <h1>Ejercicio 18</h1>
        <Adivinator />
      </div>
    </div >
  );
}
export default App;