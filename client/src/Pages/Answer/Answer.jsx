import React, { useState, useEffect } from "react";
import classes from "./Answer.module.css";
import { IoMdContact } from "react-icons/io";
import instance from "../../Api/axios";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";

function Answer() {
  const { questionId } = useParams();

  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [question, setQuestion] = useState({ title: "", description: "" });
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchQuestion = async () => {
    try {
      setIsLoading(true);
      const response = await instance.get(`/question/${questionId}`, {
        headers: { authorization: "Bearer " + token },
      });

      setQuestion({
        title: response.data.question.title,
        description: response.data.question.description,
      });
    } catch (error) {
      console.error("Error fetching question:", error);
      setErrorMessage("Failed to load question.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAnswers = async () => {
    try {
      setIsLoading(true);
      const response = await instance.get(`/answer/${questionId}`, {
        headers: { authorization: "Bearer " + token },
      });

      console.log("Answers API Response:", response.data);

      setAnswers(response.data.answers || []);
    } catch (error) {
      console.error("Error fetching answers:", error.response?.data || error);
      setErrorMessage("Failed to load answers.");
    } finally {
      setIsLoading(false);
    }
  };

  const postAnswer = async (e) => {
    e.preventDefault();

    if (!answer) {
      setErrorMessage("Please provide an answer.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await instance.post(
        `/answer/${questionId}`,
        { answer },
        { headers: { authorization: "Bearer " + token } }
      );

      if (response.status === 201) {
        setSuccessMessage("Answer posted successfully 👍");
        setAnswer(""); // clear textarea

        if (response.data && response.data.newAnswer) {
          setAnswers((prev) => [...prev, response.data.newAnswer]);
        } else {
          fetchAnswers();
        }
      }
    } catch (error) {
      console.error("Error posting answer:", error.response?.data || error);
      setErrorMessage("Something went wrong. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, [questionId]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main>
          <section className={classes.question_section}>
            <h2>Question</h2>
            <h3>{question.title}</h3>
            <p className={classes.link_work}>{question.description}</p>
            <p className={classes.answersCount}>
              {answers.length} Answer{answers.length !== 1 ? "s" : ""} from
              community
            </p>
            <br />
            <hr />
          </section>

          <section className={classes.answer_section}>
            <h2>Answers From The Community</h2>
            <hr />
            {Array.isArray(answers) && answers.length > 0 ? (
              answers.map((ans) => (
                <div className={classes.answer} key={ans.answerid}>
                  <div>
                    <IoMdContact size={80} />
                    <h4 className={classes.username}>{ans.user_name}</h4>
                  </div>
                  <div className={classes.margin}>
                    <p>{ans.answer}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className={classes.para}>
                No answers yet. Be the first to answer! 😇
              </p>
            )}
          </section>

          <section className={classes.answer_form}>
            <h2>Answer The Top Question</h2>

            {errorMessage && (
              <p className={classes.error} style={{ color: "red" }}>
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p className={classes.success} style={{ color: "green" }}>
                {successMessage}
              </p>
            )}

            <textarea
              placeholder="Your Answer..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <button
              type="submit"
              className={classes.submit_btn}
              onClick={postAnswer}
            >
              Post Your Answer
            </button>
          </section>
        </main>
      )}
    </>
  );
}

export default Answer;
