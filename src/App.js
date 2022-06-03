import React from "react";
import './App.css';
import Customer from './components/Customer';

const customers = [{
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': '홍길동', 
  'birthday': '961222',
  'gender': '남자',
  'job': '대학생'
},{
  'id': 2,
  'image': 'https://placeimg.com/64/64/2',
  'name': '나상진', 
  'birthday': '780322',
  'gender': '남자',
  'job': '프로그래머'
},{
  'id': 3,
  'image': 'https://placeimg.com/64/64/3',
  'name': '최의진', 
  'birthday': '870625',
  'gender': '남자',
  'job': '의사'
}]

function App() { // App.js => 실질적으로 웹사이트의 화면에 대한 내용 출력을 담당하는 부분
  return (
    <div>
      {
        customers.map(c => {
          return (
            <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>
          )
        })
      }
    </div>
  );
}

export default App;
