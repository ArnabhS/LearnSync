// questions.js

const questions = [
    {
      id: 1,
      question: "When interacting with others, how easily do you understand their feelings and emotions?",
      options: [
        "A) Very easily; I can often sense what others are feeling.",
        "B) Somewhat easily; I usually get a sense but may not always be accurate.",
        "C) Rarely; I often struggle to understand how others feel.",
        "D) Not at all; I find it very difficult to read people’s emotions."
      ]
    },
    {
      id: 2,
      question: "Do you prefer to plan your activities in advance rather than being spontaneous?",
      options: [
        "A) Always; I like to have everything organized.",
        "B) Usually; I prefer some structure but can be flexible.",
        "C) Sometimes; it depends on my mood.",
        "D) Never; I thrive on spontaneity and last-minute decisions."
      ]
    },
    {
      id: 3,
      question: "In social situations with many people, do you often feel overwhelmed?",
      options: [
        "A) Yes, I often feel anxious in large groups.",
        "B) Sometimes, it depends on the environment and my mood.",
        "C) Rarely; I usually enjoy being around people.",
        "D) No, I feel energized by social interactions."
      ]
    },
    {
      id: 4,
      question: "How important is it for you to help others and be of service?",
      options: [
        "A) Very important; I find great fulfillment in helping others.",
        "B) Somewhat important; I like to help when I can.",
        "C) Not very important; I focus more on my own needs.",
        "D) Not at all important; I prioritize my own interests."
      ]
    },
    {
      id: 5,
      question: "Do you spend time reflecting on your emotions to understand their origins?",
      options: [
        "A) Yes, I often analyze my feelings deeply.",
        "B) Sometimes, but not regularly.",
        "C) Rarely; I try to avoid thinking about my emotions.",
        "D) No, I don’t reflect on my feelings at all."
      ]
    },
    {
      id: 6,
      question: "Do you find it challenging to express your feelings to others?",
      options: [
        "A) Yes, it’s very difficult for me to open up.",
        "B) Sometimes, depending on the person I'm talking to.",
        "C) Rarely; I'm usually comfortable sharing my feelings.",
        "D) No, I express my feelings openly and easily."
      ]
    },
    {
      id: 7,
      question: "Are you someone who actively seeks out new experiences or adventures?",
      options: [
        "A) Always; I love trying new things!",
        "B) Often; I enjoy new experiences when they arise.",
        "C) Occasionally; it depends on the situation.",
        "D) Never; I prefer to stick with what I know."
      ]
    },
    {
      id: 8,
      question: "Do you feel more comfortable with facts and data than with emotions?",
      options: [
        "A) Yes, facts are much easier for me to handle than emotions.",
        "B) Sometimes; I appreciate both but lean towards facts.",
        "C) Rarely; I value emotional insights as much as facts.",
        "D) No, emotions are more important than factual information for me."
      ]
    },
    {
      id: 9,
      question: "In your relationships, do you tend to avoid conflict?",
      options: [
        "A) Yes, I dislike confrontation and will go out of my way to avoid it.",
        "B) Sometimes; I'll avoid conflict if possible but will address it if necessary.",
        "C) Rarely; I'm okay with discussing disagreements openly.",
        "D) No, I believe conflict is a natural part of relationships."
      ]
    },
    {
      id: 10,
      question: "Do you feel a strong need for approval from others?",
      options: [
        "A) Yes, it's very important for me to be liked and accepted by others.",
        "B) Somewhat; while approval matters, it’s not everything to me.",
        "C) Not really; I'm confident in myself regardless of others' opinions.",
        "D) No, I don’t seek approval from anyone."
      ]
    },
    {
      id: 11,
      question: "Are you usually calm and collected in stressful situations?",
      options: [
        "A) Always; I handle stress very well without losing my composure.",
        "B) Usually; I can stay calm most of the time but have moments of stress.",
        "C) Sometimes; stress can get the best of me occasionally.",
        "D) No, I'm often overwhelmed by stress and anxiety."
      ]
    },
    {
      id: 12,
      question: "Do you find it hard to make decisions without consulting others first?",
      options: [
        "A) Yes, I often seek advice before making choices.",
        "B) Sometimes; I'll ask for input if I'm unsure but can decide alone if needed.",
        "C) Rarely; I'm confident in making decisions independently.",
        "D) No, I prefer making decisions without anyone else's influence."
      ]
    },
    {
      id: 13,
      question: "Do you often feel anxious about the future?",
      options: [
        "A) Yes, anxiety about what’s next is a constant for me.",
        "B) Sometimes; certain situations make me anxious about the future.",
        "C) Rarely; I'm generally optimistic about what lies ahead.",
        "D) No, I'm not concerned about the future at all."
      ]
    },
    {
      id: 14,
      question: "Is valuing tradition and stability important in your life?",
      options: [
        "A) Very important; traditions provide comfort and security for me.",
        "B) Somewhat important; while traditions matter, I'm open to change.",
        "C) Not very important; I'm flexible with traditions and routines.",
        "D) Not at all important; change excites me more than tradition does."
      ]
    },
    {
      id: 15,
      question: "Do you often feel misunderstood by those around you?",
      options: [
        "A) Yes, frequently—I feel like people don’t get me at all.",
        "B) Sometimes; there are moments when I feel misunderstood.",
        "C) Rarely; most people seem to understand me well enough.",
        "D) No, I believe people generally understand me accurately."
      ]
    },
    {
      id: 16,
      question: "Is maintaining a sense of control over your environment essential for you?",
      options: [
        "A) Absolutely; control helps me feel secure in my surroundings.",
        "B) Usually; while control is nice, I'm okay with some unpredictability.",
        "C) Sometimes; I can adapt when things are out of control but prefer some order.",
        "D) No, I'm comfortable with chaos and uncertainty."
      ]
    },
    {
      id: 17,
      question: "Do you enjoy discussing deep or philosophical topics with others?",
      options: [
        "A) Yes, those conversations are my favorite!",
        "B) Sometimes; it depends on who I'm talking with and the topic itself.",
        "C) Rarely; I'd rather stick to lighter subjects in conversation.",
        "D) No, deep discussions aren’t appealing to me at all."
      ]
    },
    {
      id: 18,
      question: "Are you quick to forgive others when they make mistakes?",
      options: [
        "A) Always; holding onto grudges isn’t worth it for me.",
        "B) Usually; while forgiveness is important, it takes time sometimes.",
        "C) Sometimes; it depends on the situation and person involved.",
        "D) No, forgiving is challenging for me—I tend to hold onto past grievances."
      ]
    },
    {
      id: 19,
      question: "Do you prefer working independently rather than in a team setting?",
      options: [
        "A) Yes, working alone allows me to focus better without distractions.",
        "B) Usually; while teamwork can be good, independence is preferred most times.",
        "C) Occasionally; both independent work and teamwork have their benefits for me.",
        "D) No, collaboration energizes me—I thrive in team environments."
      ]
    },
    {
      id: 20,
      question: "Have you ever felt that your emotions are too intense for those around you to handle?",
      options: [
        "A) Yes, frequently—I worry that my feelings overwhelm others.",
        "B) Sometimes; there are moments when my emotions feel too strong for comfort.",
        "C) Rarely; most people seem able to handle my emotional expressions well enough.",
        "D) No, I'm confident that those around me can manage my feelings without issue."
      ]
    }
  ];
  
  module.exports = questions;
  