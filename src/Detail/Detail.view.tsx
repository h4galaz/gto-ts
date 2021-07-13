import React from 'react';
import { Row } from '../utils/Row';

import { House } from '../service/types/House.type';

import './Detail.view.css'

type DetailviewProps = {
  housedata: House,
  handleCloseFunc: () => void
}

export class Detailview extends React.Component<DetailviewProps, {}> {
  render() {
    //generate crest link
    let crest = process.env.PUBLIC_URL+"images/Crests/"+this.props.housedata.name.split(' ').slice(0,2).join('_')+".svg";
    return (
        <div className="House-detail">
          <span onClick={this.props.handleCloseFunc} className="close">&#8701;</span>
          <div className="header-wrapper">
            <img className="crest" src={crest} alt={this.props.housedata.coatOfArms} />
            <h1>{this.props.housedata.region}</h1>
            <h2>{this.props.housedata.name}</h2>
            {this.props.housedata.founded && <p className="founded">{this.props.housedata.founded} - {this.props.housedata.diedOut}</p>}
            {this.props.housedata.words && <q className="words">{this.props.housedata.words}</q>}
          </div>

          <div className="head-infos">
            {[{title:"Current Lord",text:this.props.housedata.currentLord},{title:"Heir",text:this.props.housedata.heir},{title:"Overlord",text:this.props.housedata.overlord}].map((el,index) => {
              return <Row key={index} title={el.title} content={el.text} />
            })}
          </div>

          <div className="listings">
            {[
                {title:"Titles",text:this.props.housedata.titles},
                {title:"Seats",text:this.props.housedata.seats},
                {title:"Ancestral Weapons",text:this.props.housedata.ancestralWeapons},
                {title:"Cadet Branches",text:this.props.housedata.cadetBranches},
                {title:"Sworn Members",text:this.props.housedata.swornMembers}
              ].map((el,index) => {
              return <Row key={index} title={el.title} content={el.text} />
            })}
          </div>
        </div>
    );
  }
}