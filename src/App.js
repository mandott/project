import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {TextField} from '@adobe/react-spectrum';
import {Flex} from 'react-flex';
/*
 - create a function that sends delete request to server
 - call this function upon click of delete button of each comment
   * first create a function that console.log(id) upon click of delete button
*/


function Comment(props) {
    const handleDelete = () => {
        props.deleteFunc(props.id)
        closeModal()
    }
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const DeleteModal = () => (
        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <span> Are you sure you want to delete this comment?</span>
            <br />
            <button onClick={handleDelete}> Yes  </button>
            <button onClick={closeModal}>  No</button>
        </Popup>
    )
    let [text, setText] = useState();
    const [secondaryopen, setSecondaryopen] = useState(false);
    const closeSecondaryModal = () => setSecondaryopen(false);
    const EditModal = () => (
        <Popup open={secondaryopen} closeOnDocumentClick onClose={closeSecondaryModal}>
            <span> How would you like to edit this comment?</span>
            <br />
                <TextField
                    onChange={setText}
                    label="Your text" />
                <pre>Mirrored text: {text}</pre>
            <br />
            <button onClick={handleDelete}> SAVE  </button>
            <button onClick={closeSecondaryModal}>  CANCEL</button>
        </Popup>
    )
    //const [value, setValue] = React.useState('Text');
    return (
        <div className="wrapper">
            <div className="container">
                <div className="email">{props.email}</div>
                <div className="comment">{props.comment}</div>
                <div className="deleteButton"><span className="bi bi-trash" onClick={() => setOpen(true)}>Delete</span></div>
                    <DeleteModal />
                <div className="editButton"><span className="bi bi-capsule-pill" onClick={() => setSecondaryopen(true)}>SwallowMe</span></div>
                    <EditModal />
            </div>
        </div>
    )
}
function App() {
    const [comments, setComments] = useState([])
    const [, setLoading] = useState(true);
    const [, setError] = useState(false);

    useEffect(() => {
        fetchComments();
    }, []);

    useEffect(() => {
        console.log(comments);
    }, [comments]);

    const fetchComments = async function () {
        try {
            const respComments = await fetch('http://localhost:3000/comments')
                .then(
                    (response) => {
                        return response.json()
                    }
                );
            setComments(respComments);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const onDelete = async function (id) {
        await fetch('http://localhost:3000/comments/' + id, {method: 'DELETE'})
            .then(
                (response) => {
                    if (response.ok) {
                        const filteredComments = comments.filter(elem => {return elem.id !==id})
                        setComments(filteredComments)
                    }
                }
            );
    }

    const listItems = comments.map((info) => {
            return <Comment {...info} deleteFunc={onDelete}/>
        }
    );

    return (
        <header>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            <div className="grid-container">
                {listItems}
            </div>

        </header>
    )
}

export default App;


