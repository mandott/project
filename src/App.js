import logo from './logo.svg';
import './App.css';
import {useState, useEffect, useRef} from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Text, TextInput, View } from 'react-native';


function Comment(props) {
    const [newComment, setNewComment] = useState('');
    const handleDelete = () => {
        props.deleteFunc(props.id)
        closeDeleteModal()
    }
    const handleEdit = () => {
        props.editFunc(props.id,newComment)
        closeEditModal()
    }
    const [open, setOpen] = useState(false);
    const closeDeleteModal = () => setOpen(false);
    const DeleteModal = () => (
        <Popup open={open} closeOnDocumentClick onClose={closeDeleteModal}>
            <span> Are you sure you want to delete this comment?</span>
            <br />
            <button onClick={handleDelete}> Yes  </button>
            <button onClick={closeDeleteModal}>  No</button>
        </Popup>
    )
    const [editopen, setEditopen] = useState(false);
    const closeEditModal = () => setEditopen(false);
    const EditModal = () => (
        <Popup open={editopen} closeOnDocumentClick onClose={closeEditModal} style={{height: 20}}>
            <span> How would you like to edit this comment?</span>
            <br />
            <View>
                <TextInput
                    style={{height: 50}}
                    placeholder="Text"
                    value={newComment}
                    onChange={(e)=> setNewComment(e.target.value)}
                    onSubmitEditing={handleEdit}
                />
                <Text  style={{padding: 10, fontSize: 42}}>
                    {}
                </Text>
            </View>
            <br />
            <button type="submit" onClick={handleEdit}> SAVE  </button>
            <button onClick={closeEditModal}>  CANCEL</button>
        </Popup>
    )

    return (
        <div className="wrapper">
            <div className="container">
                <div className="email">{props.email}</div>
                <div className="comment">{props.comment}</div>
                <div className="deleteButton"><span className="bi bi-trash" onClick={() => setOpen(true)}>Delete</span></div>
                <DeleteModal />
                <div className="editButton"><span className="bi bi-capsule-pill" onClick={() => setEditopen(true)}>SwallowMe</span></div>
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

    const onEdit = async function (id,comment) {
       try { const putData = {
            comment: comment,
            id: id
        }
            const respNewcomments = await fetch('http://localhost:3000/comments/' + id   , {
                method: "PUT",
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(putData)})
                .then(
                    (response) => {   
                        const clone = [...comments]
                        console.log(clone)
                        const filteredComments = clone.filter(elem => {return elem.id ===id})
                        console.log('ayto',filteredComments)
                        filteredComments[0].comment=comment
                        console.log(filteredComments[0].comment)
                        setComments(clone)
                    }
               )
        }
        catch (err) {
            setError(true);
        }
        finally {
            setLoading(false);}
    }


    const [open, setOpen] = useState(false);
    const closeCreate = () => setOpen(false);
    const [newComment, setNewComment] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const CreateModal = () => (
        <Popup open={open} closeOnDocumentClick onClose={closeCreate}>
            <span>Write your comment!</span>
            <form>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="newEmail" value={newEmail} onChange={(e)=> setNewEmail(e.target.value)}></input>
                <br/>
                <label htmlFor="comment">New comment:</label>
                <input type="text" id="comm" name="newComment" value={newComment} onChange={(e)=> setNewComment(e.target.value)}></input>
            </form>
            <button onClick={onCreate}> Submit  </button>
            <button onClick={closeCreate}>  Exit</button>
        </Popup>
    )

    const onCreate = async function (email,comment) {
        //console.warn(email,comment)
        try { const putData = {
            "comment": comment,
            "email": email
        }
            const respNewcomments = await fetch('http://localhost:3000/comments' , {
                method: "POST",
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(putData)})
                .then(
                    (response) => {
                        console.warn("added data")
                    }
                )
        }
        catch (err) {
            setError(true);
            console.error('err')
        }
        finally {
            setLoading(false);}
    }

    const listItems = comments.map((info) => {
            return <Comment {...info} deleteFunc={onDelete} editFunc={onEdit}/>
        }
    );

    return (
        <header>
            <button className="createButton" onClick={() => setOpen(true)}>Create new comment</button>
            <CreateModal/>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"/>
            <div className="grid-container">
                {listItems}
            </div>

        </header>
    )
}

export default App;


