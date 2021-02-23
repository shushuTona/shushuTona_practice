import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom';
import Btn from './Btn';

const Header = ( props ) => {
    const location = useLocation();

    console.log( location );

    return (
        <header className='header'>
            <h1>{props.title}</h1>
            {
                location.pathname === '/' && (
                    <Btn
                        color='green'
                        text={ props.showAdd ? 'Close' : 'Add' }
                        onClick={ props.onAdd }
                    />
                )
            }
        </header>
    )
};

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header;
