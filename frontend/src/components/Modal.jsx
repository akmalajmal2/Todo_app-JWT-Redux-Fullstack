// import { memo, useState } from "react";
// import styles from "./Modal.module.css";
// import reactDOM from "react-dom";
// import { IoMdClose } from "react-icons/io";

// const Modal = memo(({ formValue, title, isOpen, onClose, onSubmit }) => {
//   if (!isOpen) return null;
//   const [formData, setFormData] = useState(formValue);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//     onClose();
//   };

//   return reactDOM.createPortal(
//     <div className={styles["modal-overlay"]}>
//       <div
//         className={styles["modal-content"]}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <h2>{title}</h2>
//         <span className={styles["close"]} onClick={() => onClose()}>
//           <IoMdClose />
//         </span>
//         <form onSubmit={handleSubmit}>
//           <div className={styles["modal-group"]}>
//             <label>Title</label>
//             <input
//               placeholder="Enter Title"
//               onChange={handleInputChange}
//               value={formData.title}
//               required
//               name="title"
//             />
//           </div>
//           <div className={styles["modal-group"]}>
//             <label>Description</label>
//             <textarea
//               placeholder="Enter Description"
//               onChange={handleInputChange}
//               value={formData.description}
//               required
//               name="description"
//             />
//           </div>
//           <div className={styles["modal-buttons"]}>
//             <button onClick={onSubmit}>Add Todo</button>
//             {/* <button onClick={onClose}>Close</button> */}
//           </div>
//         </form>
//       </div>
//     </div>,
//     document.getElementById("model-root")
//   );
// });
// export default Modal;

import { memo, useEffect, useState } from "react";
import styles from "./Modal.module.css";
import reactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";

const Modal = memo((props) => {
  useEffect(() => {
    if (props.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [props.isOpen]);
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      props.onClose();
    }
  };
  return props.isOpen
    ? reactDOM.createPortal(
        <div className={styles["modal-overlay"]} onClick={handleOverlayClick}>
          <IoMdClose className={styles["close"]} onClick={props.onClose} />
          <div
            className={styles["modal-content"]}
            onClick={(e) => e.stopPropagation()}
          >
            {props.children}
          </div>
        </div>,
        document.getElementById("model-root")
      )
    : null;
});
export default Modal;
