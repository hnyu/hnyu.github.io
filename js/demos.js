// Each demo has a title, a one-line description, and a list
// of media items. A media item is either a local video file ({video: path},
// with a poster frame so mobile browsers show something before playback) or
// a YouTube video ({youtube: video_id}).
var demos = [
    {title: "Nvidia GB300 tester busbar assembly",
     description: "A robot assembling busbars on Nvidia GB300 tester boards. It needs to place the busbar and jigs on the board, tighten screws following a specific order, and remove the jigs.",
     media: [
         {youtube: "ZSXQW6PLJrM", caption: "Live at GTC 2026"},
         {video: "./assets/busbar_grid.mp4", poster: "./assets/posters/busbar_grid.jpg", caption: "Policy robust to distractors and lighting changes"}
     ]
    },
    {title: "Humanoid desk cleanup",
     description: "A humanoid robot cleaning a desk by putting containers into a bin.",
     media: [
         {video: "./assets/desk_cleanup.mp4", poster: "./assets/posters/desk_cleanup.jpg", caption: "Bimanual pick & place trained with offline RL for behavior efficiency"}
     ]
    },
    {title: "SLIM",
     description: "A quadrupedal mobile manipulator performing long-horizon pick-and-place "
                + "outdoors, over mulch and grass, around obstacles and distractors. The "
                + "visuomotor policy is trained in simulation and transferred to the real "
                + "robot zero-shot. The policy is goal conditioned.",
     media: [
         {video: "./assets/slim_mulch.mp4", poster: "./assets/posters/slim_mulch.jpg", caption: "[Mulch] red cube -> red basket"},
         {video: "./assets/slim_obstacle.mov", poster: "./assets/posters/slim_obstacle.jpg", caption: "[Obstacles] red cube -> blue basket"},
         {video: "./assets/slim_grass.MOV", poster: "./assets/posters/slim_grass.jpg", caption: "[Grass] yellow cube -> red basket"},
         {video: "./assets/slim_distractors.mov", poster: "./assets/posters/slim_distractors.jpg", caption: "[Concrete surface] green cube -> red basket"},
     ]
    }
];
