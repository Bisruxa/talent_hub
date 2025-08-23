import prisma from "../db.js";
export const applyForJob = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { jobId } = req.body;
        if (!userId || !jobId) {
            return res.status(400).json({ error: "Job ID is required" });
        }
        // Check if the user already applied
        const existingApplication = await prisma.applications.findFirst({
            where: { jobId, userId },
        });
        if (existingApplication) {
            return res.status(400).json({ error: "You already applied to this job" });
        }
        // Create application
        const application = await prisma.applications.create({
            data: {
                jobId,
                userId,
                status: "applied",
            },
        });
        res.status(201).json({
            message: "Application submitted successfully",
            application,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to apply for job" });
    }
};
export const getMyApplications = async (req, res) => {
    try {
        const userId = req.user.id;
        const jobs = await prisma.jobs.findMany({
            include: {
                Applications: true,
                createByUser: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        // Only include jobs the user applied for
        const appliedJobs = jobs
            .map((job) => {
            const appliedByUser = job.Applications.some((app) => app.userId === userId);
            return { ...job, appliedByUser };
        })
            .filter((job) => job.appliedByUser);
        res.json({ jobs: appliedJobs });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch applied jobs" });
    }
};
//# sourceMappingURL=Applicationcontrollers.js.map