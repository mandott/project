import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

/*
 - create a function that sends delete request to server
 - call this function upon click of delete button of each comment
   * first create a function that console.log(id) upon click of delete button
*/


function Comment(props) {
    const handleDelete = () => {
        props.deleteFunc(props.id)
    }
    const [buttonPopup,setButtonPopup] = useState(false)
    const Modal = () => (
        <Popup trigger={buttonPopup} modal>
            <span> Are you sure you want to delete this comment?</span>
            <br />
            <button onClick={handleDelete}> Yes  </button>
                    <button onClick={() => setButtonPopup(false)}>  No</button>
        </Popup>
    )

    return (
        <div className="wrapper">
            <div className="container">
                <div className="email">{props.email}</div>
                <div className="comment">{props.comment}</div>
                <div className="deleteButton"><span className="bi bi-trash" onClick={() => setButtonPopup(true)}>Delete</span></div>
                    <Modal />
                <div className="editButton"><span className="bi bi-capsule-pill">SwallowMe</span></div>
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
            <div className="grid-container">
                {listItems}
            </div>

        </header>
    )
}

export default App;


