import { Presentation, Tech } from './profileDataType'
import { environment } from '../../environments/environment';

export const PRESENTATION_DATA : Presentation[] = [
  { 
    id: 1,
    text: "I'm a undergraduate student of Molecular Sciences at Universidade de São Paulo. This course is not only about chemistry, it is an interdisciplinary course that involves math and programming too. Also, this program includes total freedom of subject choice for the latter half of the student’s track, when I’ve chosen mostly Computer Science and Statistics subjects.", 
    image: environment.baseUrl + "/assets/images/usp-logo.png"
  },
  {
    id: 2,
    text: "During my undergraduate trajectory I’ve developed a scientific initiation project that consists in using vector auto-regressive model to identify spatial-temporal correlations in pre-processed data from functional magnetic resonance imaging images.",
    image: environment.baseUrl + "/assets/images/r-logo.png"
  },
  {
    id: 3,
    text: "Now my interests lie especially in programming, for example, develop cleaner and better modeled code, learn more about functional programming beyond Scala, learn to integrate code from multiple programming languages via interprocess communication and develop my first machine learning algorithms implementation. For all of these journeys, I hope that the results of my work becomes useful for users and nice to other developer’s eyes.",
    image: environment.baseUrl + "/assets/images/code.jpeg"
  }
];

export const PROG_LANGUAGES : Tech[] = [
  {
    id: 1,
    title: "C/C++",
    image: environment.baseUrl + "/assets/images/Cpp.png"
  },
  {
    id: 2,
    title: "Java",
    image: environment.baseUrl + "/assets/images/Java.png"
  },
  {
    id: 3,
    title: "Scala",
    image: environment.baseUrl + "/assets/images/Scala.png"
  },
  {
    id: 4,
    title: "Python",
    image: environment.baseUrl + "/assets/images/Python.png"
  },
  {
    id: 5,
    title: "TypeScript",
    image: environment.baseUrl + "/assets/images/typescript.png"
  },
  {
    id: 6,
    title: "Ruby",
    image: environment.baseUrl + "/assets/images/Ruby.png"
  },
  {
    id: 7,
    title: "Bash Scripting",
    image: environment.baseUrl + "/assets/images/Bash.png"
  },
  {
    id: 8,
    title: "R",
    image: environment.baseUrl + "/assets/images/r-logo.png"
  }
];

export const OTHER_LANGUAGES : Tech[] = [
  {
    id: 1,
    title: "HTML",
    image: environment.baseUrl + "/assets/images/html.png"
  },
  {
    id: 2,
    title: "CSS",
    image: environment.baseUrl + "/assets/images/CSS.png"
  },
  {
    id: 3,
    title: "SQL",
    image: environment.baseUrl + "/assets/images/SQL.png"
  },
  {
    id: 4,
    title: "Cypher",
    image: environment.baseUrl + "/assets/images/neo4j.png"
  }
];

export const FRAMEWORKS_N_OTHER_TECH : Tech[] = [
  {
    id: 1,
    title: "React",
    image: environment.baseUrl + "/assets/images/React.png"
  },
  {
    id: 2,
    title: "Angular",
    image: environment.baseUrl + "/assets/images/Angular.png"
  },
  {
    id: 3,
    title: "Ruby on Rails",
    image: environment.baseUrl + "/assets/images/Rails.png"
  },
  {
    id: 4,
    title: "Django",
    image: environment.baseUrl + "/assets/images/Django.png"
  },
  {
    id: 5,
    title: "Pandas",
    image: environment.baseUrl + "/assets/images/Pandas.png"
  },
  {
    id: 6,
    title: "Linux",
    image: environment.baseUrl + "/assets/images/ArchLinux.png"
  }
];
