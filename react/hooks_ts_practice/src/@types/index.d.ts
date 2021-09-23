const statusArray = ['Standby', 'Running', 'Finish', 'Stopped'];
type panelStatusType = typeof statusArray[number];
type taskStatusType = typeof statusArray[number];

interface GoalItemInterface {
    id: number,
    title: string,
    desc: string,
    panelStatus: panelStatusType,
    hasTaskNum: number,
    finishedTaskNum: number
}

interface TaskItemInterface {
    id: number,
    title: string,
    desc: string,
    taskStatus: taskStatusType,
    goalTitle: string
}
