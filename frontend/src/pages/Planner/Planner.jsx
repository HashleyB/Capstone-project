import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "react-modal";
import axios from "axios";
import "./planner.css";

const Planner = () => {
  const [events, setEvents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    client: ""
  });
  // eslint-disable-next-line no-unused-vars
  const [createdSessionId, setCreatedSessionId] = useState(null); // New state variable
  const [sessionList, setSessionList] = useState([]);

  useEffect(() => {
    fetchEvents();
    fetchSessionList(); // Fetch session list when the component mounts
  }, []);

  const fetchEvents = () => {
    axios.get("http://localhost:8080/training-session")
      .then(response => {
        const sessions = response.data.map(session => ({
          id: session._id,
          title: 'Training with ' + session.client,
          start: session.date,
          end: session.date,
          allDay: true,
          sessionData: session
        }));
        setEvents(sessions);
      })
      .catch(error => {
        console.error("Error fetching training sessions:", error);
      });
  };

  const fetchSessionList = () => {
    axios.get("http://localhost:8080/training-session")
      .then(response => {
        setSessionList(response.data);
      })
      .catch(error => {
        console.error("Error fetching session list:", error);
      });
  };

  const handleSessionSelect = (e) => {
    setSelectedSessionId(e.target.value);
  };

  const handleEventClick = (clickInfo) => {
    if (clickInfo.event.sessionData) {
      setSelectedSessionId(clickInfo.event.sessionData.id);
      setModalType("update");
      setFormData({
        date: clickInfo.event.startStr,
        startTime: clickInfo.event.sessionData.startTime,
        endTime: clickInfo.event.sessionData.endTime,
        client: clickInfo.event.sessionData.client._id
      });
      setModalIsOpen(true);
    } else {
      console.error('sessionData is undefined');
    }
  };

  const handleDateClick = (clickInfo) => {
    setModalType("create");
    setFormData({
      date: clickInfo.dateStr,
      startTime: "",
      endTime: "",
      client: ""
    });
    setModalIsOpen(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalType === "create") {
      axios.post("http://localhost:8080/training-session/book", formData)
        .then(response => {
          const newSession = {
            id: response.data.id,
            title: 'Training with ' + formData.client + ' (ID: ' + response.data.id + ')',
            start: formData.date,
            end: formData.date,
            allDay: true,
            sessionData: formData
          };
          setEvents([...events, newSession]); // Add the new session to the events array
          setModalIsOpen(false);
          setFormData({
            date: "",
            startTime: "",
            endTime: "",
            client: ""
          });
        })
        .catch(error => {
          console.error("Error creating session:", error);
        });
    } else if (modalType === "update") {
      axios.put(`http://localhost:8080/training-session/${selectedSessionId}`, formData)
        .then(() => {
          fetchEvents();
          setModalIsOpen(false);
          setFormData({
            date: "",
            startTime: "",
            endTime: "",
            client: ""
          });
        })
        .catch(error => {
          console.error("Error updating session:", error);
        });
    }
  };

  const handleDelete = () => {
    if (!selectedSessionId) {
      console.error("No session selected for deletion.");
      return;
    }
    axios.delete(`http://localhost:8080/training-session/${selectedSessionId}`)
      .then(() => {
        fetchEvents();
        setModalIsOpen(false);
        setFormData({
          date: "",
          startTime: "",
          endTime: "",
          client: ""
        });
      })
      .catch(error => {
        console.error("Error deleting session:", error);
      });
  };

  // Custom event rendering to allow HTML in titles
  const eventContent = ({ event }) => {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: event.title }} />
      </div>
    );
  };

  return (
    <div className="Planner">
      <h2>Training Sessions Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        eventContent={eventContent} // Use custom event rendering
      />
      <Modal isOpen={modalIsOpen} id="modal" className="Modal">
        <form onSubmit={handleSubmit}>
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleFormChange} required />
          <label>Start Time:</label>
          <input type="time" name="startTime" value={formData.startTime} onChange={handleFormChange} required />
          <label>End Time:</label>
          <input type="time" name="endTime" value={formData.endTime} onChange={handleFormChange} required />
          <label>Client</label>
          <input type="text" name="client" value={formData.client} onChange={handleFormChange} required />
          <div>
            <label>Select Session to Delete:</label>
            <select value={selectedSessionId} onChange={handleSessionSelect}>
              <option value="">Select Session</option>
              {sessionList.map(session => (
                <option key={session._id} value={session._id}>
                  {session.client} (ID: {session._id})
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleDelete}>Delete</button>
        </form>
        {/* Display the created session ID */}
        {createdSessionId && (
          <div>
            <p>Created Session ID: {createdSessionId}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Planner;
