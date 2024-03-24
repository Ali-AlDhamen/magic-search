import { Index } from "@upstash/vector";
import * as dotenv from "dotenv";
import { vectorize } from "../lib/vectorize";

dotenv.config();

const index = new Index();

async function main() {
  const courses = [
    {
      courseCode: "cis211",
      courseName: "Fundamentals of Information Systems",
      courseDescription:
        "This course aims to introduce students to the basic concepts and topics related to Information Systems (IS). It covers topics such as systems concepts; system components and relationships; cost/value and quality of information; competitive advantages of information; specification, design, and re-engineering of IS; application versus system software; package software solutions; procedural versus non-procedural programming languages; object-oriented design; database features, functions, and architecture; networks and telecommunication systems and applications; characteristics of IS professionals and IS career path; information security, crime, and ethics, IS security principles(Confidentiality, Integrity, Availability), IS security Issues -How to protect IS from Hackers, Attackers and Viruses.",
    },
    {
      courseCode: "math211",
      courseName: "Calculus",
      courseDescription:
        "This course covers topics such as: The limit. Continuity, the intermediate value theorem. Definition of derivatives. Rules for differentiation. Applications of the derivative. The mean value theorem. L'hospital rule. The definition of the integral. The definite and indefinite integral. Applications of the integral. Sequences. Convergence and limits of sequences. Series. Convergence of series. Power series. The formal power series of rational functions.",
    },
    {
      courseCode: "cs221",
      courseName: "Fundamentals of Programming",
      courseDescription:
        "This is an entry level programming course designed to teach students the basics of program design, coding and testing. The course begins by covering the basics of a high-level programming language that include declaration of scalar variables and constants of basic data types. This is followed by a discussion on including various control structures into user programs. These include sequence, selection, and repetition control structures. Later, the course covers designing and implementing programs that rely on user-defined functions with a focus on passing arguments to these functions. Towards the end, the course introduces the concept of arrays and pointers. The course concludes by providing an overview and comparison of the Object Oriented Programming (OOP) model with the procedural approach.",
    },
    {
      courseCode: "cs222",
      courseName: "Electronics",
      courseDescription:
        "This course provides foundation in the area of electronic circuits and devices. It incorporates a combination of mathematics and basic sciences appropriate to the electrical/electronic circuit design and analysis. The main objective of this course is to inculcate in students the ability to understand fundamental and derived electrical quantities and to analyze the DC and AC circuits. In addition, the students will be introduced to the basic electronic devices such as diodes, transistors, and optical devices that may be used to design large scale electronic systems. These objectives are achieved by teaching them the relevant theory and labs to analyze, describe and solve problems involving electrical/electronic devices with the help of practical circuit implementation.",
    },
    {
      courseCode: "BIOL 222",
      courseName: "Biology",
      courseDescription:
        "Introduction to biology, structure, function and division of plant and animal cell. Classification of living beings into kingdoms. Study of biological activities (nutrition, digestion, respiration, reproduction and secretion).",
    },
    {
      courseCode: "STAT 207",
      courseName: "Introduction to Statistics & Probability Theory",
      courseDescription:
        "This course provides an elementary introduction to probability and statistics with applications. Topics include: Introduction to probability; Conditional probability and statistical independence; Bayes theorem; Mathematical expectation; Variance; Regression analysis; Inference of Regression; Multiple Regression; Some important discrete and continuous statistical distributions; hypothesis testing; confidence intervals.",
    },
    {
      courseCode: "CS 311",
      courseName: "Object Oriented Programming",
      courseDescription:
        "The purpose of this course is to provide students with fundamental knowledge of object-oriented programming (OOP). It emphasizes good software engineering principles and developing programming skills. Specific topics covered include: fundamental concepts of object-oriented programming (classes, methods, instantiation, communication by message, encapsulation, inheritance, overriding, dynamic dispatch, polymorphism, etc.) and some interesting packages (I/O, strings, etc.).",
    },
    {
      courseCode: "CS 310",
      courseName: "Data Structure",
      courseDescription:
        "The aim of this course is to provide the fundamentals of data structures, and algorithm design from an object-oriented perspective which allows one to store collections of data efficiently with fast updates and queries. The course is mainly focused on array and linked list data structures, and their implementation of fundamental abstract data types like stacks, queues, trees, and graphs.",
    },
    {
      courseCode: "CIS 313",
      courseName: "Technical Reports",
      courseDescription:
        "This course is designed to help students develop an effective method of planning and completing writing tasks so that student can meet professional writing demands. Since succeeding in the professional world requires not only technical knowledge but also effective writing skills, this course focuses on the writing skills necessary for advanced academic and professional writing, tailored specifically to student academic career work as professional in a technical field.",
    },
    {
      courseCode: "CS 314",
      courseName: "Digital Hardware",
      courseDescription:
        "Digital Systems: digital computer and digital systems, binary, decimal, octal and hexadecimal number systems, number base conversion, complements, signed and unsigned numbers, binary codes, binary storages and registers, and binary logic.",
    },
    {
      courseCode: "CIS 315",
      courseName: "Communications & Network Fundamentals",
      courseDescription:
        "The aim of this course is to provide the fundamentals of data communication and networking. It covers fundamental topics related to network layered architectures including: connectivity, topology, circuit and packet switching, TCP/IP and ISO models. For Physical layer, it introduces the essential elements of transmission media including: analogue and digital signals, time and frequency domains concepts, and types of channels. For Data Link layer, it covers framing, switching and forwarding techniques, and error detection and correction techniques. For Network layer, it covers network service models, forwarding and routing, and the structure of IP addresses. The course introduces the fundamental services offered by the transport and application layers including the principles of TCP transport, UDP, and network application architectures. Students will be trained on the existing components related to Cisco such as hubs, switches, and routers. In addition, Packet Tracer and Wireshark software for analyzing networking techniques and protocols.",
    },
    {
      courseCode: "MATH 301",
      courseName: "Discrete Mathematics",
      courseDescription:
        "The purpose of this course is to introduce the essential mathematical concepts and ideas in discrete mathematics, which are required for rigorous studies in most areas of computer science including Logic and Proof Techniques, Analysis of Algorithm, Digital Circuit, Network, Software Engineering, and Artificial Intelligence. Topics include: Propositional logic, logical equivalence, Quantifiers; Set theory, Mathematical induction; vector and matrices; Relations, Equivalence Relations, Partial Ordering Relations; Functions, Sequences, Indexed Classes of Sets, Recurrence Relations, Recursively defined functions, algorithms and complexity of algorithm; Properties of integers; Basic counting techniques, Binomial coefficients and Pascal triangle, Pigeonhole Principle; Graph theory, Tree graphs, Directed graphs; Boolean Algebra.",
    },
    {
      courseCode: "CS 321",
      courseName: "Object Oriented Programming (2)",
      courseDescription:
        "The main purpose of this course is to develop the understanding of advanced OOP topics using a high-level object-oriented programming language. The focus of the course is on the design and implementation of event-driven applications. Main topics include: exception handling, multithreading, applets, event-driven programming, database connectivity, application programming interfaces (APIs) and the object oriented graphical user interfaces using SWING.",
    },
    {
      courseCode: "CS 322",
      courseName: "Operating Systems",
      courseDescription:
        "In this course the student will study the basic concepts of operating systems (OS), the following concepts will be studied in this course: OS Overview (objectives, functions, evolution of OS, characteristics of modern OS), process description and control (process definition, process states, process description and process control), threads (definition, why use thread, relationship between processes and threads), microkernel (benefits of microkernel organization, microkernel design), uni-processor scheduling (types of scheduling, short term scheduling criteria, scheduling algorithms), memory management (memory management requirements, loading programs into main memory -fixed partitioning, dynamic partitioning, simple paging, simple segmentation -), virtual memory (paging, segmentation, combined paging and segmentation), operating system software (fetch policy, placement policy, replacement policy, resident set management, cleaning policy, load control), I/O management and disk scheduling (I/O devices, organization of I/O function, I/O buffering, disk I/O), and file management (file management system, file organization and access, file directories, secondary storage management).",
    },
    {
      courseCode: "CS 321",
      courseName: "Database Concepts and Design",
      courseDescription:
        "This course aims to discuss the basic concepts and design of database. It covers topics such as: data model, levels of abstraction, data independence, and concurrency control. It focuses on how to design databases for given problems, and how to use database effectively, these including ER model, key and participation constraints, weak entities, class hierarchies, aggregation and conceptual DB design using the ER model. Relational model: creating and modifying relation using query language, enforcing integrity constraints, ER to relational and view. Schema refinement and normal forms: functional dependencies, reasoning about functional dependencies, normal forms, decompositions and normalization. Relational Queries: relation algebra and calculus and commercial query languages. Object database systems: user defined abstract data type, structured types, objects; object identity; and reference type, inheritance, and database design for an ORDBMS. Students will be trained on some software tools such as: Oracle, Sybase, DB2, and Informix.",
    },
    {
      courseCode: "CIS 411",
      courseName: "Database Management Systems",
      courseDescription:
        "This course emphasizes on the principal concepts of Database Management Systems (DBMS). The DBMS concepts include: Storing data: disks and files which include the memory hierarchy, RAID, disk space management, buffer management, file and indexes, page formats and record formats; file organization and indexes which introduce cost modeling, comparison of three file organizations, overview of indexes and properties of indexes. Three -structured indexing, hash based indexing and database design security; transaction management which introduce to transactions and schedules, concurrent execution of transaction, lock -based concurrency control and crash recovery. Crash recovery includes introduction to ARIES, recovery from a system crash and media recovery. The course also covers advanced topics such as: Parallel and distributed database including architectures for parallel databases, parallel query evaluation and optimization, distributed DBMS architectures, storing data in distributed DBMS, distributed catalog management and query processing, updating distributed data, distributed transactions and concurrency and recovery. As part of this course, students will be trained on some latest database management software.",
    },
    {
      courseCode: "CIS 412",
      courseName: "System Analysis and Design (1)",
      courseDescription:
        "This course emphasizes on the analysis of the structured system and designing techniques for software project development. It includes: setting IS project goals, developing work plans and methods to achieve those goals, and measuring progress against a project plan. The course material includes describing the major alternative methodologies used in developing information systems and the considerations involved in choosing which methodology to use. Production of the requisite systems documentation at each point in the analysis and designing an information system, and doing so with clarity and completeness. Analyzing business need for information and developing an appropriate strategy to solve the problem and providing the required information service. Preparing and using various information-gathering techniques for eliciting user information requirements and system expectations. Construction and interpretation a variety of system description documents. Students will be trained on some latest software tools.",
    },
    {
      courseCode: "CIS 413",
      courseName: "Professional Responsibility",
      courseDescription:
        "This course introduces the students to the legal, social, and ethical issues of information technology and use; information rights, property rights, liability, accountability, privacy, security, crime, ethical principles, codes of ethics, 'the digital divide', role of PTTs, role of government, role of law enforcement, role of business and industry; professional conduct, social responsibility, and rigorous standards for software testing and reliability, students read, write, discuss, and present reports on these topics, fraud and abuse, electronic communication privacy, mail fraud, credit card abuse, privacy protection, copyright and patent statute, communication decency, law and computer, software engineering code of ethic, name dispute resolution policy.",
    },
    {
      courseCode: "CIS 414",
      courseName: "IT Project Management",
      courseDescription:
        "This course is designed to prepare students to manage IT project. It is built around the ten knowledge areas that are needed by IT project managers such as: Time Management, Scheduling, and Human Resources. The course also explores the project life-cycle, including initiating, planning, controlling, executing, and closing projects. The course also shows how IT projects should be managed, from kickoff meetings to post implementation reviews. Students are expected to broaden their views with regards to management skills and abilities to define the project scope, and create a workable project plan, and manage within the budget and schedule. A main component of the course is delivered through applying what is learned in class in real-life IT Project which will be documented using IEEE Software Project Management Plan (SPMP).",
    },
    {
      courseCode: "MGMT 415",
      courseName: "Business Essentials",
      courseDescription:
        "Contents cover managing human resources and labor relations, staffing, developing workforce, compensation and benefits, legal issues in managing people, dealing with labors, law governing labor-management relations, principles of marketing, target marketing and segmentation, consumer behavior, organization marketing, international marketing mix, developing new products and managing product life cycle, identifying products, pricing, distribution, and promotion, principle of operation and production, goods and services operation, creating value through production, operation planning and scheduling, operation control, quality improvement, information system and electronic commerce, databases and application programs, information and communication technology, principle of accounting, tools of accounting trade, financial statements, financial issues, money and banking, international banking and finance, securities and investment, security markets, stocks and bonds, buying and selling security, financial and risk management, and, legal context of business.",
    },
    {
      courseCode: "CIS 425",
      courseName: "Computer Data Security & Privacy",
      courseDescription:
        "This course presents relevant aspects of computer security and privacy. It includes topics such as Security fundamentals: concepts and principles, vulnerability, threat models, attacks to computer systems, database and networks, cryptography, authentication, digital signatures, key management and cryptography protocols, building secure systems, security in operating systems, network security, architecture and standards, authentication, access control, confidentiality, integrity, network management, internet security, firewalls, DNS and routers, computer security policy and procedures, and ISO security standards.",
    },
    {
      courseCode: "CIS 421",
      courseName: "System Analysis and Design (2)",
      courseDescription:
        "This course includes designing simple requirements models, measurability of non-functional requirements, selecting best alternative design strategies, designing human interfaces, conventional design approaches, object-oriented analysis and design, structure diagrams, behavior diagrams, design patterns, deliverables and outcomes of the coding and testing process, installation strategies, providing support for end users, and factors influencing the cost of maintaining an information system.",
    },
    {
      courseCode: "CIS 422",
      courseName: "Human Computer Interaction",
      courseDescription:
        "The Course gives an overview and the introduction of the basic principles of human and computer interaction. It covers guidelines and theories for designing and modeling rich interaction, interface success stories and failures, use of HCI in design, design rules, social, contextual and communication models, topics like multimedia, global information systems, the Web, analytical and empirical usability evaluation methods, and application of gained knowledge and HCI techniques through a self-defined project.",
    },
    {
      courseCode: "CIS 423",
      courseName: "Web Based Systems",
      courseDescription:
        "Overview of web-based application, setup and configuration of web server, setup and configuration of Eclipse and MySQL, Introduction to HTML, JDBC, Java Server Pages, XML, JavaScript, Web Security, credit card Transactions, Web Performance, Internationalization, localization, Java Servlet, Parameter externalization.",
    },
    {
      courseCode: "CIS 444",
      courseName: "Global E-Business",
      courseDescription: "Global E-Business",
    },
    {
      courseCode: "CIS 511",
      courseName: "Project Proposal",
      courseDescription:
        "In this course, students choose a project subject and define the objectives of the project under the supervision of a faculty member, and prepare the project proposal including: defining the statement of the problem, defining system requirements, defining different candidate solutions for the problem of study, making feasibility study for different candidate solutions, defining the best candidate solution, defining time table schedule. Students should present the project interim report at the end of the semester, grading will be obtained by oral examination to be held by a committee from faculty members.",
    },
    {
      courseCode: "CIS 512",
      courseName: "Software Quality Assurance",
      courseDescription:
        "Contents cover definition of software quality, difference between quality assurance and quality control, role of management in fostering quality culture, software quality standards such as ISO 9001, Capability Maturity Model Integrated (CMMI), development of Software Quality Assurance Plan, implementation of quality metrics, artifacts design for quality management, audits and reviews, software testing, white box and black box testing techniques, testing levels (unit testing, integration testing, regression testing, system testing), designing test cases and test plan, executing test cases and preparing test report. In addition students will be trained on related software tools.",
    },
    {
      courseCode: "CIS 513",
      courseName: "Electronic Business Strategy",
      courseDescription:
        "The course examines linkages of organizational strategy and electronic methods of delivering products and exchanges in inter-organizational, national, and global environments. To explain these linkages, it uses case studies from several online industries. Topics include strategy, e-business and e-commerce, sustainable profitability in e-commerce, business sense of e-opportunity, formulating a dot-com strategy, e-business models, web, steps to e-business leadership, competitive advantages, implementation, running virtual organizations, online monetary transactions, internet hardware and software, wireless internet, internet security, internet marketing, affiliate programs, e-customer relationship management, legal and ethical issues, internet taxation, privacy on the internet, regulating the internet on an international level, creating an e-business with global capabilities, online communities, online charities and nonprofit organizations on the web, web accessibility. The course also introduces the concept of Business Process Reengineering (BPR) and tasks about how it can be implemented.",
    },
    {
      courseCode: "CIS 521",
      courseName: "Project Implementation",
      courseDescription:
        "Project implementation course offers students an opportunity to assemble their knowledge acquired throughout their BS curriculum to realize a final project. This would require them to gather information about the proposed subject and realize a final report as well as to develop a system practically. At this stage, students must carry on all phases of system development for the subject already defined in the precedent course (Project proposal), and under the supervision of the same supervisor (as possible). At the end of the semester, students are asked to make an oral presentation with the presence of faculty members as referees.",
    },
    {
      courseCode: "CIS 517",
      courseName: "Data Mining and Warehousing",
      courseDescription:
        "This course emphasizes on the principal concepts of Data Mining and Data Warehousing techniques. Data Mining concepts include: Data Mining cycles, Data Mining methodology, major issues in Data Mining, data preprocessing stages (data cleaning, data integration, data reduction, data transformation and data discretization), data visualization, and measurement of the effectiveness of data mining. The course goes further into data warehousing and analytical processing techniques including: data warehouse modeling (data cubes and OLAP), mining frequent patterns, associations, correlations, classifications (such as decision trees, neural networks, Bayes classification, rule-based classification) and cluster analysis methods (such as partitioning, hierarchical, density-based, and grid-based approaches). As part of this course, students will be trained on latest data mining software.",
    },
    {
      courseCode: "CIS 525",
      courseName: "Knowledge Management and Information Retrieval",
      courseDescription:
        "This course begins with a brief introduction to Knowledge Management (KM) and its significance in the 21st century. The Knowledge Management concepts covered in this course include: Knowledge Management Cycle, Knowledge Management Models, Knowledge Capture and Codification, and Knowledge Application and Knowledge Management Tools. The second part of this course covers latest development of Information Retrieval (IR), Information Retrieval Modeling, Retrieval Evaluation, Query Languages, Query Operations, Text Operations and Indexing and Searching. As part of this course, students will be trained on some latest software.",
    },
    {
      courseCode: "CIS 516",
      courseName: "Decision Support & Expert systems",
      courseDescription:
        "The purpose of this course is to provide students with an understanding of the key technical and managerial issues in the effective development and use of decision support systems in organizations. The course focuses on integrating developments in the literature on decision processes, modeling technologies, and information technologies and discuss their application in the organizational context. The decision processes component will cover process models, bounded rationality and its replication for satisfying, optimizing behavior, and discuss heuristics commonly used by humans. The modeling technologies component will discuss decision analysis techniques such as multi-criteria decision making and predictive modeling techniques such as neural networks. The information technologies component will give students the opportunity to work with specialized desktop decision support tools such DPL and Expert Choice (an analytic hierarchy process-based DSS engine), Scikit-learn (an open-source machine learning library), and OpenNN (an open-source class library which implements neural networks).",
    },
    {
      courseCode: "cs221",
      courseName: "Artificial Intelligence: Principles and Techniques",
      courseDescription:
        "Introduction to the principal areas, techniques, and results of artificial intelligence. Topics include search, games, knowledge representation, inference, planning, reasoning under uncertainty, machine learning, robotics, perception, and language understanding.",
    },
    {
      courseCode: "cs229",
      courseName: "Machine Learning",
      courseDescription:
        "Introduction to machine learning. Topics include supervised learning, unsupervised learning, learning theory, reinforcement learning. Applications to areas such as robotics, information retrieval, text understanding, text mining, bioinformatics, and other areas.",
    },
    {
      courseCode: "cs230",
      courseName: "Deep Learning",
      courseDescription:
        "Introduction to deep learning. Topics include feedforward and convolutional networks, reinforcement learning, recurrent networks, and unsupervised learning. Applications to machine translation, image analysis, and other areas.",
    },
  ];

  for (const course of courses) {
    const vector = await vectorize(
        `${course.courseCode} ${course.courseName} ${course.courseDescription}`
    );
    await index.upsert({
      id: course.courseCode,
      vector,
      metadata: {
        courseCode: course.courseCode,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
      }
    });
  }

  console.log("Done");
}

main();
