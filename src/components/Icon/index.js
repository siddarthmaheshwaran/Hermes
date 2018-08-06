import React from 'react';
import './styles.scss';
import './icons.svg';

export const Icon = ({ name, size, children, className='' }) => {
  let style = size ? { height: size +'px', width: size +'px' } : null;
  let xlink = 'img/icons.svg#'+ ( name || children || '' ).toLowerCase();
  return (
    <i className={ `tivo-icon ${ className }` }>
      <svg viewBox="0 0 28 28" style={ style }>
        <use href={ xlink } />
      </svg>
    </i>
  );
};
