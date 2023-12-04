import React from "react";

export const Error = (props) => {
  // React.useEffect(() => {
  //   console.log(props.errors);
  // }, [props]);
  return (
    <>
      {props.errors !== "" ? (
        <div className="alert alert-danger fade show form-error" role="alert">
          <ul className="error-ul">
            {Object.keys(props.errors).map((err, index) => (
              <li key={index}>{`${err.toUpperCase()} - ${props.errors[err]}`}</li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
