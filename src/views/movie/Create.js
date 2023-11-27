import React from "react";

const Create = () => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="Title">
              Movie Title
            </label>
            <div className="col-md-4">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Movie Title"
                className="form-control input-md"
                required=""
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="status">
              Status
            </label>
            <div className="col-md-4">
              <label className="radio-inline" htmlFor="status-0">
                <input
                  type="radio"
                  name="status"
                  id="status-0"
                  value="1"
                  checked="checked"
                />
                Active
              </label>
              <label className="radio-inline" htmlFor="status-1">
                <input type="radio" name="status" id="status-1" value="0" />
                Inactive
              </label>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="description">
              Description
            </label>
            <div className="col-md-4">
              <textarea
                className="form-control"
                id="description"
                name="description"
              >
                Add movie description here
              </textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
