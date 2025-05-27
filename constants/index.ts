import { CreateAssistantDTO, CreateWorkflowDTO } from "@vapi-ai/web/dist/api";

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};

// export const feedbackSchema = z.object({
//   totalScore: z.number(),
//   categoryScores: z.tuple([
//     z.object({
//       name: z.literal("Communication Skills"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Technical Knowledge"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Problem Solving"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Cultural Fit"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//     z.object({
//       name: z.literal("Confidence and Clarity"),
//       score: z.number(),
//       comment: z.string(),
//     }),
//   ]),
//   strengths: z.array(z.string()),
//   areasForImprovement: z.array(z.string()),
//   finalAssessment: z.string(),
// });

export const generator = {
  "name": "career-coach",
  "nodes": [
    {
      "name": "start",
      "type": "conversation",
      "isStart": true,
      "metadata": {
        "position": {
          "x": -441.6216049132745,
          "y": -118.36743880955402
        }
      },
      "prompt": "Speak first.Greet the user and help them create a new AI Interview.",
      "voice": {
        "model": "aura-2",
        "voiceId": "thalia",
        "provider": "deepgram"
      },
      "variableExtractionPlan": {
        "output": [
          {
            "title": "role",
            "description": "What role would you like to train for? \n",
            "type": "string",
            "enum": []
          },
          {
            "title": "type",
            "description": "Are you aiming for a technical , behavioral, or mixed interview?",
            "type": "string",
            "enum": []
          },
          {
            "title": "level",
            "description": "The job experience level",
            "type": "string",
            "enum": []
          },
          {
            "title": "techstack",
            "description": "A list of technologies to cover during the interviews",
            "type": "string",
            "enum": []
          },
          {
            "title": "amount",
            "description": "How many questions would you like to me to prepare for you?",
            "type": "string",
            "enum": []
          }
        ]
      },
      "messagePlan": {
        "firstMessage": "Hey there!"
      }
    },
    {
      "name": "conversation_1",
      "type": "conversation",
      "metadata": {
        "position": {
          "x": -147.644237124265,
          "y": 149.400239171694
        }
      },
      "prompt": "Say that the interview will be generated shortly.\n",
      "voice": {
        "model": "aura-2",
        "voiceId": "thalia",
        "provider": "deepgram"
      },
      "variableExtractionPlan": {
        "output": []
      }
    },
    {
      "name": "conversation_1747512046488",
      "type": "conversation",
      "metadata": {
        "position": {
          "x": -106.07384851528953,
          "y": 784.8684190400928
        }
      },
      "prompt": "Thank the user for the conversation and inform them that the interview has been generated successfully .",
      "voice": {
        "model": "aura-2",
        "voiceId": "thalia",
        "provider": "deepgram"
      }
    },
    {
      "name": "hangup_1747512399374",
      "type": "hangup",
      "metadata": {
        "position": {
          "x": -12.02562130118125,
          "y": 1071.573690012117
        }
      },
      "messagePlan": {
        "firstMessage": "Alright, have a nice day!"
      }
    },
    {
      "name": "node_1747930116685",
      "type": "apiRequest",
      "metadata": {
        "position": {
          "x": -135.9458549558248,
          "y": 367.2266943160184
        }
      },
      "method": "POST",
      "url": `${process.env.NEXT_PUBLIC_BASE_URL}/api/vapi/generate`,
      "headers": {
        "type": "object",
        "properties": {}
      },
      "body": {
        "type": "object",
        "properties": {
          "role": {
            "type": "string",
            "description": "",
            "value": "{{role}}"
          },
          "type": {
            "type": "string",
            "description": "",
            "value": "{{type}}"
          },
          "level": {
            "type": "string",
            "description": "",
            "value": "{{level}}"
          },
          "amount": {
            "type": "string",
            "description": "",
            "value": "{{amount}}"
          },
          "userid": {
            "type": "string",
            "description": "", 
            "value": "{{userid}}"
          },
          "techstack": {
            "type": "string",
            "description": "",
            "value": "{{techstack}}"
          }
        }
      },
      "output": {
        "type": "object",
        "properties": {}
      },
      "mode": "blocking",
      "hooks": []
    }
  ],
  "edges": [
    {
      "from": "start",
      "to": "conversation_1",
      "condition": {
        "type": "ai",
        "prompt": "if user provides all the required variables\n"
      }
    },
    {
      "from": "conversation_1747512046488",
      "to": "hangup_1747512399374",
      "condition": {
        "type": "ai",
        "prompt": ""
      }
    },
    {
      "from": "conversation_1",
      "to": "node_1747930116685",
      "condition": {
        "type": "ai",
        "prompt": ""
      }
    },
    {
      "from": "node_1747930116685",
      "to": "conversation_1747512046488",
      "condition": {
        "type": "ai",
        "prompt": ""
      }
    }

  
  ]
}

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];

export const dummyInterviews: Interview[] = [
  {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    level: "Junior",
    questions: ["What is React?"],
    finalized: false,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
];