import React, {useCallback} from 'react';
import {useDrawerDispatch, useDrawerState} from "../../context/DrawerContext";

function OrderForm(props) {
    const dispatch = useDrawerDispatch();
    const data = useDrawerState('data');
    const closeDrawer = useCallback(() => dispatch({ type: 'CLOSE_DRAWER' }), [
        dispatch,
    ]);
    return (
        <div>
            {console.log(data)}
            Edit Order Form
        </div>
    );
}

export default OrderForm;
