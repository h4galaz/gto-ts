import React from 'react';
import { House } from '../service/types/House.type';

import './Dashboard.css'

type DashboardProps = {
  servicedata: Array<House>,
  showDetailFunc: (n: number) => void,
}

type DashboardState = {
    page: number
};


//Class component
export class Dashboard extends React.Component<DashboardProps, DashboardState> {
  state = {
    // optional second annotation for better type inference
    page: 1
  };

  render() {
    return (
      <>
        <div className="HouseDashboard">
          {this.props.servicedata.map((el,index) => {
            //define Dashboard house crests
            let crest = process.env.PUBLIC_URL+"images/Crests/"+el.name.split(' ').slice(0,2).join('_')+".svg";
            //fallback if no coat of arms is available the crest is unknown (also switch between normal crest and dorne crest)
            if(el.coatOfArms === ""){
              crest = `${process.env.PUBLIC_URL}images/Crests/None${el.region === "Dorne"?"_(Dorne)":""}.svg`;
              el.coatOfArms = "Unknown Coat of arms";
            }
            return (
                <div key={index} className="house" onClick={() => this.props.showDetailFunc(index)}>
                  <span>{el.name}</span>
                  <img className={`crest ${el.region.replace(/\s/g,"_")}`} src={crest} alt={el.coatOfArms} />
                </div>
              );
          })}
        </div>
      </>
    );
  }
}