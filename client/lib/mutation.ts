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
  // Token automatically attached via fetcher
  return fetcher("/jobs", body);
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
  appliedByUser: boolean; // true if current user applied
}

// ✅ Fetch all jobs
export const getJobs = () => {
  return fetcher<{ jobs: Job[] }>("/api/jobs");
};
