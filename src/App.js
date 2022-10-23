import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from "react";

function Comment(props) {
    return (
        <div className="wrapper">
            <div className="container">
                <div className="item1">{props.username}</div>
                <p className="item2">{props.comment}</p>
                <div className="item3"><span className="bi bi-trash">Delete</span></div>
                <div className="item4"><span className="bi bi-capsule-pill">SwallowMe</span></div>
            </div>
        </div>)
}

function App() {
        const [comments, setComments] = useState([])
        useEffect(() => {fetchComments();},[]);
        useEffect(() => {console.log(comments);},[comments]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(false);

        const fetchComments= async function() {
            try {
                const comments = await fetch('http://192.168.2.2:3000/comments')
                    .then((response) => response.json());
                setComments(comments);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
    const listItems =comments.map((info) =>
            <Comment username={info.username} comment={info.comment} />
         );
    return(
        <header><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css"/>
        <div classname="grid-container">
           {listItems}
        </div>

        </header>
    )
}
export default App;


