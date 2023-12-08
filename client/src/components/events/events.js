import React, { Fragment, useEffect } from 'react';
import { getAdminEVENT } from "../../actions/eventAction";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../actions/eventAction";
import "./style.css";

const Events = () => {
  const dispatch = useDispatch();
  const { error, events } = useSelector(state => state.events);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getAdminEVENT());
  }, [dispatch, error]);

  return (
    <Fragment>
      <div className='banner'>
        <h1>EVENTS</h1>
      </div>

      <div className='container' id='container'>
        {events && events.map(event => (
          <div key={event._id}> {/* Add a unique key for each event */}
            {/* Render event details here */}
            <h2>{event.name}</h2>
            <img src={event.images[0].url} alt={event.name} />
            <p>{event.description}</p>
            <h2>{event.contact}</h2>
          </div>
        ))}
      </div>
    </Fragment>
  )
}

export default Events;
