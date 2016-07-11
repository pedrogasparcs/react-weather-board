/**
 * Created by PedroGaspar on 09/07/16.
 */

import React, {Component, PropTypes} from 'react';

import WeatherLocation from './WeatherLocation';

class WeatherBoard extends Component {
    constructor () {
        super ();
    }
    render () {
        return (
            <div className="weather-board">
                <div className="weather-locations-container">
                {
                    this.props.items.map ( (item, index) => {
                        //console.log (item);
                        return <WeatherLocation
                            data={item.weather}
                            key={"weather-location-" + index}
                        />;
                    })
                }
                </div>
            </div>
        );
    }
}
WeatherBoard.propTypes = {
    items: React.PropTypes.array.isRequired
}
export default WeatherBoard;