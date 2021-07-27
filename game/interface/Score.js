import React from 'react'
import ReactDOM from 'react-dom'

class Score extends React.Component {
    render() {
        return (
            <div className="scoreWrap">Score: {this.props.score}</div>
        )       
    }
}

export default Score
