import React from 'react';
import './Row.css';

type PageProps = {
  title: string,
  content: string | Array<string>,
}

export const Row = ({title, content}: PageProps) => {

  if(content.length < 2){
    return null;
  }

  return (
    <div className={`row-wrapper ${(typeof content === "object")?"list":""}`}>
      <div className="col">{title}:</div>
      <div className="col">
        {typeof content === "string" && <>{content}</>}
        {typeof content === "object" && <ul>{content.map((el,index) => {
              return <li key={index}>{el}</li>
        })}</ul>}
      </div>
    </div>
  );
}