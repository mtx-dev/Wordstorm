import React, {useCallback, useRef, useState} from 'react';

const Mouse = (props) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const ref = useRef();

    const handlerMouseMove = useCallback(
        (e) => {
            const rect= ref.current.getBoundingClientRect();
            setX(e.clientX - rect.left);
            setY(e.clientY - rect.top);
        },
        [ref]);

    return <div ref={ref} onMouseMove = {handlerMouseMove}>
        {props.render({x,y})}
    </div>
}

export default Mouse