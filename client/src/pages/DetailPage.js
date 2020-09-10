import React, { useState, useEffect, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { useParams } from 'react-router-dom';

export const DetailPage = () => {
    const message = useMessage();
    const { loading, request, error, clearError } = useHttp();
    const noteId = useParams().id;
    const [form, setForm] = useState({
      title: "",
      description: "",
    });

    const fetchNote = useCallback(async () => {
        try {
          const fetched = await request(`/api/notes/${noteId}`);
          setForm({...fetched})
          window.M.updateTextFields();
        } catch (e) {}
      }, [request, noteId]);

      useEffect(() => {
        fetchNote();
      }, [fetchNote]);
  
    useEffect(() => {
      message(error);
      clearError();
    }, [error, message, clearError]);
  
    const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
    };
  
    const updateNote = async () => {
      try {
        const data = await request(`/api/notes/${noteId}`, "PUT", { ...form });
        message(data.message);
        
        console.log(data);
      } catch (e) {}
    };
    return (
    <div className="row">
    <div className="col s6 offset-s3">
      <div className="card white darken-1">
        <div className="card-content white-text">
          <div className="input-field col s6">
            <input id="input_text" type="text" name="title" onChange={changeHandler} value={form.title} />
            <label htmlFor="input_text">Title</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s10" style={{ marginLeft: 35 }}>
            <textarea id="textarea2" className="materialize-textarea" name="description" onChange={changeHandler} disabled={loading} value={form.description}></textarea>
            <label htmlFor="textarea2">Description</label>
            <button className="btn waves-effect waves-light" onClick={updateNote}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
}