import React, { Component } from 'react'
import './AdminHome.css'
import CountCard from '../../Components/CountCard/CountCard'
import Chart from 'chart.js'
import LineGraph from '../LineGraph/LineGraph'
import ProgressBar from '../../Components/ProgressBar/ProgressBar'
import Doughnut from '../Doughnut/Doughnut'
import ProgressVertical from '../../Components/ProgressVertical/ProgressVertical'

class AdminHome extends Component{
    state = {
        countCards:[
            {name: "Total sales", number : 49034 }, 
            {name: "Total users", number : 50040 }, 
            {name: "Products", number : 1004 }, 
            {name: "Income amount", number : "#190480"}, 
        ], 
        monthlyActivity: [
            {num: 167, total: 230, fillerColor: "#852773", name:"Total Order"}, 
            {num: 57, total: 130, fillerColor: "#27854D", name:"Completed"}, 
            {num: 70, total: 110, fillerColor: "#38BE6E", name:"Inprogress"}, 
            {num: 40, total: 150, fillerColor: "#F02929", name:"Cancelled"}, 
        ], 
        profit : [
            {
                price: "79k",
                month: "June",
                rotation: -0.2, 
                dataSet: {
                    data: [80, 20], 
                    backgroundColor: ["#852773", "#C4C4C4"]
                }
            },
            {
                price: "32k",
                month: "July",
                rotation: -1,
                dataSet:  {
                    data: [75, 35], 
                    backgroundColor: ["#BE38A4", "#C4C4C4"]
                }
            }, 
            {
                price: "51k",
                month: "August",
                rotation: 1.5,
                dataSet: {
                    data: [30, 80], 
                    backgroundColor: ["#84BE38", "#C4C4C4"]
                }
            }
        ], 
        reviewProgress: [
            {num: 6607, total: 10000, fillerColor: "#27854D", name:"Positive"},
            {num: 3807, total: 7000, fillerColor: "#F02929", name:"Negative"}
        ], 
        dailySales : [
            {num: 167, total: 230, name:"M"}, 
            {num: 57, total: 130, name:"T"}, 
            {num: 70, total: 110, name:"W"},
            {num: 167, total: 230, name:"T"}, 
            {num: 57, total: 130, name:"F"}, 
            {num: 70, total: 110, name:"S"}, 
            {num: 167, total: 230, name:"S"}
        ]
    }
    render(){
        let counts = null
        if(this.state.countCards.length > 0){
            counts = this.state.countCards.map(count => {
                return(
                    <CountCard
                    name={count.name}
                    number={count.number}
                    />
                )
            })
        }

        let progressActivity = null 
        if(this.state.monthlyActivity.length> 0){
            progressActivity = this.state.monthlyActivity.map(activity => {
                return(
                    <div className="ProgressSpace">
                        <ProgressBar 
                        number={activity.num}
                        total={activity.total}
                        fillerColor={activity.fillerColor}
                        name={activity.name}
                        />
                    </div>
                ) 
            }) 
        }
        let profitRating = null
        if(this.state.profit.length > 0){
            profitRating = this.state.profit.map(profit => {
                return(
                    <Doughnut
                    month={profit.month} 
                    price={profit.price}
                    dataset= {profit.dataSet}
                    rotation={profit.rotation}
                    />
                )
            })
        }
        let reviewProgresss = null;
        if(this.state.reviewProgress.length > 0){
            reviewProgresss = this.state.reviewProgress.map(prog => {
                return(
                    <ProgressBar
                    number={prog.num}
                    total={prog.total}
                    fillerColor={prog.fillerColor}
                    name={prog.name}
                    />
                )
            })
        }
        let dailySales = null;
        if(this.state.dailySales.length > 0){
            dailySales = this.state.dailySales.map(daily => {
                return(
                    <ProgressVertical 
                    number={daily.num}
                    total={daily.total}
                    name={daily.name}
                    />
                )
            })
        }

        return(
            <div className="AdminHome">
               <div className="AdminHome_Cards">
                    {counts}
                    <LineGraph />
               </div>
               <div className="AdminHome_Activities">
                   <div className="AdminHome_Activity1">
                       <p className="AdminHome_Activities_Text">Monthly Sales Activity</p>
                        {progressActivity}
                   </div>
                   <div className="AdminHome_Activity2">
                       <div className="AdminHome_Activity2_a">
                           <p className="AdminHome_Activities_Text">Profit</p>
                           <div className="AdminHome_Activity2Rates">
                            {profitRating}
                           </div>
                       </div>
                       <div className="AdminHome_Activity2_b">
                           <p className="AdminHome_Activities_Text">Registration</p>
                           <p className="AdminHome_regNumber">120</p>
                           <p className="AdminHome_New_Account">New Accounts</p>
                       </div>
                   </div>
                   <div className="AdminHome_Activity3">
                       <div className="AdminHome_Review">
                            <p className="AdminHome_Activities_Text">Reviews</p>
                            <p className="AdminHome_Review_num">10k</p>
                       </div>
                       <div className="AdminHome_Review_Prog">
                            {reviewProgresss}
                       </div>
                       <div className="DailySales">
                           <p className="AdminHome_Activities_Text"> Sales</p>
                           <p className="AdminHome_Sales_Calc">calculated in 7 days</p>
                           <div className="DailyScaling">
                                {dailySales}
                           </div>
                       </div>
                   </div>
               </div>
            </div>
        )
    }
}

export default AdminHome