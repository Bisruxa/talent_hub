import fetcher from "./fetcher";

export const auth = async (
  mode: "signin" | "signup",
  body: {
    email: string;
    password: string;
    name?: string;
    role?: string;
  }
) => {
  const url = mode === "signin" ? "/auth/login" : "/auth/register";
  const res = await fetcher<{
    token: string;
    user: { id: string; name: string; email: string };
  }>(url, body);
  if (res.token) {
    localStorage.setItem("token", res.token);
    localStorage.setItem("userId", res.user.id);
  }

  return res;
};

export interface CreateJobInput {
  title: string;
  description: string;
}

export const createJob = (body: CreateJobInput) => {
  return fetcher("/api/jobs", body);
};

export interface Job {
  id: string;
  title: string;
  description: string;
  role: string;
  date: string;
  createBy: string;
  createByUser: {
    id: string;
    name: string;
    email: string;
  };
  Applications: Array<{
    id: string;
    status: string;
    jobId: string;
    userId: string;
    createdAt: string;
  }>;
  appliedByUser: boolean;
}

export const getJobs = () => {
  return fetcher<{ jobs: Job[] }>("/api/jobs", undefined, "GET");
};

// Add the deleteJob function
export const deleteJob = (id: string) => {
  return fetcher(`/api/jobs/:${id}`, undefined, "DELETE");
};

// fetch applications
export const getMyApplications = () => {
  return fetcher<{ jobs: Job[] }>(
    "/api/applications",
    undefined,
    "GET"
  );
};
// Apply for a job using fetcher
export const applyJob = (jobId: string, note?: string) => {
  return fetcher("/api/applications", { jobId, note }, "POST");
};