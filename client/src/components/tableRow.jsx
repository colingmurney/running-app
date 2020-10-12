import React, { Component } from 'react';

class TableRow extends Component {
    state = {  }
      
    render() { 

        const {activity} = this.props;
        return ( 
            <tr>
              <td>{activity.external_id}</td>
              <td>{activity.name}</td>
              <td>{activity.type}</td>
              <td>{activity.start_date_local}</td>
              <td>{activity.distance}</td>
              <td>{activity.moving_time}</td>
              <td>{activity.total_elevation_gain}</td>
              <td>{activity.average_heartrate}</td>
            </tr>
         );
    }
}
 
export default TableRow;