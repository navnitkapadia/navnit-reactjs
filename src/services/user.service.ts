import axios from 'axios';
import { User } from '../types/UserModel';

const url = process.env.REACT_APP_API_URL;

export const GetToken = async (user: User) => {
    const { data } = await axios.post<any>(`${url}/api/users/`, {...user});
    if ( data ) {
        localStorage.setItem('token', data.token)
        return data.token;
    };
    return '';
}

export const getGithubAvatar = async (githubName: string) => {
    const { data } = await axios.get(`https://api.github.com/users/${githubName}`);
    return data;
}