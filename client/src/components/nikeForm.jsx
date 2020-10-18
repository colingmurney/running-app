import React, { Component } from 'react';

class NikeForm extends Component {
    state = {  }

    onSubmit = async (e) => {
        e.preventDefault();
        this.props.handleSubmit(this.token.value.trim())
        }

    render() { 
        return (
        <div>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Token</label>
                    <input
                        className="form-control"
                        placeholder="Bearer Token"
                        type="text"
                        name="token"
                        ref={(input) => (this.token = input)}
                        autoComplete="off"
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-2">
                    Get activities
                </button>
            </form>
            <p>
                <a href="https://yasoob.me/posts/nike-run-club-data-visualization/">
                    Instructions for retreiving token
                </a>
            </p>
        </div>
          );
    }
}
 
export default NikeForm;