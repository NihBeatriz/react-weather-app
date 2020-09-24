import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';
import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';
export default class SignUp extends React.Component {
    state = {
        email: "",
        password: "",
        passwordOk: "",
    };

    signUp = async e => {
        const { email, password, passwordOk } = this.state;
        
        e.preventDefault();
        console.log(email)
        console.log(password)
        console.log(passwordOk)

        if (!email || !password || !passwordOk) {
            this.setState({ erro: "Preencha todos os campos!" });
        } else if(password !== passwordOk) {
            this.setState({ erro: "As senhas não conferem!" });
        } else {
            try {
                await axios.post(`https://reqres.in/api/register`, {
                    email: email,
                    password: password
                }, {
                    crossDomain: true
                }).then(result => {
                    if (result.request.status === 200){
                        localStorage.setItem('token', result.data.token)
                        this.props.history.push("/")
                    }
                })
            } catch (err) {
                this.setState({ erro: "Erro ao cadastrar!"});
            }
        } 
    }

    render() {
        localStorage.setItem('token', "");

        return (
            <div className="signup-container">
                <div className="content">
                    <section className="">
                    <img src={logoImg} alt="Weather Now"/>
                    <h1>Cadastro</h1>
                    <Link className="icon-link" to="/">
                        <FiArrowLeft size={18} color="red"/>
                        Voltar para a página de Login 
                    </Link>
                    </section>
                    <form onSubmit={this.signUp}>
                        <Input value={this.state.email} onChange={e => this.setState({ email: e.target.value })} type="email" placeholder="Digite seu e-mail"/>
                        <Input value={this.state.password} onChange={e => this.setState({ password: e.target.value })} type="password" placeholder="Digite a senha" />
                        <Input value={this.state.passwordOk} onChange={e => this.setState({ passwordOk: e.target.value })} type="password" placeholder="Confirme a senha" />
                        <span value={this.state.erro} className="error">{this.state.erro}</span>
                        <Button type="submit">Cadastrar</Button>
                    </form>
                </div>
            </div>
        )
    }
}