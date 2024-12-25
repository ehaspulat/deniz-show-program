'use client';

import { useState } from "react";
import styles from "./page.module.css";

interface Question {
	question: string;
	answer: string;
	answerVisible: boolean;
}

const initialQuestions: {[key: string]: Question} = {
	'soru1': {
		question: '1+1',
		answer: '2',
		answerVisible: false
	},
	'soru2': {
		question: '100+100',
		answer: '200',
		answerVisible: false
	}
};

export default function Home() {
	const [questions, setQuestions] = useState<{[key: string]: Question}>(initialQuestions);

	const handleAddQuestion = (question: Question) => {
		setQuestions({
			...questions,
			["soru" + Object.values(questions).length+1]: {
				question: question.question,
				answer: question.answer,
				answerVisible: question.answerVisible
			}
		})
	}

	return (
		<div>
			{
				Object.entries(questions).map(([key, question]) => {
					return (
						<QuestionView
							key={key}
							id={key}
							question={question.question}
							answer={question.answer}
							answerVisible={question.answerVisible}
							onToggleShow={
								() => {
									setQuestions(
										{
											...questions,
											[key]: {
												...questions[key],
												answerVisible: !questions[key].answerVisible
											}
										}
									);
								}
							}
							onDelete={
								(id: string) => {
									setQuestions((prevQuestions) => {
										const updatedQuestions = { ...prevQuestions };
										delete updatedQuestions[id];
										return updatedQuestions;
									}
								);
								}
							}
						>
						</QuestionView>
					)
				})
			}
			<NewQuestionView 
				onAddQuestion={handleAddQuestion}
			/>
		</div>
	);
}

interface QuestionViewProps {
	id: string;
	question: string;
	answer: string;
	answerVisible: boolean;
	onToggleShow: () => void;
	onDelete: (id: string) => void;
}

function QuestionView(props: QuestionViewProps) {

	const handleAnswerToggle = () => {
		props.onToggleShow();
	}

	const handleDeleteClick = () => {
		props.onDelete(props.id);
	}

	return (
		<div className={styles.question}>
			<div className={styles.deletePart}>
				<button
					onClick={handleDeleteClick}
				>
					DELETE
				</button>
			</div>
			<div className={styles.questionPart}>
				{props.question}
			</div>

			<div className={styles.answerPart}>
				<div className={styles.showButtonPart}>
					<button
						onClick={handleAnswerToggle}
						>
							{props.answerVisible ? "HIDE" : "SHOW"}
					</button>
				</div>
				{
					props.answerVisible ? props.answer : <></>
				}
			</div>
		</div>
	)
}

interface NewQuestionViewProps {
	onAddQuestion: (question: Question) => void;
}

function NewQuestionView(props: NewQuestionViewProps) {
	const [question, setQuestion] = useState<string>("");
	const [answer, setAnswer] = useState<string>("");

	const handleAddQuestionClick = () => {
		props.onAddQuestion({
			question: question,
			answer: answer,
			answerVisible: false
		});

		setQuestion("");
		setAnswer("");
	}



	return (
		<div className={styles.newQuestion}>
			<div className={styles.newQuestionQuestionPart}>
				<div style={{
					width: "15rem"
				}}>
					Question:
				</div>
				<input 
					type="text" 
					onChange={(e) => setQuestion(e.currentTarget.value)}
					style={{
						width: "30rem"
					}}
				/>
			</div>
			<div className={styles.newQuestionAnswerPart}>
				<div style={{
					width: "15rem"
				}}>
					Answer:
				</div>
				<input 
					type="text" 
					onChange={(e) => setAnswer(e.currentTarget.value)}
					style={{
						width: "30rem"
					}}
				/>
			</div>
			<button
				onClick={handleAddQuestionClick}
			>ADD</button>
		</div>
	)
}