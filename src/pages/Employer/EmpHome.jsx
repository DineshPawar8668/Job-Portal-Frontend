import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyJob, getAllJobs, createJob } from "../../redux/slices/jobSlice";
import { toast } from "react-toastify";
import "./jobs.css";
import { useNavigate } from "react-router-dom";

const EmpHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state selectors
  const { jobs, applyLoading, jobLoading, error } = useSelector(
    (state) => state.jobs
  );

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    type: "Full-Time",
  });

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleApply = (jobId) => {
    dispatch(applyJob(jobId));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createJob(formData)).unwrap();
      toast.success("Job created successfully");
      setShowForm(false);
      setFormData({
        title: "",
        description: "",
        company: "",
        location: "",
        type: "Full-Time",
      });

      dispatch(getAllJobs());
    } catch (err) {
      toast.error(err || "Failed to create job");
    }
  };
  return (
    <div className="jobseeker-container" style={{ height: "90vh" }}>
      <div className="header-bar">
        <h2>Available Jobs</h2>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          Add New Job
        </button>
      </div>

      {showForm && (
        <div className="job-form-modal">
          <form className="job-form" onSubmit={handleSubmit}>
            <h3>Create New Job</h3>
            <input
              name="title"
              placeholder="Job Title"
              value={formData.title}
              onChange={handleInputChange}
              required
              disabled={jobLoading}
            />
            <input
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleInputChange}
              required
              disabled={jobLoading}
            />
            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
              required
              disabled={jobLoading}
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              disabled={jobLoading}
            >
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
            <textarea
              name="description"
              placeholder="Job Description"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              required
              disabled={jobLoading}
            ></textarea>
            <div className="form-actions">
              <button type="submit" disabled={jobLoading}>
                {jobLoading ? "Posting..." : "Post Job"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={jobLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {jobs?.length === 0 ? (
        <p>No jobs available right now.</p>
      ) : (
        <div className="job-list">
          {jobs?.map((job) => (
            <div className="job-card" key={job._id}>
              <h3>{job.title}</h3>
              <p>
                <strong>Company:</strong> {job?.company}
              </p>
              <p>
                <strong>Location:</strong> {job?.location}
              </p>
              <p>
                <strong>Type:</strong> {job?.type}
              </p>
              <p>{job?.description}</p>
              <button onClick={() => navigate(`/job/${job._id}`)}>
                Get Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmpHome;
