import React from 'react';
import Mouse from './Mouse';

const cardStyle = {
    height: '100px',    
    border: '1px solid grey',
    margin: '5px'
}


export default (props) => {    
    return <Mouse 
                render={({x, y}) => (
                    <div style={cardStyle} >{x}:{y}</div>
                )} 
            />
}

