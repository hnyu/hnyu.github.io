// Each demo has a title (optionally linked), a one-line description, and a list
// of media items. A media item is either a local video file ({video: path}) or
// a YouTube video ({youtube: video_id}).
var demos = [
    {title: "Nvidia GB300 tester busbar assembly",
     url: "https://www.youtube.com/watch?v=ZSXQW6PLJrM",
     description: "A robot assembling busbars on Nvidia GB300 testers.",
     media: [
         {youtube: "ZSXQW6PLJrM", caption: "Live at GTC 2026"},
         {video: "./assets/busbar_grid.mp4", caption: "Policy robust to distractors and lighting changes"}
     ]
    },
    {title: "Humanoid desk cleanup",
     url: "https://www.youtube.com/watch?v=h6hTw6_7NlA",
     description: "A humanoid robot cleaning a desk.",
     media: [
         {video: "./assets/desk_cleanup.mp4", caption: "Bimanual pick & place trained with offline RL for behavior efficiency"}
     ]
    },
    {title: "SLIM",
     url: "https://horizonrobotics.github.io/gail/SLIM/",
     description: "A quadrupedal mobile manipulator performing long-horizon pick-and-place "
                + "outdoors, over mulch and grass, around obstacles and distractors. The "
                + "visuomotor policy is trained in simulation and transferred to the real "
                + "robot zero-shot.",
     media: [
         {video: "./assets/slim_mulch.mp4", caption: "Mulch"},
         {video: "./assets/slim_obstacle.mov", caption: "Obstacles"},
         {video: "./assets/slim_grass.MOV", caption: "Grass"},
         {video: "./assets/slim_distractors.mov", caption: "Concrete surface"}
     ]
    }
];
