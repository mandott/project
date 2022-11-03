import logo from './logo.svg';
import './App.css';
import {useState, useEffect, useMemo} from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {TextField} from '@adobe/react-spectrum';
import Flexbox from 'flexbox-react';
import { Text, TextInput, View } from 'react-native';

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
    const [editopen, setEditopen] = useState(false);
    const closeSecondaryModal = () => setEditopen(false);
    const [newcomments, setNewcomments] = useState('');
    const[newlist,setNewlist] = useState([]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(newcomments)
        const date={newcomments}
        if(newcomments){
            setNewlist((ls)=>[...ls,date])
            setNewcomments("")
        }
    }
    const newlistItems =newlist.map((a)=><div>
                        {a.newcomments}</div>)

    //const listItems = comments.map((info) => {
         //   return <Comment {...info} deleteFunc={onDelete}/>
      //  }
    //);
    const EditModal = () => (
        <Popup open={editopen} closeOnDocumentClick onClose={closeSecondaryModal} style={{height: 20}}>
            <span> How would you like to edit this comment?</span>
            <br />
            <View onSubmit={handleSubmit} >
                <TextInput
                    style={{height: 50}}
                    placeholder="Text"
                    value={newcomments}
                    onChange={(e)=> setNewcomments(e.target.value)}
                    onSubmitEditing={handleSubmit}
                />
                <Text  style={{padding: 10, fontSize: 42}}>
                    {}
                </Text>
                {newlistItems}
            </View>
            <br />
            <button type="submit" onClick={handleDelete}> SAVE  </button>
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

    const listItems = comments.map((info) => {
            return <Comment {...info} deleteFunc={onDelete}/>
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


