import React, { Component } from 'react';

class SelectAllButton extends Component {
    
    render() { 
        return (
            <button className="btn btn-primary btn-sm mr-2 custom-width" onClick={this.props.handleSelectAll}>Select All</button>
          );
    }
}
 
export default SelectAllButton;