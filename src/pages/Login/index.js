import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';
export default class Login extends React.Component {
    state = {
        email: "",
        password: "",
    };

    login = async e => {
        const { email, password } = this.state;

        e.preventDefault();
        console.log(email)
        console.log(password)
        
        if (!email || !password) {
            this.setState({ erro: "Preencha todos os campos!" })
        } else {
            try {
                await axios.post(`https://reqres.in/api/login`, {
                    email: email,
                    password: password
                }, {
                    crossDomain: true
                }).then(result => {
                    if (result.request.status === 200){
                        localStorage.setItem('token', result.data.token)
                        this.props.history.push("/explore")
                    }
                })
            } catch (err) {
                this.setState({ erro: "Login inválido!" })
            }
        }
    }

    render() {
        localStorage.setItem('token', "");

        return (
            <div className="login-container">
                <img src={logoImg} alt="Weather Now" />
                <form onSubmit={this.login}>
                    <h1>Faça seu login</h1>
                    <Input value={this.state.email} onChange={e => this.setState({ email: e.target.value })} type="email" placeholder="Digite seu e-mail" />
                    <Input value={this.state.password} onChange={e => this.setState({ password: e.target.value })} type="password" placeholder="Digite sua senha" />
                    <span value={this.state.erro} className="error">{this.state.erro}</span>
                    <Button type="submit">Acessar</Button>
                    <Link className="icon-link" to="/signup">
                        <FiLogIn size={18} color="red"/>
                        Criar cadastro
                    </Link>
                </form>
            </div>
        )
    }
}   