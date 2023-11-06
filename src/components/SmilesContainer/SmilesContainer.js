import React, { Component } from "react";
import "./smiles-container.css";
import SmilesList from "../SmilesList/SmilesList";

class SmilesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            smiles: SmilesList,
            winner: null,
        };
    }

    handleVote = (id) => {
        const updatedSmiles = this.state.smiles.map((smile) =>
            smile.id === id ? { ...smile, count: (smile.count || 0) + 1 } : smile
        );
        this.setState({ smiles: updatedSmiles });
    };

    handleShowResults = () => {
        const maxCount = Math.max(...this.state.smiles.map((smile) => smile.count || 0));
        const winningSmile = this.state.smiles.find((smile) => (smile.count || 0) === maxCount);
        this.setState({ winner: winningSmile });
    };

    render() {
        return (
            <div className="smiles-container">
                <h1>Список смайликів</h1>
                <ul className="smiles-list">
                    {this.state.smiles.map((smile) => (
                        <li key={smile.id} onClick={() => this.handleVote(smile.id)}>
                            {smile.symbol} ({smile.count || 0})
                        </li>
                    ))}
                </ul>
                <button onClick={this.handleShowResults}>Show Results</button>
                {this.state.winner && (
                    <div className="winner">Переможець: {this.state.winner.symbol}</div>
                )}
            </div>
        );
    }
}

export default SmilesContainer;
