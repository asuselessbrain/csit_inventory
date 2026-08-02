import { SemesterType } from "../generated/prisma/enums";

export const courses = [
  // Level-1 Semester-I (FIRST)
  { courseCode: "PHY111", courseName: "Physics-I", credits: 3.00, semester: SemesterType.FIRST },
  { courseCode: "PHY112", courseName: "Physics-I Sessional", credits: 0.75, semester: SemesterType.FIRST },
  { courseCode: "CHE111", courseName: "Chemistry", credits: 3.00, semester: SemesterType.FIRST },
  { courseCode: "CHE112", courseName: "Chemistry Sessional", credits: 0.75, semester: SemesterType.FIRST },
  { courseCode: "MAT111", courseName: "Mathematics-I", credits: 3.00, semester: SemesterType.FIRST },
  { courseCode: "EEE111", courseName: "Basic Electrical Engineering", credits: 3.00, semester: SemesterType.FIRST },
  { courseCode: "EEE112", courseName: "Basic Electrical Engineering Sessional", credits: 1.50, semester: SemesterType.FIRST },
  { courseCode: "CIT111", courseName: "Programming Language", credits: 3.00, semester: SemesterType.FIRST },
  { courseCode: "CIT112", courseName: "Programming Language Sessional", credits: 1.50, semester: SemesterType.FIRST },
  { courseCode: "CCE112", courseName: "Engineering Drawing", credits: 0.75, semester: SemesterType.FIRST },

  // Level-1 Semester-II (SECOND)
  { courseCode: "PHY121", courseName: "Physics-II", credits: 3.00, semester: SemesterType.SECOND },
  { courseCode: "PHY122", courseName: "Physics-II Sessional", credits: 0.75, semester: SemesterType.SECOND },
  { courseCode: "MAT121", courseName: "Mathematics-II", credits: 3.00, semester: SemesterType.SECOND },
  { courseCode: "CIT121", courseName: "Discrete Mathematics", credits: 3.00, semester: SemesterType.SECOND },
  { courseCode: "LCM121", courseName: "Communicative English", credits: 2.00, semester: SemesterType.SECOND },
  { courseCode: "EEE121", courseName: "Electronic Device and Circuits", credits: 3.00, semester: SemesterType.SECOND },
  { courseCode: "EEE122", courseName: "Electronic Device and Circuits Sessional", credits: 1.50, semester: SemesterType.SECOND },
  { courseCode: "CCE121", courseName: "Object Oriented Programming", credits: 3.00, semester: SemesterType.SECOND },
  { courseCode: "CCE122", courseName: "Object Oriented Programming Sessional", credits: 1.50, semester: SemesterType.SECOND },
  { courseCode: "CCE124", courseName: "Computer Programming Contest-I", credits: 0.00, semester: SemesterType.SECOND },

  // Level-2 Semester-I (THIRD)
  { courseCode: "CIT211", courseName: "Data Structure and Algorithms", credits: 3.00, semester: SemesterType.THIRD },
  { courseCode: "CIT212", courseName: "Data Structure and Algorithms Sessional", credits: 1.50, semester: SemesterType.THIRD },
  { courseCode: "CIT213", courseName: "Software Engineering", credits: 3.00, semester: SemesterType.THIRD },
  { courseCode: "CCE211", courseName: "Data Communication and Engineering", credits: 3.00, semester: SemesterType.THIRD },
  { courseCode: "MAT211", courseName: "Mathematics-III", credits: 3.00, semester: SemesterType.THIRD },
  { courseCode: "EEE211", courseName: "Electrical Technology", credits: 3.00, semester: SemesterType.THIRD },
  { courseCode: "EEE212", courseName: "Electrical Technology Sessional", credits: 1.50, semester: SemesterType.THIRD },
  { courseCode: "AIS211", courseName: "Accounting and Management", credits: 3.00, semester: SemesterType.THIRD },

  // Level-2 Semester-II (FOURTH)
  { courseCode: "CCE221", courseName: "Digital Logic Design", credits: 3.00, semester: SemesterType.FOURTH },
  { courseCode: "CCE222", courseName: "Digital Logic Design Sessional", credits: 1.50, semester: SemesterType.FOURTH },
  { courseCode: "CCE223", courseName: "Database System", credits: 3.00, semester: SemesterType.FOURTH },
  { courseCode: "CCE224", courseName: "Database System Sessional", credits: 1.50, semester: SemesterType.FOURTH },
  { courseCode: "AES221", courseName: "Government and Economics", credits: 3.00, semester: SemesterType.FOURTH },
  { courseCode: "MAT221", courseName: "Mathematics-IV", credits: 3.00, semester: SemesterType.FOURTH },
  { courseCode: "CIT220", courseName: "Web Programming Project", credits: 1.50, semester: SemesterType.FOURTH },
  { courseCode: "CIT221", courseName: "Information System Analysis and Design", credits: 3.00, semester: SemesterType.FOURTH },
  { courseCode: "CIT222", courseName: "Information System Analysis and Design Sessional", credits: 1.50, semester: SemesterType.FOURTH },
  { courseCode: "CIT224", courseName: "Computer Programming Contest-II", credits: 0.00, semester: SemesterType.FOURTH },

  // Level-3 Semester-I (FIFTH)
  { courseCode: "CIT311", courseName: "Microprocessors and Assembly Language", credits: 3.00, semester: SemesterType.FIFTH },
  { courseCode: "CIT312", courseName: "Microprocessors and Assembly Language Sessional", credits: 1.50, semester: SemesterType.FIFTH },
  { courseCode: "CIT313", courseName: "Computer Organization and Architecture", credits: 3.00, semester: SemesterType.FIFTH },
  { courseCode: "CIT315", courseName: "Artificial Intelligence", credits: 3.00, semester: SemesterType.FIFTH },
  { courseCode: "CIT316", courseName: "Artificial Intelligence Sessional", credits: 1.50, semester: SemesterType.FIFTH },
  { courseCode: "CCE310", courseName: "Software Development Project-I", credits: 1.50, semester: SemesterType.FIFTH },
  { courseCode: "CCE311", courseName: "Numerical Methods", credits: 3.00, semester: SemesterType.FIFTH },
  { courseCode: "CCE312", courseName: "Numerical Methods Sessional", credits: 0.75, semester: SemesterType.FIFTH },
  { courseCode: "CCE313", courseName: "Computer Networks", credits: 3.00, semester: SemesterType.FIFTH },
  { courseCode: "CCE314", courseName: "Computer Networks Sessional", credits: 1.50, semester: SemesterType.FIFTH },

  // Level-3 Semester-II (SIXTH)
  { courseCode: "CIT320", courseName: "Software Development Project-II", credits: 1.50, semester: SemesterType.SIXTH },
  { courseCode: "CIT321", courseName: "Operating System", credits: 3.00, semester: SemesterType.SIXTH },
  { courseCode: "CIT322", courseName: "Operating System Sessional", credits: 1.50, semester: SemesterType.SIXTH },
  { courseCode: "CIT323", courseName: "Simulation and Modeling", credits: 3.00, semester: SemesterType.SIXTH },
  { courseCode: "CIT324", courseName: "Simulation and Modeling Sessional", credits: 1.50, semester: SemesterType.SIXTH },
  { courseCode: "EEE321", courseName: "Digital Electronics and Pulse Techniques", credits: 3.00, semester: SemesterType.SIXTH },
  { courseCode: "EEE322", courseName: "Digital Electronics and Pulse Techniques Sessional", credits: 0.75, semester: SemesterType.SIXTH },
  { courseCode: "CCE320", courseName: "Computer Programming Contest-III", credits: 0.00, semester: SemesterType.SIXTH },
  { courseCode: "CCE321", courseName: "Computer Peripheral and Interfacing", credits: 3.00, semester: SemesterType.SIXTH },
  { courseCode: "CCE322", courseName: "Computer Peripheral and Interfacing Sessional", credits: 1.50, semester: SemesterType.SIXTH },
  { courseCode: "CCE323", courseName: "Optical Fiber Communication", credits: 3.00, semester: SemesterType.SIXTH },

  // Level-4 Semester-I (SEVENTH)
  { courseCode: "CSE410", courseName: "Project/Thesis", credits: 3.00, semester: SemesterType.SEVENTH },
  { courseCode: "CSE412", courseName: "Industrial Training", credits: 1.00, semester: SemesterType.SEVENTH },
  { courseCode: "CCE411", courseName: "Algorithm Engineering", credits: 3.00, semester: SemesterType.SEVENTH },
  { courseCode: "CCE413", courseName: "VLSI Design", credits: 3.00, semester: SemesterType.SEVENTH },
  { courseCode: "CCE415", courseName: "Network Routing and Switching", credits: 3.00, semester: SemesterType.SEVENTH },
  { courseCode: "CCE416", courseName: "Network Routing and Switching Sessional", credits: 1.50, semester: SemesterType.SEVENTH },
  { courseCode: "CCE417", courseName: "Data Warehousing and Mining", credits: 3.00, semester: SemesterType.SEVENTH },
  { courseCode: "CIT411", courseName: "Compiler Design and Automata Theory", credits: 3.00, semester: SemesterType.SEVENTH },
  { courseCode: "CIT412", courseName: "Compiler Design and Automata Theory Sessional", credits: 1.50, semester: SemesterType.SEVENTH },

  // Level-4 Semester-II (EIGHTH)
  { courseCode: "CSE420", courseName: "Project/Thesis", credits: 3.00, semester: SemesterType.EIGHTH },
  { courseCode: "CSE421", courseName: "Seminar", credits: 0.75, semester: SemesterType.EIGHTH },
  { courseCode: "CCE421", courseName: "Cryptography and Network Security", credits: 3.00, semester: SemesterType.EIGHTH },
  { courseCode: "CCE423", courseName: "Wireless and Cellular Communication", credits: 3.00, semester: SemesterType.EIGHTH },
  { courseCode: "CIT421", courseName: "Computer Graphics and Image Processing", credits: 3.00, semester: SemesterType.EIGHTH },
  { courseCode: "CIT422", courseName: "Computer Graphics and Image Processing Sessional", credits: 0.75, semester: SemesterType.EIGHTH },
  { courseCode: "CIT423", courseName: "Machine Learning", credits: 3.00, semester: SemesterType.EIGHTH }, 
];
