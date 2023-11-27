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
<<<<<<< HEAD
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="price">
              Price
            </label>
            <div className="col-md-4">
              <input
                id="price"
                name="price"
                type="number"
                placeholder="price"
                className="form-control input-md"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="currency">
              Currency
            </label>
            <div className="col-md-4">
              <input
                id="currency"
                name="currency"
                type="number"
                placeholder="CAD/USD"
                className="form-control input-md"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="genre">
              Genre
            </label>
            <div className="col-md-4">
              <input
                id="genre"
                name="genre"
                type="text"
                placeholder="Genre"
                className="form-control input-md"
              />
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-4 control-label" for="theatre_id">
              Theatre ID
            </label>
            <div class="col-md-4">
              <select id="theatre_id" name="theatre_id" class="form-control">
                <option value="1">Option one</option>
                <option value="2">Option two</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="realese_year">
              Realese Year
            </label>
            <div className="col-md-4">
              <input
                id="realese_year"
                name="realese_year"
                type="date"
                placeholder=""
                className="form-control input-md"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="play_time">
              Play Time
            </label>
            <div className="col-md-4">
              <input
                id="play_time"
                name="play_time"
                type="text"
                placeholder=""
                className="form-control input-md"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="director">
              Director
            </label>
            <div className="col-md-4">
              <input
                id="director"
                name="director"
                type="text"
                placeholder="Enter the movie director "
                className="form-control input-md"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="star_cast">
              Star Cast
            </label>
            <div className="col-md-4">
              <input
                id="star_cast"
                name="star_cast"
                type="text"
                placeholder=""
                className="form-control input-md"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-md-4 control-label" htmlFor="price">
              Rating
            </label>
            <div className="col-md-4">
              <input
                id="rating"
                name="rating"
                type="number"
                placeholder=""
                className="form-control input-md"
              />
            </div>
          </div>
=======
>>>>>>> 9c9fb35054ccb5969bbb6453d17d3e1e1f1fdd12
        </div>
      </div>
    </>
  );
};

export default Create;
