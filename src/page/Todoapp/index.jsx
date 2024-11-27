/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { actionAddTodo, actionDeleteTodo, actionSearchPriotity, actionSearchStatus, actionSearchTodo, actionSelectCompleted } from "../../redux/rooReducer";
import {v4 as uuid} from 'uuid';
import { getListContent } from "../../redux/selector";
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

function Todoapp() {    
    const [nameTodo, setNameTodo] = useState("");
    const [priotity, setPriotity] = useState("Medium");
    const [menuIsviable, setMenuIsviable] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const toggleMenu = useRef();
    const dispatch = useDispatch();
    const listContent = useSelector(getListContent);
    
    const handleAddTodo = () => {
        if(nameTodo !== ""){
            dispatch(actionAddTodo({
                id: uuid(),
                nameTodo: nameTodo,
                completed: false,
                priotity: priotity
            }))
        }
    }

    const handleStatus = (value) => {
        dispatch(actionSearchStatus(value));
    }

    const handleCompleted = (id) => {
        dispatch(actionSelectCompleted(id));
    }

    const handleClickOutside = (event) => {
        if (!event.target.closest(".group")) {
            setMenuIsviable(null);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    
    return (  
        <>
            <div className="w-full h-[100vh] bg-[#1d0620] flex justify-center items-center">
                <div className="min-w-[600px] min-h-[500px] bg-cyan-50 rounded-[5px] p-8">
                    <h2 className="text-[4rem] text-[red] font-bold text-center mb-[2.5rem]">
                        TODO 
                    </h2>
                    <div className="text-[#1fa425] text-[1.4rem] font-semibold">
                        SEARCH JOB
                    </div>
                    <input
                        type="text"
                        className="w-full h-[4.5rem] rounded-[.4rem] outline-none border-[1px] border-[#ccc] pl-4 focus:border-[red] mb-6"
                        placeholder="Search"
                        onChange={(e) => {
                            dispatch(actionSearchTodo(e.target.value));
                        }}
                    />
                    <div className="text-[#1fa425] text-[1.4rem] font-semibold">
                        SEARCH STATUS
                    </div>
                    <div className="flex gap-[2.5rem] mb-6">
                        <div className="flex items-center gap-[.4rem] ">
                            <input
                                type="radio"
                                className="cursor-pointer"
                                id="All"
                                name="radio"
                                value="All"
                                defaultChecked
                                onChange={(e) => {
                                    handleStatus(e.target.value)
                                }}
                            />
                            <label htmlFor="All" className="select-none cursor-pointer">
                                All
                            </label>
                        </div>
                        <div className="flex items-center gap-[.4rem] ">
                            <input
                                type="radio"
                                className="cursor-pointer"
                                id="Completed"
                                name="radio"
                                value="Completed"
                                onChange={(e) => {
                                    handleStatus(e.target.value)
                                }}
                            />
                            <label htmlFor="Completed" className="select-none cursor-pointer">
                                Completed
                            </label>
                        </div>
                        <div className="flex items-center gap-[.4rem] ">
                            <input
                                type="radio"
                                className="cursor-pointer"
                                id="To do"
                                name="radio"
                                value="To do"
                                onChange={(e) => {
                                    handleStatus(e.target.value)
                                }}
                            />
                            <label htmlFor="To do" className="select-none cursor-pointer">
                                To do
                            </label>
                        </div>
                    </div>
                    <div className="text-[#1fa425] text-[1.4rem] font-semibold">
                        SEARCH PRIOTITY
                    </div>
                    <select className="w-full h-[4.5rem] border-[1px] border-[#ccc] outline-none rounded-[.4rem] focus:border-[red] pl-4"
                        onChange={(e) => {
                            dispatch(actionSearchPriotity(e.target.value));
                        }}
                    >
                        <option>
                            All
                        </option>
                        <option>
                            Medium
                        </option>
                        <option>
                            High
                        </option>
                        <option>
                            Low
                        </option>
                    </select>
                <div className="w-full h-[20rem] bg-cyan-200 mt-6 p-5 overflow-y-auto">
                    <div className="flex items-center justify-between pb-3 before-custom px-2 mb-4">
                        <div className="text-[blue] font-bold w-[65%]">
                            Name
                        </div>
                        <div className="w-[15%]">
                            Priotity
                        </div>
                        <div className="text-[blue] font-bold w-[15%]">
                            Status
                        </div>
                    </div>
                    <div className="w-full h-[80%] overflow-y-auto mt-[-8px] scroll-none">
                        {listContent && listContent.map((item) => {
                            return (
                                <div key={item.id} className={`mt-2 py-4 bg-[#30ffff] transition-all duration-[.25s] px-2 rounded-[.4rem] border-[1px] border-[blue] flex justify-between items-center hover:bg-[#29efef] ${item.completed ? 'border-[#7d7d7d] opacity-[.5] bg-[#fff] hover:bg-[#fff]' : ''}`}>
                                    <div className={`text-[#000] w-[68%] ${item.completed ? 'opacity-[.3] select-none' : ""}`}>{item.nameTodo}</div>

                                    <div className={`inline-block px-4 py-1 rounded-[.4rem] text-[#fff] bg-[red] mr-3 w-[20%] text-center ${item.completed ? 'opacity-[.3] select-none' : ''}`}>
                                        {item.priotity}
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={item.completed}
                                        className="w-[10%] h-[20px] cursor-pointer checkCompleted"
                                        onChange={() => {
                                            handleCompleted(item.id);
                                        }}
                                    />
                                    <div className="mx-2 w-[2%] relative before:w-[24px] before:h-[24px] before:bg-[#ffffff63] before:absolute before:rounded-full before:top-0 before:left-[-10px] before:opacity-0 hover:before:opacity-[1] before:transition-all before:duration-[.25s] cursor-pointer group"
                                        onClick={() => {
                                            setMenuIsviable(prev => (prev === item.id ? null : item.id));
                                        }}
                                        ref={toggleMenu}
                                    >
                                        <FontAwesomeIcon icon={faEllipsisVertical} className="text-[#000000]"/>
                                        {menuIsviable === item.id && (
                                            <div className={`z-20 absolute w-[80px] h-auto bg-[#fff] rounded-[.3rem] py-2 top-[100%] right-0 select-none`}>
                                            <div className="py-1 px-2 hover:bg-[#ccc] transition-all duration-[.25s] "
                                                onClick={() => {
                                                    dispatch(actionDeleteTodo(item.id));
                                                    setDeleteSuccess(true);
                                                    setTimeout(() => {
                                                        setDeleteSuccess(false);
                                                    }, 2000);
                                                }}
                                            >Delete</div>
                                            <div className="py-1 px-2 hover:bg-[#ccc] transition-all duration-[.25s]">Update</div>
                                        </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="w-full h-[4.5rem] rounded-[.4rem] border-[1px] border-[#ccc] mt-6 flex items-center">
                    <input
                        type="text"
                        className="w-[60%] h-[100%] border-r-[1px] border-[#ccc] outline-none rounded-tl-[.4rem] rounded-bl-[.4rem] pl-4"
                        placeholder="Add Job"
                        value={nameTodo}
                        onChange={(e) => {setNameTodo(e.target.value)}}
                    />
                    <select className="w-[25%] h-[100%] outline-none pl-4 border-r-[1px] border-[#ccc]"
                        onChange={(e) => {setPriotity(e.target.value)}}
                    >
                        <option value="Medium">
                            Medium
                        </option>
                        <option value="High">
                            High
                        </option>
                        <option value="Low">
                            Low
                        </option>
                    </select>
                    <div className="w-[15%] h-full flex justify-center items-center text-[#fff] bg-[red] rounded-tr-[.4rem] rounded-br-[.4rem] hover:bg-[#ff4d4d] transition-all duration-[.25s] cursor-pointer"
                        onClick={handleAddTodo}
                    >
                        Add
                    </div>
                </div>
                </div>
            </div>
            {deleteSuccess && (
                <div className="w-full h-[100vh] bg-[#36545a6b] fixed top-0 left-0 flex items-center justify-center">
                <div className="flex items-center justify-center gap-3 w-[400px] h-[200px] bg-[#626262de] rounded-full shadow-2xl shadow-[#2e2e2e]">
                    <div className="text-[30px] text-[#3fff3f]">
                        Delete Success! 
                    </div>
                    <div className="w-[80px] h-[80px] bg-cyan-400 rounded-[100%] flex justify-center items-center ">
                        <FontAwesomeIcon icon={faCheck} className="text-[40px] font-bold text-[#fff]"/>
                    </div>
                </div>
            </div>
            )}
        </>
    );
}

export default Todoapp;