import React from 'react';

interface BlankProps {
  blankType: string;
}

const blankContent = ({ blankType }: BlankProps): JSX.Element => {
  return (
    <h3
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        height: '92vh',
        fontSize: '30px',
      }}
    >
      {blankType} :(
      <a href="./search" rel="noreferrer" style={{ textDecoration: 'underline' }}>
        레포지토리 검색하러 가기
      </a>
    </h3>
  );
};

export default blankContent;
