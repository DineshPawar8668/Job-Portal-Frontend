import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getApplicants } from "../../redux/slices/jobSlice";
import { toast } from "react-toastify";
import "./jobs.css"; // 👈 correct CSS file import

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { jobDetails, applicants, jobLoading, error } = useSelector(
    (state) => state.jobs
  );

  useEffect(() => {
    dispatch(getApplicants(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
console.log(jobDetails,"jobDetails")
  return (
    <div className="job-details-container">
      {jobLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {jobDetails && (
            <div className="job-info">
              <h2>{jobDetails.title}</h2>
              <p><strong>Company:</strong> {jobDetails.company}</p>
              <p><strong>Location:</strong> {jobDetails.location}</p>
              <p><strong>Type:</strong> {jobDetails.type}</p>
              <p>{jobDetails.description}</p>
            </div>
          )}

          <div className="applicants-list">
            <h3>Applicants</h3>
            {applicants.length === 0 ? (
              <p>No applicants yet.</p>
            ) : (
              <ul>
                {applicants.map((app) => (
                  <li key={app._id}>
                    <p><strong>Name:</strong> {app.name}</p>
                    <p><strong>Email:</strong> {app.email}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default JobDetails;
