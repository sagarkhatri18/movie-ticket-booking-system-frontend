import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { deleteTheatreFromId, getTheatres } from "./Service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import alertify from "alertifyjs";
import { toast } from "react-toastify";

const Theatre = () => {
  const [theatres, setTheatres] = useState([]);

  const loadTheatres = useCallback(() => {
    getTheatres()
      .then((data) => {
        const apiResponse = data.data;
        setTheatres(apiResponse);
      })
      .catch((error) => {
        toast.error("Error occured while fetching data");
      });
  }, []);

  useEffect(() => {
    loadTheatres();
  }, [loadTheatres]);

  // delete the selected theatre
  const deleteTheatre = (id) => {
    alertify.confirm(
      "Delete",
      "Are you sure want to delete the selected theatre?",
      function () {
        deleteTheatreFromId(id)
          .then((data) => {
            toast.success(data.data.message);
            loadTheatres();
          })
          .catch((error) => {
            toast.error("Failed to delete the selected theatre");
          });
      },
      function () {}
    );
  };

  const datatableHeader = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Theatres</span>
      <Button icon="pi pi-refresh" rounded raised />
    </div>
  );

  const footer = `In total there are ${
    theatres ? theatres.length : 0
  } theatres.`;

  const getTheatreStatus = (theatre) => {
    const severity = theatre.status ? "success" : "danger";
    const statusValue = theatre.status ? "ACTIVE" : "INACTIVE";
    return <Tag value={statusValue} severity={severity} />;
  };

  const formatDate = (theatre) => {
    return new Date(theatre.created_at).toLocaleString();
  };

  const actionBodyTemplate = (theatre) => {
    return (
      <>
        <div className="d-inline-flex">
          <NavLink to={`/theatre/update/${theatre._id}`}>
            <Button type="button" className="btn btn-default" icon="pi pi-pencil" rounded></Button>
          </NavLink>
          <Button
            onClick={() => deleteTheatre(theatre._id)}
            type="button"
            icon="pi pi-trash"
            className="btn btn-default"
            rounded
          ></Button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-12 text-end mb-2">
          <NavLink to="/theatre/create">
            <button type="button" className="btn btn-sm btn-primary">
              Add New
            </button>
          </NavLink>
        </div>
        <div className="col-12">
          <DataTable
            size="small"
            value={theatres}
            header={datatableHeader}
            footer={footer}
            paginator
            rows={10}
            rowsPerPageOptions={[10, 25, 50]}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="title" header="Title"></Column>
            <Column body={getTheatreStatus} header="Status"></Column>
            <Column field="seat_capacity" header="Seat Capacity"></Column>
            <Column field="no_of_rows" header="Number of Rows"></Column>
            <Column
              field="seats_in_each_row"
              header="Seats in each row"
            ></Column>
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

export default Theatre;
