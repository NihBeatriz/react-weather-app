import React, { useState, useEffect } from 'react';
import { FiPower } from 'react-icons/fi';

import apiWeather from '../../services/apiWeather';

import './styles.css';

export default function Explore() {
    const [cityName, setCityName] = useState('');
    const [repositories, setRepositories] = useState([]);
    const iconUrl ='http://openweathermap.org/img/w/';
    const format= '.png';

    
    
    useEffect(() => {
        localStorage.setItem(
          '@WeatherNow:repositories',
          JSON.stringify(repositories),
        );
      }, [repositories]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!cityName) {
            alert('Digite o nome de uma cidade');
            return;
        }

        if (cityName.length <= 3) {
            alert('O nome da cidade deve ter mais de três letras');
            return;
        }

        try {
            const response = await apiWeather.get(`/weather?q=${cityName}&appid=83a9db599874d9f5683e2016c92ae339`);
            console.log(response.data);
            setRepositories([...repositories, response.data]);
            setCityName('');
        } catch (err) {
            console.log(err);
        }

    }

    return (

        <div className="explore-container">
            <header>
                <button type="button">
                    <FiPower size={18} color="red" />
                </button>
            </header>

            <h1>Veja o tempo agora ao redor do mundo</h1>
            <form onSubmit={handleSubmit}>
                <input value={cityName} onChange={e => setCityName(e.target.value)} placeholder="Nome da cidade"></input>
                <button type="submit">Pesquisar</button>
            </form>



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