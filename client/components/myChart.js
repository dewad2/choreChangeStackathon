import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        datasets: [
          {
            label: "# of Votes",
            data: [this.props.complete, this.props.incomplete],
            backgroundColor: ["green", "red"]
          }
        ]
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      chartData: {
        datasets: [
          {
            label: "# of Votes",
            data: [nextProps.complete, nextProps.incomplete],
            backgroundColor: ["#31abc6", "white"],
            border: 1
          }
        ]
      }
    });
  }

  render() {
    console.log("prrooopss", this.props);
    return (
      <div className="Chart">
        <Doughnut
          data={this.state.chartData}
          options={{ animationEasing: "easeOutBounce" }}
          height={450}
          width={450}
        />
      </div>
    );
  }
}
