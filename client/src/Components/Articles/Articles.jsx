import classes from "./articles.module.css";

const books = [
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    link: "https://eloquentjavascript.net/",
  },
  {
    title: "Automate the Boring Stuff with Python",
    author: "Al Sweigart",
    link: "https://automatetheboringstuff.com/",
  },
  {
    title: "Think Java: How to Think Like a Computer Scientist",
    author: "Allen B. Downey & Chris Mayfield",
    link: "https://greenteapress.com/wp/think-java/",
  },
  {
    title: "Dive Into HTML5",
    author: "Mark Pilgrim",
    link: "https://diveintohtml5.com/",
  },
  {
    title: "JavaScript for Impatient Programmers",
    author: "Dr. Axel Rauschmayer",
    link: "https://exploringjs.com/impatient-js/",
  },
  {
    title: "Learn Python the Hard Way",
    author: "Zed A. Shaw",
    link: "https://learnpythonthehardway.org/book/",
  },
  {
    title: "Programming in C",
    author: "K. N. King",
    link: "https://www.gnu.org/software/gnu-c-manual/gnu-c-manual.html",
  },
  {
    title: "Structure and Interpretation of Computer Programs",
    author: "Harold Abelson & Gerald Jay Sussman",
    link: "https://sarabander.github.io/sicp/html/index.xhtml",
  },
  {
    title: "Computer Science from the Bottom Up",
    author: "Ian Wienand",
    link: "https://www.bottomupcs.com/",
  },
  {
    title: "Programming Principles in C++",
    author: "Bjarne Stroustrup",
    link: "https://www.stroustrup.com/programming.html",
  },
];

const Article = () => {
  return (
    <div className={classes.articleContainer}>
      <h2>📘 Most Recommended Free Programming Books</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <a href={book.link} target="_blank" rel="noopener noreferrer">
              {book.title}
            </a>{" "}
            <span className={classes.author}>by {book.author}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Article;
