import "../css/courseCard.css";
import gambar1 from "../../assets/gambar1.png"
import gambar2 from "../../assets/gambar2.png"
import gambar3 from "../../assets/gambar3.png"
import gambar4 from "../../assets/gambar4.png"
// Fix: Import from react-icons/lu was incorrect, switching to react-icons/fa
import { FaFileAlt } from "react-icons/fa";

function CourseCard({
  title,
  image,
  date,
  students,
  materials,
  description,
  buttonText,
  disabled = false,
}) {
  return (
    <div className="course-card">
      <div className="course-image-container">
        <img
          src={image || "/placeholder.jpg"}
          alt={title}
          className="course-image"
        />
      </div>

      <div className="course-content">
        <div className="course-header">
          <span className="course-date">{date}</span>
          {students > 0 && (
            <div className="course-students">
              <div className="student-avatars">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="student-avatar" />
                ))}
              </div>
              <span className="students-count">+ {students} students</span>
            </div>
          )}
        </div>

        <h3 className="course-title">{title}</h3>

        <p className="course-description">{description}</p>

        <div className="course-footer">
          <div className="materials">
            <FaFileAlt className="document-icon" />
            <span className="materials-text">
              {materials} Materials Available
            </span>
          </div>

          <button
            className={`btn ${disabled ? "btn-disabled" : "btn-primary"}`}
            disabled={disabled}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
