import PropTypes from 'prop-types'

const Btn = ( props ) => {
    return (
        <button
            onClick={ props.onClick }
            className='btn'
            style={ { backgroundColor: props.color } }
        >{props.text}</button>
    );
}

Btn.defaultProps = {
    text: 'btn component'
}

Btn.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Btn;
