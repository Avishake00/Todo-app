interface Task {
    id: number;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
  }
  
  export const tasks: Task[] = [
    {
      id: 1,
      title: "Meditate for 10 minutes",
      description: "Take a short break to clear your mind and improve focus.",
      priority: "low",
    },
    {
      id: 2,
      title: "Complete React Native UI",
      description: "Finish building the bottom sheet with proper z-index handling.",
      priority: "high",
    },
    {
      id: 3,
      title: "Push code to GitHub",
      description: "Commit and push all local changes to the remote repo.",
      priority: "medium",
    },
    {
      id: 4,
      title: "Read 5 pages of a book",
      description: "Choose any book you're currently reading and knock out 5 pages.",
      priority: "low",
    },
    {
      id: 5,
      title: "Revise GATE OS Concepts",
      description: "Focus on process scheduling and memory management today.",
      priority: "high",
    },
    {
      id: 6,
      title: "Apply for 2 internships",
      description: "Search on LinkedIn and other platforms for suitable roles.",
      priority: "medium",
    },
    {
      id: 7,
      title: "Clean your workspace",
      description: "Organize your desk and clear out distractions.",
      priority: "low",
    },
    {
      id: 8,
      title: "Do 15 pushups",
      description: "Quick strength workout to keep active.",
      priority: "medium",
    },
  ];
  