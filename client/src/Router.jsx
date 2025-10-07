import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home/Home";
import Question from "./Pages/Question/Question";
import HowItWorks from "./Pages/HowItWorks/HowItWorks";
import Answer from "./Pages/Answer/Answer";

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/question" element={<Question />} /> 
       <Route path="/home/answers/:questionId" element={<Answer />} />
      </Route>
    </Routes>
  );
}

export default Router;
