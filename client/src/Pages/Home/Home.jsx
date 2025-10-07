import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdContact, IoIosArrowForward } from "react-icons/io";
import axios from "../../Api/axios";
import { AppState } from "../../context/DataContext";
import Loader from "../../Components/Loader/Loader";
import classes from "./Home.module.css";
import Article from "../../Components/Articles/Articles";

const Home = () => {
  const { user, setUser } = useContext(AppState);
  const token = localStorage.getItem("token");
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const navigate = useNavigate();

  // Fetch user info and questions in parallel
  const loadData = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      const userRequest = axios.get("/user/check", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const questionsRequest = axios.get("/question", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const [userResponse, questionsResponse] = await Promise.all([
        userRequest,
        questionsRequest,
      ]);

      setUser(userResponse.data.username);
      setQuestions(questionsResponse.data.questions || []);
    } catch (error) {
      console.error("Error loading data:", error);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter questions dynamically
  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  if (isLoading) return <Loader />;

  return (
    <section className={classes.home}>
      <div className={classes.home__container}>
        {/* LEFT SIDE: Questions */}
        <div className={classes.questionsSection}>
          <div className={classes.home__topcontainer}>
            <Link to="/question" className={classes.askQuestionBtn}>
              Ask Question
            </Link>
            <p className={classes.welcomeText}>
              👋 Welcome: <span className={classes.userName}>{user}</span>
            </p>
          </div>

          <div className={classes.questionsHeader}>
            <h2>Questions</h2>
            <p className={classes.totalQuestions}>
              Total Questions: {filteredQuestions.length}
            </p>
            <div className={classes.search}>
              <input
                type="text"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                placeholder="🔍 Search questions..."
              />
            </div>
          </div>

          <div>
            {filteredQuestions.length === 0 ? (
              <p>No questions found.</p>
            ) : (
              filteredQuestions.map((question) => (
                <div
                  className={classes.question__outercontainer}
                  key={question.question_id}
                >
                  <div className={classes.home__questioncontainer}>
                    <div className={classes.home__iconandusernamecontainer}>
                      <div>
                        <IoMdContact size={80} />
                        <p className={classes.home__questionusename}>
                          {question.user_name}
                        </p>
                      </div>
                      <div className={classes.home__questiontitle}>
                        <p>{question.title}</p>
                      </div>
                    </div>
                    <Link
                      to={`/home/answers/${question.question_id}`}
                      className={classes.answerLink}
                    >
                      <IoIosArrowForward size={30} color="black" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Article */}
        <div className={classes.articleWrapper}>
          <div className={classes.articleSection}>
            <Article />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
