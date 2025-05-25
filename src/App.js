import React, { useEffect, useState } from "react";

function App() {
  const [fbReady, setFbReady] = useState(false);
  const [user, setUser] = useState(null);

  // Load FB SDK
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "1049640049830038",
        cookie: true,
        xfbml: false,
        version: "v17.0",
      });

      setFbReady(true);

      // Check login status
      window.FB.getLoginStatus((response) => {
        if (response.status === "connected") {
          fetchUserProfile();
        }
      });
    };

    // Load SDK if not already loaded
    if (!document.getElementById("facebook-jssdk")) {
      const js = document.createElement("script");
      js.id = "facebook-jssdk";
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      document.body.appendChild(js);
    }
  }, []);

  const handleFacebookLogin = () => {
    if (!window.FB) return;

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          fetchUserProfile();
        }
      },
      { scope: "public_profile" } // Keep it simple and public
    );
  };

  const fetchUserProfile = () => {
    window.FB.api("/me", { fields: "name,picture" }, (profile) => {
      setUser(profile);
    });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1>🚀 Social Media Post Creator</h1>

      {user ? (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <img
            src={user.picture?.data?.url}
            alt="Profile"
            style={{ borderRadius: "50%", margin: "20px 0" }}
          />
          <p>You are logged in with Facebook.</p>
          {/* You can now show your posting UI here */}
        </div>
      ) : (
        <>
          <p>Please log in to post on Facebook.</p>
          <button
            onClick={handleFacebookLogin}
            disabled={!fbReady}
            style={{
              backgroundColor: "#1877F2",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Login with Facebook
          </button>
        </>
      )}
    </div>
  );
}

export default App;
