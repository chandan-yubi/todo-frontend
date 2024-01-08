import React, { useEffect, useState } from "react";
import "./Profile.css";
import { UserData } from "../../models/UserData";
import { userService } from "../../services/user/user.service";
import Loader from "../../components/Loader/Loader";

const Profile = () => {
  const [myProfile, setMyProfile] = useState<UserData | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getMyProfile().then((response) => {
      console.log(response);
      setMyProfile(response);
      setLoading(false);
    })
    .catch((err) => {
      console.log("Profile Error Response", err)
      setLoading(false)
    })
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="profile-page">
          <div className="profile-container">
            <div className="profile-header">
              <h2>Your Profile</h2>
            </div>
            <div className="profile-content">
              <div className="profile-picture">
                <img src={myProfile?.profileUrl} alt="Profile" />
              </div>
              <div className="profile-details">
                <p>
                  <strong>Name:</strong> {myProfile?.name}
                </p>
                <p>
                  <strong>Email:</strong> {myProfile?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
