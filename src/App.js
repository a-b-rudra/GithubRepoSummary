import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [reply, setReply] = useState([]);
  const [message, setMessage] = useState("github");
  const [input, setInput] = useState("");
  const [image, setImage] = useState(
    "https://avatars.githubusercontent.com/u/9919?v=4"
  );

  useEffect(() => {
    try {
      fetch(`https://api.github.com/users/${message}/repos`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setReply(
            data.map((item) => (
              <li key={item.node_id}>
                <h3>
                  <i>{item.name}</i>{" "}
                </h3>
                <a href={item.html_url}> Click here to go to {item.name}</a>
                <br />
                <a href={item.languages_url}> Languages used in {item.name}</a>
                <br />
                <i>Created on : {item.created_at.substr(0, 10)}</i>
                <br />
                <p> {item.description} </p>
              </li>
            ))
          );
          if (data[0]) setImage(data[0].owner.avatar_url);
        });
    } catch (err) {
      console.log(err);
    }
  }, [message]);

  const buttonHandler = (e) => {
    e.preventDefault();
    setMessage(input);
    setInput("");
  };

  return (
    <div className="App">
      <form>
        <label htmlFor="gituser">
          <h1>GITHUB REPO SUMMARY:</h1>
        </label>
        <br />
        <input
          id="gituser"
          placeholder="Enter the GITHUB username here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <button onClick={buttonHandler}>Find Repos</button>
      </form>
      <h3>Total repos : {reply.length}</h3>
      <h2>{message}'s Repos</h2>
      <img src={image} alt="Not available" />
      <ul>{reply}</ul>
    </div>
  );
}
