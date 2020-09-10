import React, { useState, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const CreatePage = () => {
  const message = useMessage();
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const creteNote = async () => {
    try {
      const data = await request("/api/notes", "POST", { ...form });
      message(data.message);
      console.log(data);
      setForm({ title: "", description: "" });
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
              <button className="btn waves-effect waves-light" name="button" onClick={creteNote}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
