import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyJob } from "../../redux/slices/jobSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "./jobs.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const JobSeekerHome = () => {
  const dispatch = useDispatch();
  const { applyLoading } = useSelector((state) => state.jobs);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}jobs/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(response.data || []);
        setFilteredJobs(response.data || []);
      } catch (err) {
        toast.error("Failed to load jobs");
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs whenever filters or jobs change
  useEffect(() => {
    let filtered = jobs;

    if (filters.title.trim()) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }
    if (filters.company.trim()) {
      filtered = filtered.filter((job) =>
        job.company.toLowerCase().includes(filters.company.toLowerCase())
      );
    }
    if (filters.location.trim()) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.type) {
      filtered = filtered.filter((job) => job.type === filters.type);
    }

    setFilteredJobs(filtered);
  }, [filters, jobs]);

  const handleApply = async (jobId) => {
    await dispatch(applyJob(jobId));
    // Refresh jobs list after applying
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}jobs/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(response.data || []);
    } catch {
      toast.error("Failed to refresh jobs");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="jobseeker-container">
      <h2>Available Jobs</h2>

      <div className="filters">
        <input
          type="text"
          name="title"
          placeholder="Filter by Title"
          value={filters.title}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Filter by Company"
          value={filters.company}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Filter by Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
        <select name="type" value={filters.type} onChange={handleFilterChange}>
          <option value="">All Types</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      {filteredJobs.length === 0 ? (
        <p>No jobs available matching your filters.</p>
      ) : (
        <div className="job-list">
          {filteredJobs.map((job) => (
            <div className="job-card" key={job._id}>
              <h3>{job.title}</h3>
              <p>
                <strong>Company:</strong> {job.company}
              </p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Type:</strong> {job.type}
              </p>
              <p>{job.description}</p>
              {job?.applied ? (
                <button disabled={applyLoading}>Applied</button>
              ) : (
                <button
                  onClick={() => handleApply(job._id)}
                  disabled={applyLoading}
                >
                  {applyLoading ? "Applying..." : "Apply Now"}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobSeekerHome;
