// //ChannelPage.jsx
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import ChannelCard from "./ChannelCard";
// import "./channel.css";
// import { server } from "../../config";
// import Loading from "../loading"; 
// import CreateChannelForm from "../CreateChannelForm/CreateChannelForm"; 
// import NO_CHANNEL_IMAGE from "../../assets/no_chh.jpg";

// const MAX_CHANNELS = 4;

// const ChannelPage = () => {
//   const navigate = useNavigate();
//   const [channels, setChannels] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showPopup, setShowPopup] = useState(false);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchChannels = async () => {
//       if (!token) {
//         navigate("/signin");
//         return;
//       }
//       setIsLoading(true);
//       try {
//         const response = await axios.get(`${server}api/auth/channels`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log(response)
//         setChannels(response.data.channels);
//       } catch (error) {
//         console.error("Error fetching channels:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchChannels();
//   }, [navigate, token]);

//   const handleDeleteChannel = async (channelId) => {
//     try {
//       await axios.delete(`${server}api/auth/channels/${channelId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setChannels(channels.filter((channel) => channel._id !== channelId));
//     } catch (error) {
//       console.error("Error deleting channel:", error);
//     }
//   };

//   const handleChannelClick = (channelId) => {
//     navigate(`/dashboard/${channelId}`);
//   };

//   return (
//     <div className="container m-0">
//       <h2 className="text-center text-primary mb-0 pageHeading">Manage Channels</h2>
//       <br />
      
//       <div className="row">
//         <div className="col-md-8">
//           <div className="row row-cols-1 row-cols-md-2 g-2">
//             {isLoading ? (
//               <Loading message={"Loading channels..."} />
//             ) : channels.length > 0 ? (
//               channels.map((channel) => (
//                 <div className="col" key={channel._id}>
//                   <ChannelCard
//                     channel={channel}
//                     onChannelClick={handleChannelClick}
//                     onDelete={handleDeleteChannel}
//                   />
//                 </div>
//               ))
//             ) : (
//               <div className="no-channels text-center">
//                 <img src={NO_CHANNEL_IMAGE} alt="No Channels Available" className="no-channel-img" />
//                 <p>No channels available. Create one to get started!</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Section - 1/3 Width for Help Section */}
//         <div className="col-md-4 help-section sticky">
//           <h4 className="text-primary">Help & Instructions</h4>
//           <p>💡 Click on a channel to view its dashboard.</p>
//           <p>🗑️ Click the delete button to remove a channel.</p>
//           <p>➕ Use the "Create New Channel" button to add a new channel.</p>
//           <p>📊 The dashboard shows real-time data for your channel.</p>
//           <p>📌 Maximum {MAX_CHANNELS} channels are allowed.</p>

//           <button
//               className="btn btn-primary mb-3"
//               onClick={() => setShowPopup(true)}
//               disabled={channels.length >= MAX_CHANNELS}
//             >
//               {channels.length >= MAX_CHANNELS ? "Channel Limit Reached" : "Create New Channel"}
//             </button>
//         </div>
//       </div>

//       {/* Popup for Creating a New Channel */}
//       {showPopup && (
//         <div className="popup-overlay" onClick={() => setShowPopup(false)}>
//           <div className="popup-content" onClick={(e) => e.stopPropagation()}>
//             <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
//             <CreateChannelForm onClose={() => setShowPopup(false)} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChannelPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChannelCard from "./ChannelCard";
import "./channel.css";
import { server } from "../../config";
import Loading from "../loading";
import CreateChannelForm from "../CreateChannelForm/CreateChannelForm";
import NO_CHANNEL_IMAGE from "../../assets/no_chh.jpg";

const MAX_CHANNELS = 4;

const ChannelPage = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchChannels = async () => {
      if (!token) {
        navigate("/signin");
        return;
      }
      setIsLoading(true);
      try {
        const response = await axios.get(`${server}api/auth/channels`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChannels(response.data.channels);
      } catch (error) {
        console.error("Error fetching channels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChannels();
  }, [navigate, token]);

  const handleDeleteChannel = async (channelId) => {
    try {
      await axios.delete(`${server}api/auth/channels/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChannels(channels.filter((channel) => channel._id !== channelId));
    } catch (error) {
      console.error("Error deleting channel:", error);
    }
  };

  const handleChannelClick = (channelId) => {
    navigate(`/dashboard/${channelId}`);
  };

  return (
    <div className="container-fluid">
      <div className="row">
          <center><h2>Mannage Channels</h2></center>
        {/* Left Column (Channels Section) */}
        <div className="col-sm-12 col-md-8 mt-2">
          <div className="col-pad">
            {/* Channels Grid */}
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {isLoading ? (
                <Loading message={"Loading channels..."} />
              ) : channels.length > 0 ? (
                channels.map((channel) => (
                  <div className="col" key={channel._id}>
                    <ChannelCard
                      channel={channel}
                      onChannelClick={handleChannelClick}
                      onDelete={handleDeleteChannel}
                    />
                  </div>
                ))
              ) : (
                <div className="no-channels text-center">
                  <img src={NO_CHANNEL_IMAGE} alt="No Channels Available" className="no-channel-img" />
                  <p>No channels available. Create one to get started!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (Help Section) */}
        <div className="col-sm-12 col-md-4 help">
          <h3>Help</h3>
          <div className="col-pad">
            <p>Collect data in a channel from a device and use multiple fields to store different data and visualise it.</p>
            <p>Click <strong>New Channel</strong> to create a new channel.</p>
            <p>Click on a channel card to view its dashboard.</p>
            <p>
              Learn to{" "}
              <span
                style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                onClick={() => navigate("/tutorial")}
              >
                create channels
              </span>
              , explore and transform data.
            </p>
          </div>


          {/* New Channel Button */}
          <div className="row mb-3">
              <div className="col-md-5">
                <button
                  className="btn btn-primary"
                  onClick={() => setShowPopup(true)}
                  disabled={channels.length >= MAX_CHANNELS}
                >
                  {channels.length >= MAX_CHANNELS ? "Channel Limit Reached" : "New Channel"}
                </button>
              </div>
            </div>
        </div>
      </div>

      {/* Popup for Creating a New Channel */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
            <CreateChannelForm onClose={() => setShowPopup(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChannelPage;