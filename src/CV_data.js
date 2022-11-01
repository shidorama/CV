let CV_data;

let experience = [
    {
        company: "Severen-Houm LLC",
        location: "Saint-Petersburg, Russia",
        website: "sumtel.ru",
        position: "System Administrator / Internal Resource Developer",
        start_date: "2006 July",
        end_date: "2008 August",
        description: `
        * management of corporate network with 30 users
        * user support, software installation
        * management of servers that hosts internal network resources for more than 2500 users
        * development and deployment of local web-resources
        * setup and management of L2/L3 network equipment
        * setting up and maintaining Microsoft Active Directory domain
        * development and deployment internal services written using PHP
        * deployment of GPO and RIS`
    },
    {
        company: "VIT LLC",
        location: "Saint-Petersburg, Russia",
        website: "vitnw.ru",
        position: "Lead System Administrator",
        start_date: "2008 August",
        end_date: "2009 September",
        description: `
        * managing team of 2 system administrators
        * managing LAN with over 70 users and robust server structure
        * user support
        * setup and support of servers and general IT infrastructure
        * support and management of branches located in other towns
        * remote applications and desktop management and control
        * software policies setup and management
        * control of hardware assets
        * setup of virtual server environment (Hyper-V, VMware)
        * initial setup and management of L3 network equipment
        * AD server support
        * GPO management and deployment
        * management of software licensing policies
        * deployment of internal portals written in PHP`
    },
    {
        company: "Pi-Media LLC",
        location: "Saint-Petersburg, Russia",
        website: ["pi-media.ru", false],
        position: "System Administrator",
        start_date: "December 2010",
        end_date: "December 2011",
        description: `
        * managing network of 40 users and 8 servers
        * user support
        * redesigning of network and IT infrastructure
        * basic staff education
        * devising licensing policies
        * management of local telephony system
        * developing scripts for local tasks automatization`

    },
    {
        link_id: "7n",
        company: "Sed'maya Set’ LLC",
        location: "Saint-Petersburg, Russia",
        website: ["7net.ru", false],
        position: "Lead backend developer / Department head",
        start_date: "December 2010",
        end_date: "June 2013",
        description: `
        * development of architecture for main department projects
        * database architecture development
        * development of project core and core modules
        * definition of projects ideology
        * staff management
        * co-ordination of developers efforts
        * managing team of 10 developers
        * exercising communication between customer and developers
        * managing tasks and terms
        * managing software related expenses and reduction of TCO
        * active participation in development of projects
        
        Responsible for development of internal MVP framework, main class structure and major parts of the code`
    },
    {
        // Link to 7net
        link_to: "7n",
        company: "VITAND LLC",
        location: "Saint-Petersburg, Russia",
        position: "Head of IT",
        start_date: "June 2013",
        end_date: "September 2014",
        description: `
        * set-up and support of company IT infrastructure
        * communication and negotiation with suppliers of hardware and software
        * setup of new branches
        * organization of purchases
        * engineering protection system for company internal documents and communication
        * splitting work
        * designating tasks for subordinates
        * QC and feedback control
        * expenses management and reduction
        * building or redundant and fail-safe system
        * AD server deployment, deployment and management of GPO and RIS
        * extensive use of python for internal services and internal tools development`
    },
    {
        company: "Ready For Sky",
        location: "Saint-Petersburg, Russia",
        website: "readyforsky.com",
        position: "Lead Backend Developer / Department Head",
        start_date: "February 2015",
        end_date: "May 2016",
        description: `
        - development of network servers for IoT using Python and Twisted
        * development of adapter servers for 3rd party IoT solutions
        * development of eLua firmware for ESP8266-based devices
        * managing and participation in development of core REST server for project (PHP, Symfony)
        * managing preparation of translation of some of existing python servers to Go
        * development and documenting of protocol
        * managing team of 15 developers and QA engineers
        * development of interaction modes for IoT
        * architectural planning of mobile application
        * creation of hierarchy inside the department
        * implementation of SCRUM methodology
        * introduction of project management system (YouTrack)
        * re-design and optimization of Business processes in department
        * creation and support of project-wide documentation
        * exercising communication between customer and developers (and effectively isolating developers from direct customer control)
        * planning and implementation of developers support tools (GIT, VM Server, etc)
        * development of motivational and career development standards
        * introduction of internal code standards`
    },
    {
        link_id: "bkz-1",
        company: "Bekitzur LLC",
        location: "Saint-Petersburg, Russia",
        website: "upteam.com",
        position: "Python Developer",
        start_date: "May 2016",
        end_date: "August 2017",
        description: `
        * reduced time for writing new components and covering them with tests 2 times by writing documentation on the processes and creating tools and helpers
        * developed new system components and support of existing one using Python
        * extensively used Marketing APIs (Facebook, Doubleclick, bitly, etc)
        * data processing and manipulation for high load services using MongoDB
        * increased code coverage to at least 70% for all modules involved
        * played leading role in setting up and execution of developers knowledge sharing and mentoring processes
        * participation in documenting policy implementation`
    },
    {
        company: "Jirnexu Sdn Bhd",
        location: "Kuala-Lumpur, Malaysia",
        website: "ringgitplus.com",
        position: "Lead Backend Developer",
        start_date: "February 2017",
        end_date: "August 2017",
        description: `
        * decreased data latency for internal BI solution from 4h to 1-2s by creation of serverless ETL system for projecting DynamoDB onto SQL-like backend (Python/Hive/PrestoDB/Lambda/EMR)
        * achieved 90% code coverage by writing and extending UnitTests (both positive and negative cases) in all related projects
        * managed development team
        * implemented Agile methodolgies
        * created and maintained business-critical services in and out of cloud
        * used full specter of AWS services for creating critical data services (EMR, S3, EC, SQS, DynamoDB, Lambda, CloudWatch)
        * created extensive documentation of all the code implemented`
    },
    {
        link_to: "bkz-1",
        company: "Bekitzur LLC",
        location: "Saint-Petersburg, Russia",
        website: "upteam.com",
        position: "Senior Team Lead",
        start_date: "August 2017",
        end_date: "July 2018",
        description: `
        * Creating and implementing architecture for business critical services
        * Increased measured RPS for business critical service 2.1 times by using efficient architecture solutions
        * achieved subsecond execution time for complex business rules based on customer requirements
        * Developed efficient rule architecture
        * Facilitating team interaction with customer
        * Managing task distribution
        * Ensuring high standards of code and process by implementing and maintaining services coverage by test`
    },
    {
        company: "Amazon",
        location: "Edinburgh, Scotland, UK",
        website: "amazon.co.uk",
        position: "Senior Software Development Engineer",
        start_date: "July 2018",
        end_date: "January 2020",
        description: `
        * reduced time required for new features test coverage 3 times
        * reduced downtime and critical failures during new releases 2 times
        * design and implementation of high load cloud based system
        * complex data processing using Spark and EMR
        * driving best practices and coding standarts
        * service simplification and complex refactoring
        * working with large scale services directly affecting revenue of company
        * performing data analysis with Pandas/Numpy`
    },
    {
        link_id: "iwoca-1",
        company: "Iwoca Ltd",
        location: "London, England, UK",
        website: "iwoca.co.uk",
        position: "Team leader / Architect",
        start_date: "February 2020",
        end_date: "September 2020",
        description: `
        * Refactoring current Django-based legacy code
        * Outlining new testing approach and architecture
        * Improving testing coverage and execution time`
    },
    {
        company: "Wise Ltd (ex Transferwise)",
        location: "London, England, UK",
        remote: true,
        website: "wise.com",
        position: "Technical Lead",
        start_date: "February 2020",
        end_date: "November 2021",
        description: `
        * supporting transition to public company: increasing stability and load tolerance of the system
        * planning quarterly milestones for product development
        * rehauling processes inside team to improve efficiency of internal and external collaboration
        * developing distributed systems with SpringBoot, Kafka and Postgres`
    },
    {
        company: "Popspot",
        location: "Tallinn, Estonia",
        remote: true,
        position: "CTO",
        start_date: "November 2021",
        end_date: "November 2022",
        description: `
        `
    },
    {
        // Link to other Iwoca
        link_to: "iwoca-1",
        company: "Iwoca Ltd",
        location: "London, England, UK",
        remote: true,
        position: "Senior Backend Engineer",
        start_date: "November 2021",
        end_date: "December 2022",
        description: `
        `
    }
]

let main_data = {
    name: "Stanislav",
    surname: "Zakrevskii",
    dob: "1988-01-14",
    experience,
}

export default CV_data = main_data