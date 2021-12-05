import React from "react";
import ReactDom from "react-dom";

export default class Modal extends React.Component {
  render() {
    // from public/index.html
    const modalContainer = document.getElementById("modal-container");

    // React portal lets us choose where we want component to be rendered
    // i.e. outside the element that it's declared in
    // createPortal(what should be rendered, where it should be rendered)
    // return ReactDom.createPortal(
    //   <div
    //     className="modal fade"
    //     tabindex="-1"
    //     aria-labelledby="exampleModalLabel"
    //     aria-hidden="true"
    //   >
    //     <div className="modal-dialog">
    //       <div className="modal-content">
    //         <div className="modal-header">
    //           <h5 className="modal-title" id="exampleModalLabel">
    //             Modal title
    //           </h5>
    //           <button
    //             type="button"
    //             className="btn-close"
    //             data-bs-dismiss="modal"
    //             aria-label="Close"
    //           ></button>
    //         </div>
    //         <div className="modal-body">...</div>
    //         <div className="modal-footer">
    //           <button
    //             type="button"
    //             className="btn btn-secondary"
    //             data-bs-dismiss="modal"
    //           >
    //             Close
    //           </button>
    //           <button type="button" className="btn btn-primary">
    //             Save changes
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>,
    //   modalContainer
    // );
    return ReactDom.createPortal(
      <div className="modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={this.props.onCloseModal}
              ></button>
            </div>
            <div className="modal-body">{this.props.body()}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.props.onCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>,
      modalContainer
    );
  }
}
