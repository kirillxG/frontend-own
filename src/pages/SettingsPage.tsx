import { useNavigate } from "react-router-dom";
import "../css/settings.css";

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="settingsPage">
      <div className="settingsMain">
        <header className="settingsHeader">
          <p className="pill">Account</p>
          <h1 className="settingsTitle">Settings</h1>
          <p className="settingsSub">
            Preferences live here. Security still lives on the server.
          </p>
        </header>

        <section className="settingsCard">
          <div className="settingsSection">
            <div className="sectionTitle">Profile</div>
            <div className="sectionBody">
              <div className="row">
                <div>
                  <div className="rowLabel">Username</div>
                  <div className="rowHint">Change later (optional)</div>
                </div>
                <button
                  className="btn btnSecondary btnSm"
                  type="button"
                  disabled
                >
                  Edit
                </button>
              </div>

              <div className="row">
                <div>
                  <div className="rowLabel">Email</div>
                  <div className="rowHint">
                    Optional. Add later for recovery.
                  </div>
                </div>
                <button
                  className="btn btnSecondary btnSm"
                  type="button"
                  disabled
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="divider" />

          <div className="settingsSection">
            <div className="sectionTitle">Privacy</div>
            <div className="sectionBody">
              <label className="toggleRow">
                <input className="check" type="checkbox" defaultChecked />
                <div>
                  <div className="rowLabel">Show activity status</div>
                  <div className="rowHint">
                    Controls whether others can see you online.
                  </div>
                </div>
              </label>

              <label className="toggleRow">
                <input className="check" type="checkbox" defaultChecked />
                <div>
                  <div className="rowLabel">Allow mentions</div>
                  <div className="rowHint">
                    Allow users to mention you in topics.
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="divider" />

          <div className="settingsSection">
            <div className="sectionTitle">Security</div>
            <div className="sectionBody">
              <div className="row">
                <div>
                  <div className="rowLabel">Password</div>
                  <div className="rowHint">
                    Change password (recommended periodically).
                  </div>
                </div>
                <button
                  className="btn btnSecondary btnSm"
                  type="button"
                  disabled
                >
                  Change
                </button>
              </div>

              <div className="row">
                <div>
                  <div className="rowLabel">Sessions</div>
                  <div className="rowHint">
                    Review active sessions and revoke them.
                  </div>
                </div>
                <button
                  className="btn btnSecondary btnSm"
                  type="button"
                  disabled
                >
                  Manage
                </button>
              </div>
            </div>
          </div>

          <div className="settingsSpacer" />

          <div className="settingsBottom">
            <button
              className="btn btnGhost btnBlock logoutBtn"
              type="button"
              onClick={() => navigate("/logout")}
            >
              Log out
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
