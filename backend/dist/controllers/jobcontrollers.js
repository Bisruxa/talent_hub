import prisma from "../db.ts";
export const createJob = async (req, res) => {
    console.log("req.user:", req.user);
    try {
        const { title, description } = req.body;
        if (!req.user)
            return res.status(401).json({ error: "Unauthorized" });
        const job = await prisma.jobs.create({
            data: {
                title,
                description,
                createBy: req.user.id,
            },
        });
        res.status(201).json({ job });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create job" });
    }
};
export const getJobs = async (req, res) => {
    try {
        const userId = req.user.id;
        const jobs = await prisma.jobs.findMany({
            include: {
                _count: {
                    select: { Applications: true },
                },
                Applications: true,
                createByUser: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const jobsWithUserStatus = jobs.map((job) => {
            const appliedByUser = job.Applications.some((app) => app.userId === userId);
            return {
                ...job,
                appliedByUser,
            };
        });
        res.json({ jobs: jobsWithUserStatus });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
};
export const deletJob = async (req, res) => {
    try {
        let { id } = req.params;
        console.log("Raw ID from params:", id);
        // If ID has a colon prefix, remove it
        if (id && id.startsWith(":")) {
            id = id.substring(1);
        }
        console.log("Cleaned ID:", id);
        if (!req.user)
            return res.status(401).json({ error: "Unauthorized" });
        if (!id) {
            return res.status(400).json({ error: "Job ID is required" });
        }
        // Check if job exists
        const job = await prisma.jobs.findFirst({
            where: {
                id: id,
                createBy: req.user.id,
            },
        });
        console.log("Job found:", job);
        if (!job) {
            return res.status(404).json({ error: "Job not found or unauthorized" });
        }
        await prisma.jobs.delete({
            where: { id: id },
        });
        res.json({ message: "Job deleted successfully" });
    }
    catch (err) {
        console.error("Delete job error:", err);
        res.status(500).json({ error: "Failed to delete job" });
    }
};
//# sourceMappingURL=jobcontrollers.js.map