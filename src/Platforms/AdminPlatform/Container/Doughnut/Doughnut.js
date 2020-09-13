import React, {Component} from 'react'
import { Doughnut} from 'react-chartjs-2'
import './Doughnut.css'

class DoughnutModel extends Component{
    state= {
        dataSet: [this.props.dataset]
    }
    render(){
        return(
            <div className="Doughnut">
                <p className="Doughnut_Price">#{this.props.price} </p>
                <div className="Doughnut_Rings">
                    <Doughnut
                    data= {{
                        datasets: this.state.dataSet, 
                    }}
                    height={50}
                    options= {{
                        maintainAspectRatio: false, 
                        cutoutPercentage: 70, 
                        rotation: this.props.rotation
                    }}
                    />
                </div>
                <div className="Doughnut_Month">{this.props.month} </div>
            </div>
        )
    }
}


export default DoughnutModel