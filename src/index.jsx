import React from "react"; //Using function component
import ReactDOM from "react-dom"; //using ReactDOM
import PostList from "./PostList";

ReactDOM.render(
  <PostList name="Function">
    PostList
    </PostList>,
  document.getElementById("root")
); //Note document=index.html document
