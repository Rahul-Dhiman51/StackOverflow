import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import QuestionList from './QuestionList'
import './HomeMainbar.css'
import { useSelector } from 'react-redux'

const HomeMainbar = () => {
	
	// var questionsList = [{
	// 	id: 1,
	// 	votes: 3,
	// 	noOfAnswers: 25,
	// 	questionTitle: "What is a function?",
	// 	questionBody: "It meant to be",
	// 	questionTags: ["java", "node js", "react js", "mongo db", "express js"],
	// 	userPosted: "mano",
	// 	askedOn: "jan 1"
	// }, {
	// 	id: 2,
	// 	votes: 0,
	// 	noOfAnswers: 0,
	// 	questionTitle: "What is a function?",
	// 	questionBody: "It meant to be",
	// 	questionTags: ["javascript", "R", "python"],
	// 	userPosted: "mano",
	// 	askedOn: "jan 1"
	// }, {
	// 	id: 3,
	// 	votes: 1,
	// 	noOfAnswers: 0,
	// 	questionTitle: "What is a function?",
	// 	questionBody: "It meant to be",
	// 	questionTags: ["javascript", "R", "python"],
	// 	userrosted: "mano",
	// 	askedOn: "jan 1"
	// }];

	const questionsList = useSelector(state => state.questionsReducer)
	// console.log(questionsList)
	const location = useLocation();
	const navigate = useNavigate();
	const user = 1;

	const checkAuth = () =>{
		if(user===null){
			alert("login or signup to ask a question");
			navigate('/Auth');
		}else{
			navigate('/AskQuestion');
		}
	}
	
	return (
		<div className='main-bar' >
			<div className="main-bar-header">
				{
					location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
				}
				<button onClick={ checkAuth } className='ask-btn'>Ask Question</button>
			</div>
			<div>
				{
					questionsList.data === null ?
						<h1>Loading...</h1> :
						<>
							<p>{questionsList.data.length} questions</p>
							<QuestionList questionsList={questionsList.data} />
						</>
				}
			</div>
		</div>
	)
}

export default HomeMainbar