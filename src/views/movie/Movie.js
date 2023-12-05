import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { getMovies, deleteMovieFromId } from "./Service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import alertify from "alertifyjs";
import { toast } from "react-toastify";

const Movie = () => {
  const [movies, setMovies] = useState([]);

  const loadMovies = useCallback(() => {
    getMovies()
      .then((data) => {
        const apiResponse = data.data;
        setMovies(apiResponse);
      })
      .catch((error) => {
        toast.error("Error occured while fetching data");
      });
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  // delete the selected movie
  const deleteMovie = (id) => {
    alertify.confirm(
      "Delete",
      "Are you sure want to delete the selected movie?",
      function () {
        deleteMovieFromId(id)
          .then((data) => {
            toast.success(data.data.message);
            loadMovies();
          })
          .catch((error) => {
            toast.error("Failed to delete the movie");
          });
      },
      function () {}
    );
  };

  const datatableHeader = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Movies</span>
      <Button icon="pi pi-refresh" rounded raised />
    </div>
  );

  const footer = `In total there are ${movies ? movies.length : 0} movies.`;

  const formatDate = (movie) => {
    return new Date(movie.created_at).toLocaleString();
  };

  const movieRating = (movie) => {
    return <Rating value={movie.rating} readOnly cancel={false} />;
  };

  const getMovieStatus = (movie) => {
    const severity = movie.status ? "success" : "danger";
    const statusValue = movie.status ? "ACTIVE" : "INACTIVE";
    return <Tag value={statusValue} severity={severity} />;
  };

  const getMovieTheatre = (movie) => movie.theatre_id.title;

  const getMoviePrice = movie => `$${movie.price}`;

  const actionBodyTemplate = (movie) => {
    return (
      <>
        <div className="d-inline-flex">
          <NavLink to={`/movie/update/${movie._id}`}>
            <Button type="button" className="btn btn-default" icon="pi pi-pencil" rounded></Button>
          </NavLink>
          <Button
            onClick={() => deleteMovie(movie._id)}
            type="button"
            icon="pi pi-trash"
            className="btn btn-default"
            rounded
          ></Button>
          <NavLink to={`/movie/booking/${movie._id}`}>
            <Button type="button" className="btn btn-default" icon="pi pi-folder" rounded></Button>
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-12 text-end mb-2">
          <NavLink to="/movie/create">
            <button type="button" className="btn btn-sm btn-primary">
              Add New
            </button>
          </NavLink>
        </div>
        <div className="col-12">
          <DataTable
            size="small"
            value={movies}
            header={datatableHeader}
            footer={footer}
            paginator
            rows={10}
            rowsPerPageOptions={[10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="title" sortable header="Title"></Column>
            <Column body={getMovieTheatre} header="Theatre"></Column>
            <Column body={getMovieStatus} header="Status"></Column>
            <Column field="currency" sortable header="Currency"></Column>
            <Column body={getMoviePrice} header="Price"></Column>
            <Column body={movieRating} header="Rating"></Column>
            <Column field="genre" sortable header="Genre"></Column>
            <Column field="release_year" sortable header="Release Year"></Column>
            <Column body={formatDate} header="Created At"></Column>
            <Column
              headerStyle={{ width: "5rem", textAlign: "center" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              body={actionBodyTemplate}
            />
          </DataTable>
        </div>
      </div>
    </>
  );
};

export default Movie;
