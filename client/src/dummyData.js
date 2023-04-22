export const Posts = [
        {
            "_id" : "642ff58b70e1566855778b09",
            "userId" : "642d68e5533b5462d5b49682",
            "qTitle" : "Test",
            "qDesc" : "@chatgpt what is javascript",
            "answer" : "\n\nJavaScript is a programming language used to make web pages interactive. It is the language of the web and is used to create websites, web applications, and more.",
            "createdAt": "2023-04-07T10:50:51.323+0000",
            "updatedAt": "2023-04-07T10:50:51.323+0000"
        },
        {
            "_id" : "6432d67b081da7accafb35b9",
            "userId" : "642d68e5533b5462d5b49682",
            "qTitle" : "Test",
            "qDesc" : "@chatgpt What do you think about AI",
            "answer" : "?\n\nI think AI is an amazing technology that has the potential to revolutionize the way we live and work. It can help us automate mundane tasks, make better decisions, and even create new products and services.",
            "createdAt" : "2023-04-09T15:15:07.422+0000",
            "updatedAt" : "2023-04-09T15:15:07.422+0000"
        },
        {
            "_id" : "6432d6a6081da7accafb35bb",
            "userId" : "642d68e5533b5462d5b49682",
            "qTitle" : "Test",
            "qDesc" : "@chatgpt What is Data Science",
            "answer" : "?\n\nData Science is the study of data and the use of algorithms and systems to extract knowledge and insights from structured and unstructured data. It involves the application of mathematics, statistics, and computer science to analyze and interpret data.",
            "createdAt" : "2023-04-09T15:15:50.010+0000",
            "updatedAt" : "2023-04-09T15:15:50.010+0000"
        },
        {
            "_id" : "6432d6ef081da7accafb35bd",
            "userId" : "642d68e5533b5462d5b49682",
            "qTitle" : "Test",
            "qDesc" : "@chatgpt Explain me the process involved in creating AI model",
            "answer" : "\n\nCreating an AI model involves several steps:\n\n1. Define the problem: Identify the problem you want to solve and define the objectives.\n\n2. Collect data: Gather the data that is relevant to the problem.\n\n3. Pre-process data: Clean and prepare the data for analysis.\n\n4. Choose a model: Select the type of model that best fits the problem.\n\n5. Train the model: Use the data to train the model.\n\n6. Evaluate the model: Test the model to see how well it performs.\n\n7. Tune the model: Adjust the model parameters to improve its performance.\n\n8. Deploy the model: Deploy the model in a production environment.",
            "createdAt" : "2023-04-09T15:17:03.860+0000",
            "updatedAt" : "2023-04-09T15:17:03.860+0000"
        },
        {
            "_id" : "6432d745081da7accafb35bf",
            "userId" : "642b0b0e352c3ca4b54dbb02",
            "qTitle" : "Test",
            "qDesc" : "@chatgpt Explain me the concepts in Data Science",
            "answer" : "\n\nData Science is a field of study that combines mathematics, statistics, computer science, and domain knowledge to extract insights from data. It involves the use of algorithms, methods, and techniques to analyze large datasets to uncover patterns and trends. Data Science can be used to make predictions, identify correlations, and uncover insights from data.",
            "createdAt" : "2023-04-09T15:18:29.580+0000",
            "updatedAt" : "2023-04-09T15:18:29.580+0000"
        }
]

export const Users = [
    {
        "_id" : "642b0b0e352c3ca4b54dbb02",
        "username" : "kgsn",
        "email" : "kgsn2001@gmail.com",
        "year" : 4,
        "skills" : "Machine Learning",
        "status" : "Student",
        "createdAt" : "2023-04-03T17:21:18.485+0000",
        "updatedAt" : "2023-04-03T17:21:18.485+0000"
    },
    {
        "_id" : "642d68e5533b5462d5b49682",
        "username" : "kgsn_1912",
        "email" : "test@123",
        "year" : 4,
        "skills" : "Machine learning",
        "status" : "Student",
        "createdAt" : "2023-04-05T12:26:13.114+0000",
        "updatedAt" : "2023-04-05T12:30:27.778+0000"
    }
]

export const Comments = [
    {
        "_id" : "643279468909d73660ee7458",
        "userId" : "642b0b0e352c3ca4b54dbb02",
        "postId" : "642ff58b70e1566855778b09",
        "comment" : "This is wrong",
        "createdAt" : "2023-04-09T08:37:26.662+0000",
        "updatedAt" : "2023-04-09T08:37:26.662+0000"
    },
    {
        "_id" : "643279468909d73660ee7458",
        "userId" : "642d68e5533b5462d5b49682",
        "postId" : "642ff58b70e1566855778b09",
        "comment" : "Nope I think this is correct",
        "createdAt" : "2023-04-09T08:37:26.662+0000",
        "updatedAt" : "2023-04-09T08:37:26.662+0000"
    },
    {
        "_id" : "643279468909d73660ee7458",
        "userId" : "642d68e5533b5462d5b49682",
        "postId" : "6432d67b081da7accafb35b9",
        "comment" : "Nope I think this is correct",
        "createdAt" : "2023-04-09T08:37:26.662+0000",
        "updatedAt" : "2023-04-09T08:37:26.662+0000"
    }
    
]