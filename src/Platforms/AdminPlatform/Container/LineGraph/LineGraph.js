import React, {Component} from 'react'
import Chart from 'chart.js'
import './LineGraph.css'

class LineGraph extends Component{
    chartRef = React.createRef();
    
    componentDidMount(){
        const myChartRef = this.chartRef.current.getContext("2d");

        new Chart(myChartRef, {
            type: 'line', 
            data: {
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], 
                datasets:[
                    {
                        pointRadius: 0,
                        borderColor: "#38BE6E",
                        backgroundColor: "transparent",
                        borderWidth:2,
                        label: "Sales", 
                        data : [10, 70, 30, 40, 50, 60, 20, 45, 50, 43, 10, 55]
                    },
                    {
                        pointRadius: 0,
                        borderColor: "#BE38A4",
                        backgroundColor: "transparent",
                        borderWidth:2,
                        label: "Users", 
                        data : [40, 65, 50, 97, 35, 80, 50, 75, 62, 50, 76, 90]
                    }
                ]
            }, 
            options: {
                maintainAspectRatio: false, 
            }
        })
    }
    render(){
        return(
            <div className="LineGraph">
                <p className="LineGraph_text">Website overview</p>
                <canvas 
                id="myCart" 
                ref={this.chartRef}
                />
            </div>
        )
    }
}


export default LineGraph