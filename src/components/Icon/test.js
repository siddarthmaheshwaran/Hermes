import React from 'react';
import * as enzyme from 'enzyme';

import { Icon } from './index';

describe('<Icon />',function(){

  it('renders blankly',function(){
    let $comp = enzyme.shallow( <Icon /> );
    expect( $comp.is('.tivo-icon') ).toBe( true );
  });

  it('renders name property',function(){
    let $comp = enzyme.shallow( <Icon name="play" /> );
    expect( $comp.html() ).toMatch('svg#play');
  });

  it('renders from children',function(){
    let $comp = enzyme.shallow( <Icon>pause</Icon> );
    expect( $comp.html() ).toMatch('svg#pause');
  });

  // TODO: test size property


});
