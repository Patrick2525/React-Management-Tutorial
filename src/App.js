import logo from './logo.svg';
import './App.css';

function App() { // App.js => 실질적으로 웹사이트의 화면에 대한 내용 출력을 담당하는 부분
  return (
    <div className="gray-background">
     <img src={logo} alt='logo'/>
     <h2>Let's develop management system!</h2>
    </div>
  );
}

export default App;
