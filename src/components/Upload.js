import { useState, useEffect } from 'react';
import axios from 'axios';

import { useRefreshMutation } from '../store/refreshApiSlice';

const Upload = () => {

    const [selectedFile, setSelectedFile] = useState([]);
    const [progress, setProgress] = useState();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [refresh, ] = useRefreshMutation();
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        const refreshTokenF = async () => {
            const userData = await refresh().unwrap();
            localStorage.setItem("accessToken", userData.accessToken);
        }
        refreshTokenF();
    }, [token, refresh]);

    const formOnSubmit = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("file", selectedFile[0]);

        try {
            await axios.post(process.env.REACT_APP_BASEURL + '/upload_file', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                },
                onUploadProgress: data => {
                    setProgress(Math.round((100 * data.loaded) / data.total))
                },
            })
        } catch (err) {
            console.log(err);
        }
    }
    const handleTitleInput = (e) => setTitle(e.target.value);
    const handleDescriptionInput = (e) => setDescription(e.target.value);

    return (
        <form onSubmit={formOnSubmit}>
            <input type="text" name="title" placeholder='Название' value={title} onChange={handleTitleInput} required />
            <textarea name="textarea" placeholder='Описание' value={description} onChange={handleDescriptionInput} required />
            <label>
                <input type="file" accept=".mp4" name="file" onChange={(e) => setSelectedFile(e.target.files)} required />          
            </label>
            <button>Submit</button>
            { progress ? <progress id="file" max="100" value={progress}> `${progress}%` </progress> : '' }
        </form>
    )
}

export default Upload