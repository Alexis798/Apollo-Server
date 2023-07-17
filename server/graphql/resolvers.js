import Project from "../models/project.js"
import Task from "../models/task.js"

export const resolvers = {
    Query: {
        hello: () => "Hello World!",
        projects: async () => {
            return await Project.find()
        },
        tasks: async () => {
            return await Task.find()
        },
        project: async (_, { _id }) => {
            return await Project.findById(_id)
        },
        task: async (_, { _id }) => {
            return await Task.findById(_id)
        }
    },

    Mutation: {
        //los args son lo que quiero recibir, que desctructuramos para que sea name y description, pero su forma original es solo args
        createProject: async (_, {name, description}) => {
            const project = new Project({
                name, 
                description
            })
            const saveProject = await project.save()
            return saveProject
        },
        createTask: async (_, {title, projectId}) => {

            const projectFound = await Project.findById(projectId)

            if (!projectFound) throw new Error('Project not found')

            const task = new Task({
                title, 
                projectId
            })
            const taskSaved = await task.save()
            return taskSaved
        },
        deleteProject: async (_, { _id }) => {
            const deletedProject = await Project.findByIdAndDelete(_id)
            if(!deletedProject) throw new Error('Project not found')
            await Task.deleteMany({ projectId: deletedProject._id})
            return deletedProject;
        },
        deleteTask: async (_, { _id }) => {
            const deletedTask = await Task.findByIdAndDelete(_id)
            if(!deletedTask) throw new Error('Task not found')
            return deletedTask;
        },
        updateProject: async (_, args) => {
            const updatedProject = await Project.findByIdAndUpdate(args._id, args, {
                new: true,
            });
            if (!updatedProject) throw new Error('Project not found')
            return updatedProject;
        },
        updateTask: async (_, args) => {
            const updatedTask = await Task.findByIdAndUpdate(args._id, args, {
                new: true,
            });
            if (!updatedTask) throw new Error('Task not found')
            return updatedTask;
        }
    },

    Project: {
        tasks: async (parent) => {
            return await Task.find({ projectId: parent._id})
        },
    },

    Task: {
        project: async (parent) => {
            return await Project.findById(parent.projectId)
        }
    }

    

}