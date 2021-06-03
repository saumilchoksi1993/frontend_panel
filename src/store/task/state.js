export const getDefaultState = () => {
    return {
        taskList: [
            { id:1, name: "Task 1", description: "This is test Discription 1"},
            { id:2, name: "Task 2", description: "This is test Discription 2" },
            { id:3, name: "Task 3", description: "This is test Discription 3" }
        ]
    };
};

// initial state
const state = getDefaultState();

// expose state
export default state;
