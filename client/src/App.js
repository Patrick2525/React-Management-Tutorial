import React from "react";
import Customer from './components/Customer';
import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useState, useEffect } from 'react';
//import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit * 3, => 어떻게 적용해야할까???
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  }
}))



function App() { // App.js => 실질적으로 웹사이트의 화면에 대한 내용 출력을 담당하는 부분
  const classes = useStyles();

  const [state, setState] = useState({
    customers: ""
  });
  const {customers} = state;


  useEffect(() => {
    callApi()
      .then(res => setState({customers: res}))
      .catch(err => console.log(err));
  },[])
  console.log(`state.customers : ${state.customers}`);

  const callApi = async () => {
    const response = await fetch('api/customers');
    const body = await response.json();
    return body;
  }


  return (
    <Paper /*className={classes.root}*/>
      <Table /*className={classes.table}*/>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers ? customers.map( c => {return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/> )
          }) : ""}
        </TableBody>
      </Table>
    </Paper>
  );
}

//export default withStyles(useStyles)(App);
export default App;

