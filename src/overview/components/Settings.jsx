export default function Settings() {
  return (
    <div className="dashboard-container settings-page">
      <div className="settings-content">
        <h1 className="settings-title">Manage Profile</h1>

        <div className="profile-card">
          <div className="profile-avatar">
            <img
              src="/placeholder.svg?height=120&width=120"
              alt="User profile"
            />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">Mulyono</h2>
            <p className="profile-email">mulyono01@gmail.com</p>
          </div>
        </div>

        <div className="form-section">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">Username*</label>
              <input
                type="text"
                id="username"
                className="form-control"
                defaultValue="Mulyono"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                className="form-control"
                defaultValue="mulyono01@gmail.com"
              />
            </div>
          </div>
        </div>

        <div className="form-divider"></div>

        <div className="form-section">
          <h2 className="section-title">Password</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="currentPassword">Current password</label>
              <div className="password-input-container">
                <input
                  type="password"
                  id="currentPassword"
                  className="form-control"
                  defaultValue="******"
                />
                <button
                  className="password-toggle"
                  aria-label="Toggle password visibility"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New password</label>
              <div className="password-input-container">
                <input
                  type="password"
                  id="newPassword"
                  className="form-control"
                  defaultValue="******"
                />
                <button
                  className="password-toggle"
                  aria-label="Toggle password visibility"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm password</label>
              <div className="password-input-container">
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-control"
                  defaultValue="******"
                />
                <button
                  className="password-toggle"
                  aria-label="Toggle password visibility"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="save-changes-container">
            <button className="save-changes-btn">Save Changes</button>
          </div>
        </div>

        <div className="form-divider"></div>

        <div className="form-section">
          <h2 className="section-title">Profile image</h2>
          <div className="profile-image-upload">
            <div className="upload-area">
              <div className="upload-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
                    fill="#9CA3AF"
                  />
                </svg>
              </div>
              <p className="upload-text">Drag And Drop Files Here Or Upload</p>
              <p className="upload-info">
                Accepted file types: JPG, SVG, PNG 120 x 120 (px)
              </p>
            </div>
            <button className="upload-btn">Upload</button>
          </div>
        </div>

        <div className="form-actions">
          <button className="cancel-btn">Cancel</button>
          <button className="save-btn">Save</button>
        </div>
      </div>
    </div>
  );
}
