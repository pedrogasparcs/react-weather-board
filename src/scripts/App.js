/**
 * Created by PedroGaspar on 09/07/16.
 */
import React, { Component } from 'react';

import Search from './components/Search';
import WeatherBoard from './components/WeatherBoard';
import {ajax} from './helpers/sxp';

let Config = require('Config');
let styles = require('../styles/main.sass');

export default class App extends Component {
    constructor () {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            weatherResults: []
        }
    }
    /**
     *
     * @param searchValue
     */
    handleSubmit (searchValue) {
        let i, now = new Date().getTime(), tenMinutes = 10*60*1000;
        let cities = searchValue.split(",");
        /*
        trim terms
         */
        cities = cities.map ((term) => term.trim());
        /*
        remove results not queried or 10-minutes older
         */
        this.state.weatherResults = this.state.weatherResults.filter( (weatherResult) => {
            return !!cities.find((cityTerm) => cityTerm == weatherResult.search) && (now - weatherResult.ts) < tenMinutes;
        });
        this.setState ({weatherResults: this.state.weatherResults});
        /*
        don't query terms with valid results on show
         */
        cities = cities.filter((cityTerm) => {
            return !this.state.weatherResults.find((weatherResult) => cityTerm == weatherResult.search);
        });
        /*
        query API
         */
        cities.map ((term) =>  {
            this.getWeatherInfo(term);
        });
    }

    /**
     * 
     * @param cityQuery
     */
    getWeatherInfo (cityQuery) {
        //console.log ("query city", cityQuery);
        let call = ajax ("http://api.openweathermap.org/data/2.5/weather?APPID=" + Config.weather.apiKey + "&units=metric&q=" + cityQuery, null, "get", true).
        then(
            (data) => {
                let ret = this.state.weatherResults;
                if(data.cod == 200) {
                    /*
                    evaluate if cityTerm is already loaded;
                    this can happen due to different queries returning the same city
                     */
                    this.state.weatherResults.find((item) => item.weather.name == data.name) || ret.push({search:cityQuery, ts:new Date().getTime(), weather: data});
                }
                else {
                    /*
                    remove term
                     */
                }
                this.setState({
                    weatherResults: ret
                });
            },
            (error) => {
                console.warn('weather error', error);
            }
        );
    }
    render () {
        return (
            <div className="container">
                <div className="search-container">
                    <Search
                        onSubmit={this.handleSubmit}
                    />
                </div>
                <div className="board-container">
                    <div className="board-wrapper">
                        <WeatherBoard
                            items={this.state.weatherResults}
                        />
                    </div>
                </div>
            </div>
        );
    }
}