import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import apiReq from '../../services/apiReq';

import Button from '../../components/Button';
import Input from '../../components/Input';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const token = localStorage.getItem('token');


    if(token) {
        history.push('/explore');       
    }

    async function handleLogin(e) {
        document.getElementById('error').style.display = 'none';
         
        const data = {email, password};
        e.preventDefault();

        try{
            const response = await apiReq.post('/login', data);
            const token = response.data.token;
            console.log(token);
            localStorage.setItem('token', token);
            history.push('/explore');
        } catch(err) {
            document.getElementById('error').style.display = 'block';
            return;
        }
    }

    return (
        <div className="login-container">
            <img src={logoImg} alt="Weather Now" />
            <form onSubmit={handleLogin}>
                <h1>Faça seu login</h1>
                <Input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Digite seu e-mail" />
                <Input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Digite sua senha" />
                <span id="error" style={{ color: '#f00', display: 'none'}}>Login Inválido!</span>
                <Button type="submit">Acessar</Button>
                <Link className="icon-link" to="/signup">
                    <FiLogIn size={18} color="red"/>
                    Criar cadastro
                </Link>
            </form>
        </div>
    )
}