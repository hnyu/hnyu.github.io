var pubs = [
    {authors: "Haichao Zhang, Wei Xu, <u>Haonan Yu</u>",
     title: "Generative Planning for Temporally Coordinated Exploration in Reinforcement Learning",
     url: "https://arxiv.org/pdf/2201.09765.pdf",
     conference: "ICLR",
     year: "2022",
     resources: [
         "<a href='https://openreview.net/forum?id=YZHES8wIdE'>OpenReview</a>"
     ]
    },
    {authors: "<u>Haonan Yu</u>, Wei Xu, Haichao Zhang",
     title: "TAAC: Temporally Abstract Actor-Critic for Continuous Control",
     url: "https://arxiv.org/pdf/2104.06521.pdf",
     conference: "NeurIPS",
     year: "2021",
     resources: [
         "<a href='https://github.com/hnyu/taac'>Code</a>",
         "<a href='https://openreview.net/forum?id=PCLsRp_4R7C'>OpenReview</a>",
         "<a href='https://drive.google.com/file/d/19pARWfSqJIlMFhiWDYGvnKJYPB41_Thk/view?usp=sharing'>Slides</a>",
         "<a href='https://drive.google.com/file/d/1MRcMzPC57VH_cpz5pMT9uuK05i8dGg7S/view?usp=sharing'>Poster</a>",
         "<a href='https://drive.google.com/file/d/1WH1hOHa9gQPkK9pyjNSg1mbSEkiMBWIu/view?usp=sharing'>Video</a>"
     ]
    },
    {authors: "Jesse Zhang*, <u>Haonan Yu</u>*, Wei Xu",
     title: "Hierarchical Reinforcement Learning By Discovering Intrinsic Options",
     url: "https://arxiv.org/pdf/2101.06521.pdf",
     conference: "ICLR",
     year: "2021",
     note: "*Equal contribution",
     resources : [
         "<a href='https://github.com/jesbu1/hidio'>Code</a>"
     ]
    },
    {authors: "<u>Haonan Yu</u>, Sergey Edunov, Yuandong Tian, Ari S Morcos",
     title: "Playing the lottery with rewards and multiple languages: lottery tickets in rl and nlp",
     url: "https://arxiv.org/pdf/1906.02768.pdf",
     conference: "ICLR",
     year: "2020",
     resources: [
         "<a href='https://ai.facebook.com/blog/understanding-the-generalization-of-lottery-tickets-in-neural-networks/'>Blog post</a>"
     ]
    },
    {authors: "Jonathan Gray, Kavya Srinet, Yacine Jernite, <u>Haonan Yu</u>, Zhuoyuan Chen, Demi Guo, Siddharth Goyal, C. Lawrence Zitnick, Arthur Szlam",
     title: "CraftAssist: A Framework for Dialogue-enabled Interactive Agents",
     url: "https://arxiv.org/pdf/1907.08584.pdf",
     conference: "arXiv",
     year: "2019",
     resources: [
         "<a href='https://www.technologyreview.com/2019/08/29/133212/facebook-is-creating-an-ai-assistant-for-minecraft/'>Media</a>"
     ]
    },
    {authors: "Ari S Morcos, <u>Haonan Yu</u>, Michela Paganini, Yuandong Tian",
     title: "One ticket to win them all: generalizing lottery ticket initializations across datasets and optimizers",
     url: "https://arxiv.org/pdf/1906.02773.pdf",
     conference: "NeurIPS",
     year: "2019",
     resources: [
        "<a href='https://ai.facebook.com/blog/understanding-the-generalization-of-lottery-tickets-in-neural-networks/'>Blog post</a>"
    ]
    },
    {authors: "<u>Haonan Yu</u>, Xiaochen Lian, Haichao Zhang, Wei Xu",
     url: "http://proceedings.mlr.press/v87/yu18a/yu18a.pdf",
     title: "Guided feature transformation (gft): A neural language grounding module for embodied agents",
     conference: "CoRL",
     year: "2018",
     resources: [
        "<a href='https://github.com/PaddlePaddle/XWorld/tree/master/games/xworld3d'>XWorld3D</a>",
        "<a href='https://idlrl.github.io/flare/tutorial/gft.html'>PyTorch implementation of GFT</a>",
        "<a href='https://www.youtube.com/watch?v=bOBb1uhuJxg'>Video demo</a>"
     ]
    },
    {authors: "Haichao Zhang, <u>Haonan Yu</u>, Wei Xu",
    title: "Interactive language acquisition with one-shot visual concept learning through a conversational game",
    url: "https://arxiv.org/pdf/1805.00462.pdf",
    conference: "ACL",
    year: "2018"
    },
    {authors: "<u>Haonan Yu</u>, Haichao Zhang, Wei Xu",
     title: "Interactive grounded language acquisition and generalization in a 2d world",
     url: "https://arxiv.org/pdf/1802.01433.pdf",
     conference: "ICLR",
     year: "2018",
     resources: [
         "<a href='https://github.com/PaddlePaddle/XWorld'>XWorld</a> simulator code",
         "<a href='https://www.techrepublic.com/article/baidu-trained-an-ai-agent-to-navigate-the-world-like-a-parent-teaches-a-baby/'>Media</a>"
     ]
    },
    {authors: "<u>Haonan Yu</u>, Jeffrey Mark Siskind",
     title: "Sentence directed video object codiscovery",
     url: "https://link.springer.com/content/pdf/10.1007/s11263-017-1018-6.pdf",
     conference: "IJCV",
     year: "2017"
    },
    {authors: "<u>Haonan Yu</u>, Jiang Wang, Zhiheng Huang, Yi Yang, Wei Xu",
     title: "Video Paragraph Captioning Using Hierarchical Recurrent Neural Networks",
     url: "http://arxiv.org/pdf/1510.07712v2.pdf",
     conference: "CVPR",
     year: "2016",
     note: "Oral",
     resources: [
        "<a href='https://drive.google.com/open?id=1DXCldapcYSECI-sQxokZNyXgE3HNLAir'>"
        + "YouTubeClips</a> dataset (1.8GB) from the <i>Youtube2text</i> paper [Guadarrama <i>et al.</i>, 2013]",
        "<a href='https://www.youtube.com/watch?v=QmLGgJTbtVU'>Talk</a>"
     ]},
    {authors: "<u>Haonan Yu</u>, Siddharth Narayanaswamy, Andrei Barbu, Jeffrey Mark Siskind",
     title: "A Compositional Framework for Grounding Language Inference, Generation, and Acquisition in Video",
     url: "./papers/jair2015.pdf",
     conference: "JAIR",
     year: "2015",
     note: "in Award-Winning Paper Track"
    },
    {authors: "<u>Haonan Yu</u>, Jeffrey Mark Siskind",
     title: "Learning to Describe Video with Weak Supervision by Exploiting Negative Sentential Information",
     url: "./papers/aaai2015.pdf",
     conference: "AAAI",
     year: "2015",
     note: "Oral"},
    {authors: "<u>Haonan Yu</u>, Jeffrey Mark Siskind",
     title: "Grounded Language Learning from Video Described with Sentences",
     url: "./papers/acl2013.pdf",
     conference: "ACL",
     year: "2013",
     note: "<b style='color:red'>Best Paper Award</b>",
     resources: ["<a href='./slides/talk.pdf'>Slides</a>",
     //"<a href='./datasets/acl2013-dataset.zip'>Dataset</a> (105MB)"
    ]},
    {authors: "<u>Haonan Yu</u>, Jia Li, Yonghong Tian, Tiejun Huang",
     title: "Automatic Interesting Object Extraction From Images Using Complementary Saliency Maps",
     url: "./papers/acmmm2010.pdf",
     conference: "ACMMM",
     year: "2010"}
];
