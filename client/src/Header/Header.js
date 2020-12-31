import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'
import "./Header.scss"

const Header = (props) => {
  return (
    <header>
      <nav>
        <Link to="/">My Travelogue</Link>
        {/* <span>pin your memories to the map</span> */}
        <div className='header_icons'>
          <Link to="/"><span className="list-all" value="all" onClick={props.renderList} data-tip="list order">🌎</span></Link>
          <Link to="/home"><span className="date-order" value="date" onClick={props.renderList}data-tip="date order">🕛</span></Link>
          <Link to="/"><span className="favs-icon" value="favs" onClick={props.renderList} data-tip="favorites">💚</span></Link>
          {/* <Link to='/home'><span className="diary" data-tip="diary">📖</span></Link> */}
          <Link to="/home/info"><span className="info" data-tip="info">ℹ</span></Link>
          <ReactTooltip/>
        </div>
      </nav>
    </header>
  )
}

export default withRouter(Header);