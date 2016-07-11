/**
 * Created by PedroGaspar on 09/07/16.
 */
import React, {Component} from 'react';
let Strings = require('Strings');
class WeatherLocation extends Component {
    formatDate () {
        let date = new Date (this.props.data.dt);
        let _super, day = date.getDate();
        switch (day) {
            case 1:
                _super = "st";
                break;
            case 2:
                _super = "nd";
                break;
            case 3:
                _super = "rd";
                break;
            default:
                _super = "th";
        }
        return <span>{Strings.months[date.getMonth()]}<br/>{day}{_super}</span>
    }
    render () {
        return (
            <div className="weather-location">
                <div className="weather-contents">
                    <div className="block left-block">
                        <div className="city-name">{this.props.data.name}</div>
                        <div className="date">{this.formatDate()}</div>
                    </div>
                    <div className="block middle-block">
                        <div className="temp">{Math.round(this.props.data.main.temp)}<span className="super">{Strings.weather.tempSymbol}</span></div>
                        <div className="description">{this.props.data.weather[0].main}</div>
                    </div>
                    <div className="block right-block">
                        <div className="humidity">{Strings.weather.humidity}{this.props.data.main.humidity}%</div>
                        <div className="wind">{Strings.weather.wind}{this.props.data.wind.speed}km/h</div>
                    </div>
                </div>
            </div>
        );
    }
}
WeatherLocation.propTypes = {
    data: React.PropTypes.object.isRequired
}
export default WeatherLocation;