import React, { ReactNode } from 'react'
import NotificationContextModel from '../../common/models/contexts/NotificationContextModel';
import useNotificationContext from '../../hooks/contexts/useNotificationContext';

const Notification = (props: {model: NotificationContextModel, children: ReactNode}) => {
    
    const setNotificationContextState = useNotificationContext().setState;

    return (
        <div className={`container ${props.model?.show ? "visible" : "hidden"}`}>
            <div className="row">
                <div className={`col-11 alert alert-sm alert-dismissable ${props.model?.isError ? "alert-warning" : "alert-info"}`}>
                    <button onClick={(e) => {
                        e.preventDefault();
                        setNotificationContextState(new NotificationContextModel(false, null))
                    }} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                    <h6>Notification!</h6>
                    <p>{props.model?.message}</p>
                    {
                        props.children
                    }
                </div>
            </div>
        </div>
    )
}

export default Notification
