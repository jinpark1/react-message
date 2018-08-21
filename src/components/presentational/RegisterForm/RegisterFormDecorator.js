///import withHandlers from recompose to use on event handlers in your presentational compeont
import { withHandlers } from 'recompose';

const handler = withHandlers({
    //YOu can use the history prop and be destructured. 
    onClick: ({register, history}) => e => {
        e.preventDefault();
        register();
        history.push('/');
    },
    handleUpload: ({handleUpload}) => e => {
        e.preventDefault();
        handleUpload(e.target.files[0]);
    }
})


export default handler;