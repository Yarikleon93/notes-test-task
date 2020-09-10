import React, { useState, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { Link } from "react-router-dom";

export const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const { request } = useHttp();

  const deleteNote = async(event) => {
    event.preventDefault();
    const id = event.target.id;
    await request(`/api/notes/${id}`, 'DELETE', null);
    const notesAfterDeleted = notes.filter((note) => note.id !== id);
    setNotes(notesAfterDeleted);

  };

  const fetchNotes = useCallback(async () => {
    try {
      const fetched = await request("/api/notes");
      setNotes(fetched);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>Title</th>
          <th>Description</th>
          <th>Открыть</th>
          <th>Удалить</th>
        </tr>
      </thead>

      <tbody>
        {notes.map((note, index) => {
          return (
            <tr key={note.id}>
              <td>{index + 1}</td>
              <td>{note.title}</td>
              <td>{note.description.slice(0, 15)}</td>
              <td>
                <Link to={`/notes/${note.id}`}>Открыть</Link>
              </td>
              <td>
                <button className="btn waves-effect waves-light red accent-1" id={note.id} onClick={deleteNote}>
                  Удалить
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
