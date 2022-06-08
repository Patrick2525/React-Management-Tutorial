import Reac, {useState} from 'react'
import {post} from 'axios';

function CustomerAdd() {
    const [state, setState] = useState({
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: ''
    })

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addCustomer() 
            .then((response) => {
                console.log(response.data);
            })
        setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
        window.location.reload();
    }

    const handleFileChange = (e) => {
        setState({
            file: e.target.files[0],
            fileName: e.target.value,
        })
    }
    
    const handleValueChange = (e) => {
        // let nextState = {};
        // nextState[e.target.name] = e.target.value;
        // setState(nextState);
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




    return (
    <form onSubmit={handleFormSubmit}>
        <h1>고객 추가</h1>
        프로필 이미지: <input type="file" name="file" file={state.file} value={state.fileName||''} onChange={handleFileChange}/><br/>
        이름: <input type="text" name="userName" value={state.userName||''} onChange={handleValueChange}/><br/>
        생년월일: <input type="text" name="birthday" value={state.birthday||''} onChange={handleValueChange}/><br/>
        성별: <input type="text" name="gender" value={state.gender||''} onChange={handleValueChange}/><br/>
        직업: <input type="text" name="job" value={state.job||''} onChange={handleValueChange}/><br/>
        <button type="submit">추가하기</button>
    </form>
  )
}

export default CustomerAdd