import React from "react";
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
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
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
}))



function App() { // App.js => 실질적으로 웹사이트의 화면에 대한 내용 출력을 담당하는 부분
  const classes = useStyles();

  const [state, setState] = useState({
    customers: "",
    completed: 0
  });

  const stateRefresh = () => {
    setState({
      customers: "",
      completed : 0
    });
    callApi()
      .then(res => {
        setState({customers: res});
      })
      .catch(err => console.log(err));
  }

  const { customers } = state;
  
  useEffect(() => {
    let timer = setInterval(progress, 20);
    callApi()
      .then(res => {
        setState({customers: res});
        clearInterval(timer);
      })
      .catch(err => console.log(err));
  },[])


  const callApi = async () => {
    const response = await fetch('api/customers');
    const body = await response.json();
    return body;
  }

  const progress = () => {
    const {completed} = state;
    console.log("test completed: "+completed);
    setState((prevState) => ({ ...prevState, completed: completed >= 100 ? 0 : completed + 1}));
  }


  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
              <TableCell>설정</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers ? customers.map( c => 
              {return ( <Customer stateRefresh={stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/> )
            }) : 
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={state.completed}/>
                </TableCell>
              </TableRow>
              }
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh={stateRefresh}/>
    </div>
  );
}

//export default withStyles(useStyles)(App);
export default App;

