import React from 'react';
//custom components
import useIceAndFireApi from '../service/Service.house.api'
import { Dashboard } from '../Dashboard/Dashboard'
import { Detailview } from '../Detail/Detail.view'
import { Pageination } from '../utils/Pageination'
//custom type
import { House } from '../service/types/House.type';

import './App.css';

//assets import
import GotIcon from '../assets/icons/got-icon.svg'
import unknown from '../assets/icons/None.svg'

function App() {
  //set State
  const [page, setPage] = React.useState(1);
  const [detail, setDetail] = React.useState<House>();
  const pagesize = 10;
  //Call API service for initial use
  const service = useIceAndFireApi({
    url:"https://anapioficeandfire.com/api/houses/", 
    pagesize:pagesize, 
    page:page
  });
  //Handle Page change based on number provided
  const handlePage = (num: number) => {
    let nPage = page + num;
    if(num === Infinity){
      nPage = 45;
    }
    setPage(Math.max(Math.min(nPage,45),1))
  }
  //mock up for loading backdrop
  const mock = [];
  for(let i = 0; i < pagesize;i++){
    mock.push(<div className="mock"><img key={i} className="crest" src={unknown} alt="Unknown coats of arms" /></div>)
  }
  //set State to show Detail page
  const showDetail = (num: number) => {
    if(service.status === "loaded"){
      setDetail(service.payload[num]);
    }
  }
  //Handle detail page close
  const handleClose = () =>{
    setDetail(undefined);
  }

  return (
    //React.Fragment short syntax
    //header as well as footer for simplicity not exported
    //render Dashboard Class Component
    <>
      <header className={(service.status === "init" || service.status === "loading")?"loadingbar":""}>
        <img className="logo" src={GotIcon} alt="Game of Thrones letters as icon" />
      </header>
      <div className="App">
        {(service.status === "init" || service.status === "loading") && <div className="loading">{mock}</div>}
        {(service.status === "loaded" && !detail) && <Dashboard servicedata={service.payload} showDetailFunc={showDetail}/>}
        {detail && <Detailview housedata={detail} handleCloseFunc={handleClose}/>}
        {!detail && <Pageination page={page} handlePageFunc={handlePage}/> }
      </div>
      <footer>
        <span>done by <strong>Daniel Quaas</strong></span>
        <span><a target="_blank" rel="noreferrer" href="https://anapioficeandfire.com/">anapioficeandfire.com</a></span>
      </footer>
    </>
  );
}

export default App;
