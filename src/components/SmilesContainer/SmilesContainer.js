import React, { Component } from "react";
import "./smiles-container.css";
import SmilesList from "../SmilesList/SmilesList";

class SmilesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            smiles: SmilesList,
            winners: [],
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
        const winningSmiles = this.state.smiles.filter((smile) => (smile.count || 0) === maxCount);
        this.setState({ winners: winningSmiles });
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
                {this.state.winners.length > 0 && (
                    <div className="winners">
                        <h2>Переможці:</h2>
                        <ul>
                            {this.state.winners.map((winner) => (
                                <li key={winner.id}>{winner.symbol}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

export default SmilesContainer;

