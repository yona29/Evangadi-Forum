import { Route, Routes } from "react-router-dom";
import ChatbotLayout from "./Components/Layout/Layout";
import SimpleLayout from "./Components/Layout/SimpleLayout";
import Article from "./Components/Articles/Articles";
import Landing from "./Pages/Landing/Landing";
import Home from "./Pages/Home/Home";
import Question from "./Pages/Question/Question";
import HowItWorks from "./Pages/HowItWorks/HowItWorks";
import Groups from "./Pages/Groups/Groups";
import Answer from "./Pages/Answer/Answer";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ForgotPassword/ResetPassword";
function Router() {
  return (
    <Routes>
      {/* Pages without Chatbot */}
      <Route element={<SimpleLayout />}>
        <Route path="/login" element={<Landing />} />
      </Route>

      {/* Pages with Chatbot */}
      <Route element={<ChatbotLayout />}>
        <Route path="/article" element={<Article />} />
        <Route path="/" element={<Home />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/community-groups" element={<Groups />} />
        <Route path="/question" element={<Question />} />
        <Route path="/home/answers/:questionId" element={<Answer />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default Router;
