import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    api
      .get("api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert("Error whiles fetching notes", err));
  };

  const deleteNotes = async (id) => {
    api
      .delete(`api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) {
          alert("Note deleted successfully");
        } else alert("Failed to delete note");
        fetchNotes();
      })
      .catch((error) => alert("Error in deleting note", error));
  };

  const createNotes = (e) => {
    e.preventDefault();
    api
      .post("api/notes/", { title, content })
      .then((res) => {
        if (res.status === 201) {
          alert("Note created successfully");
          setTitle(" ");
          setContent(" ");
        } else "failed to create note";
        fetchNotes();
      })
      .catch((err) => alert("Error in creating note : " + err));
  };

  // console.log(`Title:${title} \n Content : ${content}`);
  return (
    <div>
      <header>
        <h1 className="title">Welcome to Quick Notes</h1>
        <button className="logout-btn" onClick={() => navigate("/logout")}>
          Logout
        </button>
      </header>
      <div className="container">
        <div>
          <h2 className="title1">Notes</h2>
          {notes.map((note) => (
            <Note key={note.id} note={note} onDelete={deleteNotes} />
          ))}
          <div className="NB">
            {notes.length > 0 ? (
              `Total Notes: ${notes.length}`
            ) : (
              <p>No notes available. Create one!</p>
            )}
          </div>
        </div>

        <h2 className="title1">Create a Note</h2>

        <form
          onSubmit={(e) => {
            createNotes(e);
          }}
        >
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              aria-label="Note-title"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="input-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              aria-label="Note-body"
              required
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </div>

          <button className="submit-btn" type="submit">
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
