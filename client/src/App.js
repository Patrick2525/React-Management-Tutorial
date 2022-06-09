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
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

//
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
//



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
    completed: 0,
    searchKeyword: ""
  });

  const stateRefresh = () => {
    setState({
      customers: "",
      completed : 0,
      searchKeyword: ""
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
      // .then(res => {
      //   setState(prevState => ({
      //     ...prevState,
      //     customers:res
      // }))
      //   clearInterval(timer);
      // })
      // .catch(err => console.log(err));
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

  const handleValueChange = (e) => {
    setState(prevState => ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
}
  
  const filteredComponents = (data) => {
    data = data.filter((c) => {
      return c.name.indexOf(state.searchKeyword) > -1;
    })
    return data.map((c) => {
      return <Customer stateRefresh={stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>
    })
  }


  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              고객 관리 프로그램
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="검색하기"
                inputProps={{ 'aria-label': 'search' }}
                name="searchKeyword"
                value={state.searchKeyword}
                onChange={handleValueChange}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
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
            {
              state.customers ? 
                filteredComponents(state.customers) :
            /* {customers ? customers.map( c => 
              {return ( <Customer stateRefresh={stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/> )
            }) : */
              
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

