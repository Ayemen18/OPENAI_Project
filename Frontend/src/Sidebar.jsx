import "./Sidebar.css"
import { useContext, useEffect } from "react"
import { MyContext } from "./MyContext.jsx"
import {v1 as uuidv1} from 'uuid';

function Sidebar(){
    const {allThreads, setAllThreads, currThreadId, setPrompt, setReply, setCurrThreadId, setNewChat, setPrevChats} = useContext(MyContext);


    const getAllThreads = async() =>{
        try {
            const response = await fetch('http://localhost:8080/api/thread');
            const res = await response.json();
            const filtereddata = res.map(thread =>({
                threadid: thread.threadid,
                title: thread.title
            }));
            setAllThreads(filtereddata);
        } catch (error) {
            console.error('Error fetching threads:', error);
        }
    }

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setPrevChats([]);
        const newId = uuidv1();
        setCurrThreadId(newId);
    }

    const changeThread = async (newthreadid) => {
        setCurrThreadId(newthreadid);
        try{
            const response = await fetch(`http://localhost:8080/api/thread/${newthreadid}`);
            const res = await response.json();
            setPrevChats(res);
            setNewChat(false);
            setReply(null);

        } catch (error) {
            console.error('Error fetching chat for thread:', error);
        }
    }

    const deleteThread = async (threadid) => {
        try {
            const response = await fetch(`http://localhost:8080/api/thread/${threadid}`, {method: 'DELETE',});
            const res = await response.json();
            setAllThreads(allThreads.filter(thread => thread.threadid !== threadid));

            if(currThreadId === threadid){
                createNewChat();
            }
        } catch (error) {
            console.error('Error deleting thread:', error);
        }
    }   


    useEffect(()=>{
        getAllThreads();
    }, [currThreadId])

    return (
        <section className="sidebar">
            <button onClick={createNewChat}>
                <img src="src/assets/blacklogo.png" alt="GPT Logo" className="logo"/>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            <ul className="history">
                {
                    allThreads.map((thread, idx)=> (
                        <li key={idx} 
                            onClick={(e)=> changeThread(thread.threadid)}
                            className={currThreadId === thread.threadid ? "highlighted" : ""}
                        >
                            {thread.title}
                            <i class="fa-solid fa-trash"
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    deleteThread(thread.threadid);
                                }}
                            >

                        </i>
                        </li>
                    ))
                }
            </ul>

            <div className="sign">
                <p>Made by Ayemen &hearts;</p>
            </div>
        </section>
    )
}

export default Sidebar