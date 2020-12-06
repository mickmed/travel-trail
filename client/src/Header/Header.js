import React from 'react';
import "./Header.css"
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'



const Header = (props) => {
  return (
    <header>
      <nav>
        <a href="./">My Travelogue</a>
        {/* <span>pin your memories to the map</span> */}

        <div className='header_icons'>

          <Link to="/home"><span className="list-all" value="all" onClick={props.renderList} data-tip="list order">🌎</span></Link>
          <Link to="/home"><span className="favs-icon" value="favs" onClick={props.renderList}
          data-tip="favorites">⭐️</span></Link>
          
          <Link to="home"><span className="date-order" value="date" onClick={props.renderList}data-tip="date order">🕛</span>
          <span className="diary" data-tip="diary">📖</span></Link>
          <Link to="/home/info"><span className="info" data-tip="info">ℹ</span></Link>
          <ReactTooltip/>
        </div>


      </nav>
    </header>

  )
}

export default Header;