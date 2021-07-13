import React from 'react';
import './Pageination.css';

type PageProps = {
  page: number,
  handlePageFunc: (n: number) => void,
}

export const Pageination = ({page, handlePageFunc}: PageProps) => {

  return (
    <div className="pageination">
      <span className="pageswitch" onClick={() => handlePageFunc(-Infinity)}>&#8249;&#8249;</span>
      <span className="pageswitch" onClick={() => handlePageFunc(-1)}>&#8249;</span>
      <span className="page">{page}</span>
      <span className="pageswitch" onClick={() => handlePageFunc(+1)}>&#8250;</span>
      <span className="pageswitch" onClick={() => handlePageFunc(Infinity)}>&#8250;&#8250;</span>
    </div>
  );
}