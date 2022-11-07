import logo from './logo.svg';
import './App.css';
import {useState, useEffect, useMemo} from "react";
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
   /* const[newlist,setNewlist] = useState([]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(newComment)
        const date={newComment}
        if(newComment){
            setNewlist((ls)=>[...ls,date])
            setNewComment("")
        }
    }*/
    //const newlistItems =newlist.map((a)=><div>{a.newComment}</div>)
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
                    //onSubmitEditing={handleSubmit}
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
                body: JSON.stringify(putData)})
                .then(
                    (response) => {
                        //return response.json()
                    }
                )
            //setComments(respNewcomments);
        }
        catch (err) {
            setError(true);
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
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"/>>
            <div className="grid-container">
                {listItems}
            </div>

        </header>
    )
}

export default App;


