import React, { Component } from 'react';
//import {convertMsg} from "../utils/stepMessages"

class SelectAllButton extends Component {
    
    render() { 
        const {handleSelectAll, activities} = this.props
        return (
            <button
                className="btn btn-primary btn-sm mr-2 custom-width"
                onClick={handleSelectAll}
                disabled={!(activities && activities.length)}>
                    Select All
                    </button>
          );
    }
}
 
export default SelectAllButton;