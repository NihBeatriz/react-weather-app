import React, { useState, useEffect } from 'react';
import { FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import apiWeather from '../../services/apiWeather';

import './styles.css';

export default function Explore() {
    const [cityName, setCityName] = useState('');    
    const iconUrl ='http://openweathermap.org/img/w/';
    const format= '.png';
    const history= useHistory();
    const [isLoading, setisLoading] = useState('');
    const token = localStorage.getItem('token');
    const [repositories, setRepositories] = useState(() => {
        const storagedRepositories = localStorage.getItem('@WeatherNow:repositories');
        if(storagedRepositories) {
            return JSON.parse(storagedRepositories);
        }
        return [];
    });

    if(!token) {        
        history.push('/');
    }
    
    useEffect(() => {
        localStorage.setItem(
          '@WeatherNow:repositories',
          JSON.stringify(repositories),
        );
      }, [repositories]);

    async function handleSubmit(e) {
        document.getElementById('errorCityNull').style.display = 'none';
        document.getElementById('errorCitySize').style.display = 'none';
        document.getElementById('error').style.display = 'none';

        e.preventDefault();

        if (!cityName) {
            document.getElementById('errorCityNull').style.display = 'block';
            return;
        }

        if (cityName.length <= 3) {
            document.getElementById('errorCitySize').style.display = 'block';
            return;
        }

        try {
            setisLoading('Carregando...');
            const response = await apiWeather.get(`/weather?q=${cityName}&appid=83a9db599874d9f5683e2016c92ae339`);            
            setRepositories([...repositories, response.data]);
            setCityName('');
            setisLoading('');
        } catch (err) {
            document.getElementById('error').style.display = 'block';
            return;
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="explore-container">
            <header>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="red" />
                </button>
            </header>

            <h1>Veja o tempo agora ao redor do mundo</h1>

            <form onSubmit={handleSubmit}>
                <input value={cityName} onChange={e => setCityName(e.target.value)} placeholder="Nome da cidade"></input>
                <button type="submit">Pesquisar</button>       
            </form>
            
            <span id="errorCityNull" style={{ color: '#f00', display: 'none'}}>Digite o nome de uma cidade!</span>
            <span id="errorCitySize" style={{ color: '#f00', display: 'none'}}>O nome da cidade deve ter mais de três letras!</span>
            <span id="error" style={{ color: '#f00', display: 'none'}}>Cidade não encontrada!</span>

            <div className="load"> {isLoading} </div>

            <ul className="result" id="result">
                {repositories.map((repository) => (
                    <li key={repository.id}>
                        <img src={iconUrl.concat(repository.weather[0].icon, format)} alt="Tempo" />
                        <div>
                            <strong>{repository.name}</strong>
                            <p>{repository.weather[0].description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

/* codigo que tentei alterar
import React from 'react';
import axios from 'axios';
import { FiPower } from 'react-icons/fi';

import './styles.css';

export default class Explore extends React.Component {

    constructor(){
        super();

        this.state = {
            city: '',
           // iconUrl: 'http://openweathermap.org/img/w/',
            //format: '.png',
           //isLoading: ''
           //const [repositories, setRepositories] = useState(() => {
            //   const storagedRepositories = localStorage.getItem('@WeatherNow:repositories');
            //    if(storagedRepositories) {
            //        return JSON.parse(storagedRepositories);
            //    }
            //    return [];
            //});
        }
    }
    
    //useEffect(() => {
    //    localStorage.setItem(
    //      '@WeatherNow:repositories',
    //      JSON.stringify(repositories),
    //    );
    //  }, [repositories]);

    explore = async e => {

        e.preventDefault();
        let cityName = document.getElementById('cityName');

        if (!cityName) {
            this.setState({ erro: "Digite o nome de uma cidade!" })
        } else if (cityName.length <= 3) {
            this.setState({ erro: "O nome da cidade deve ter mais de 3 letras!" })
        } else {
            try {
                setisLoading('Carregando...');
                let response = `/weather?q=${city}&appid=83a9db599874d9f5683e2016c92ae339`;
                axios.get(response)           
                setRepositories([...repositories, response.data]);
                this.setState({ city: '' })
                this.setState({ isLoading: '' })
            } catch (err) {
                this.setState({ erro: "Cidade não encontrada!" });
            }
        }
    }
    //ok
    close = async e => {
        localStorage.clear()
        this.props.history.push("/")
    }

    render() {
        localStorage.setItem('token', "");

        return (
            <div className="explore-container">
                <header>
                    <button onClick={this.close} type="button">
                        <FiPower size={18} color="red" />
                    </button>
                </header>
                <h1>Veja o tempo agora ao redor do mundo</h1>
                <form onSubmit={this.explore}>
                    <input id="cityName" value={this.state.city} onChange={e => this.setState({ city: e.target.value })} placeholder="Nome da cidade"></input>
                    <button type="submit">Pesquisar</button>       
                </form>
                <span value={this.state.erro} className="error">{this.state.erro}</span>
            </div>
        )
    }
}*/