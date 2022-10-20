import logo from './logo.svg';
import './App.css';
import { Button, Alert } from 'react-native';

const data = [
    {
        username: 'bradfrost@domain.com',
        comment: 'Hello there. How are you? I hope you are feeling better. I was wondering to...'
    },
    {
        username: 'mathiew.smith@domain.com',
        comment: 'Surrrreeee!!!!'
    },
    {
        username: 'mlane@domain.com',
        comment: 'Goodbye 🙂'
    }
]
function Comment(props) {
    return (
        <div className="container">
            <div className={"item1"}>{props.username}</div>
            <p className="item2">{props.comment}</p>
            <div className="item3"><span className="bi bi-trash">Delete</span></div>
            <div className="item4"><span className="bi bi-capsule-pill">SwallowMe</span></div>
        </div>
    )
}
function App() {
    const listItems = data.map((info) =>
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


