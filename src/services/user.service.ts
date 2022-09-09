import axios from 'axios';
import { User } from '../types/UserModel';

const url = process.env.REACT_APP_API_URL;

export const getToken = async (user: User) => {
    const { data: {token} } = await axios.post<{email: string;fullName: string;message: string; token: string}>(`${url}/api/users/`, {...user});
    if ( token ) {
        localStorage.setItem('token', token)
        return token;
    };
    return '';
}

export const getGithubAvatar = async (githubName: string) => {
    const { data } = await axios.get(`https://api.github.com/users/${githubName}`);
    return data;
}