import React from 'react'
import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

function CustomerDelete(props) {
    const [state, setState] = useState({ 
        open : false
    })

    const handleClickOpen = () => {
        setState({
            open: true
        })
    }

    const handleClose = () => {
        setState({
            open: false
        })
    }


    const deleteCustomer = (id) => {
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        props.stateRefresh();
    }


    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>삭제</Button>
            <Dialog open={state.open} onClose={handleClose}>
                <DialogTitle onClick={handleClose}>
                    삭제경고
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 고객 정보가 삭제됩니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={(e)=> {deleteCustomer(props.id)}}>삭제</Button> 
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button> 
                </DialogActions>
            </Dialog>
        </div>
        //<button onClick={(e) => {deleteCustomer(props.id)}}>삭제</button>
  )
}


export default CustomerDelete