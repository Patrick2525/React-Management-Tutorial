import Reac, {useState} from 'react'
import {post} from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    hidden: {
        display: 'none'
    }
}))


function CustomerAdd(props) {
    const [state, setState] = useState({
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: '',
        open : false
    })

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addCustomer() 
            .then((response) => {
                console.log(response.data);
                props.stateRefresh();
            })
        setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    const handleFileChange = (e) => {
        setState((prevState) => ({
            ...prevState,
            file: e.target.files[0],
            fileName: e.target.value
        }))
    }
    
    const handleValueChange = (e) => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const addCustomer = () => {
        const url = 'api/customers';
        const formData = new FormData();
        formData.append('image', state.file);
        formData.append('name', state.userName);
        formData.append('birthday', state.birthday);
        formData.append('gender', state.gender);
        formData.append('job', state.job);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    const handleClickOpen = () => {
        setState((prevState) => ({
            ...prevState,
            open: true
        }))
    }

    const handleClose = () => {
        setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    const classes = useStyles();

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                고객 추가하기
            </Button>
            <Dialog open={state.open} onClose={handleClose}>
                <DialogTitle>고객 추가</DialogTitle>
                <DialogContent>
                    <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={state.file} value={state.fileName||''} onChange={handleFileChange}/><br/>
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {state.fileName === "" ? "프로필 이미지 선택" : state.fileName}
                        </Button>
                    </label>
                    <br/>
                    <TextField label="이름" type="text" name="userName" value={state.userName||''} onChange={handleValueChange}/><br/>
                    <TextField label="생년월일" type="text" name="birthday" value={state.birthday||''} onChange={handleValueChange}/><br/>
                    <TextField label="성별" type="text" name="gender" value={state.gender||''} onChange={handleValueChange}/><br/>
                    <TextField label="직업" type="text" name="job" value={state.job||''} onChange={handleValueChange}/><br/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleFormSubmit}>추가</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    // <form onSubmit={handleFormSubmit}>
    //     <h1>고객 추가</h1>
    //     프로필 이미지: <input type="file" name="file" file={state.file} value={state.fileName||''} onChange={handleFileChange}/><br/>
    //     이름: <input type="text" name="userName" value={state.userName||''} onChange={handleValueChange}/><br/>
    //     생년월일: <input type="text" name="birthday" value={state.birthday||''} onChange={handleValueChange}/><br/>
    //     성별: <input type="text" name="gender" value={state.gender||''} onChange={handleValueChange}/><br/>
    //     직업: <input type="text" name="job" value={state.job||''} onChange={handleValueChange}/><br/>
    //     <button type="submit">추가하기</button>
    // </form>
  )
}

export default CustomerAdd