import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { getBookings, markAsInactive, getBookingById } from "./Service";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import alertify from "alertifyjs";
import { toast } from "react-toastify";
import BookingTicket from "./BookingTicket";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [booking, setBooking] = useState(null);

  const loadBookings = useCallback(() => {
    getBookings()
      .then((data) => {
        setBookings(data.data);
      })
      .catch((error) => {
        toast.error("Error occured while fetching data");
      });
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  // mark the particular booking as inactive
  const makeInactive = (id) => {
    alertify.confirm(
      "Mark as Inactive",
      "Are you sure want to mark the booking as inactive?",
      function () {
        markAsInactive(id)
          .then((data) => {
            toast.success(data.data.message);
            loadBookings();
          })
          .catch((error) => {
            toast.error("Failed to mark the booking as inactive");
          });
      },
      function () {}
    );
  };

  const datatableHeader = (
    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
      <span className="text-xl text-900 font-bold">Bookings</span>
      <Button icon="pi pi-refresh" rounded raised />
    </div>
  );

  const getMovieTitle = (booking) => booking.movie_id.title;

  const getMovieTheatre = (booking) => booking.movie_id.theatre_id.title;

  const getSubTotal = (booking) => `$${booking.sub_total}`;

  const getTax = (booking) => `$${booking.tax}`;

  const getTotal = (booking) => `$${booking.total}`;

  const footer = `In total there are ${
    bookings ? bookings.length : 0
  } bookings.`;

  const formatDate = (booking) => new Date(booking.created_at).toLocaleString();

  const getBookingStatus = (booking) => {
    const severity = booking.status ? "success" : "danger";
    const statusValue = booking.status ? "ACTIVE" : "INACTIVE";
    return <Tag value={statusValue} severity={severity} />;
  };

  const openModal = (id) => {
    getBookingById(id)
      .then((data) => {
        setBooking(data.data.data);
        setModalShow(true);
      })
      .catch((error) => {
        toast.error("Failed to mark the booking as inactive");
      });
  };

  // close modal for uploaded files list
  const closeModal = () => setModalShow(false);

  const closeBtn = (
    <button className="close" onClick={closeModal}>
      &times;
    </button>
  );

  const actionBodyTemplate = (booking) => {
    return (
      <>
        <div className="d-inline-flex">
          <Button
            onClick={() => makeInactive(booking._id)}
            type="button"
            icon="pi pi-times"
            className="btn btn-default"
            rounded
          ></Button>
          <Button
            onClick={() => openModal(booking._id)}
            type="button"
            icon="pi pi-ticket"
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
        <div className="col-12">
          <DataTable
            size="small"
            value={bookings}
            header={datatableHeader}
            footer={footer}
            paginator
            rows={10}
            rowsPerPageOptions={[10, 25, 50]}
            tableStyle={{ minWidth: "100rem" }}
          >
            <Column field="name" sortable header="Name"></Column>
            <Column field="email" sortable header="Email"></Column>
            <Column field="contact" header="Contact"></Column>
            <Column body={getBookingStatus} header="Status"></Column>
            <Column body={getMovieTitle} header="Movie"></Column>
            <Column body={getMovieTheatre} header="Theatre"></Column>
            <Column field="quantity" sortable header="Quantity"></Column>
            <Column body={getSubTotal} header="Sub Total"></Column>
            <Column body={getTax} header="Tax"></Column>
            <Column body={getTotal} header="Total"></Column>
            <Column body={formatDate} header="Created At"></Column>
            <Column
              headerStyle={{ width: "5rem", textAlign: "center" }}
              bodyStyle={{ textAlign: "center", overflow: "visible" }}
              body={actionBodyTemplate}
            />
          </DataTable>
        </div>
        <Modal isOpen={modalShow} toggle={closeModal}>
          <ModalHeader toggle={closeModal} close={closeBtn}>
            Ticket
          </ModalHeader>
          <ModalBody>
            <BookingTicket data={booking}/>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default Booking;
