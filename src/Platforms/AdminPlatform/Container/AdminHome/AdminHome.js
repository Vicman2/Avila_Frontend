import React, { Component } from 'react'
import './AdminHome.css'
import CountCard from '../../Components/CountCard/CountCard'
import Chart from 'chart.js'
import LineGraph from '../LineGraph/LineGraph'
import ProgressBar from '../../Components/ProgressBar/ProgressBar'

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
                    <ProgressBar 
                    number={activity.num}
                    total={activity.total}
                    fillerColor={activity.fillerColor}
                    name={activity.name}
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
               </div>
            </div>
        )
    }
}

export default AdminHome