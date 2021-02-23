import { useState } from 'react';

const AddTask = ( props ) => {
    const [ text, setText ] = useState( '' );
    const [ day, setDay ] = useState( '' );
    const [ reminder, setReminder ] = useState( false );

    const onSubmit = ( e ) => {
        e.preventDefault();

        if (!text) {
            window.alert( 'Please add a task' );
            return;
        }

        // add task
        props.onAdd( { text, day, reminder } );

        // reset
        setText( '' );
        setDay( '' );
        setReminder( false );
    }

    return (
        <form className="add-form" onSubmit={ onSubmit }>
            <div className="form-control">
                <label>Task</label>
                <input
                    type="text"
                    placeholder="Add Task"
                    value={text}
                    onChange={( e ) => { setText( e.target.value );} }
                />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input
                    type="text"
                    placeholder="Add Day & Time"
                    value={day}
                    onChange={( e ) => { setDay( e.target.value ); }}
                />
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input
                    type="checkbox"
                    value={reminder}
                    onChange={( e ) => { setReminder( e.currentTarget.checked ); }}
                />
            </div>

            <button className="btn btn-block" type="submit">Save Task</button>
        </form>
    )
}

export default AddTask;
