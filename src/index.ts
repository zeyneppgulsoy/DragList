export type Task = {
  title: string;
  description: string;
  status: 'To Do' | 'In Progress' | 'Done';
  assignee: string;
};

export const taskData: Task[] = [
  {
    title: 'Express Myself',
    description: 'Set the building on fire.',
    status: 'To Do',
    assignee: 'Lyla Harper',
  },
  {
    title: 'Catch Up Work - Saturday',
    description: 'Gonna need you to come into work on Saturday.',
    status: 'In Progress',
    assignee: 'Hayes Aguirre',
  },
  {
    title: 'Catch Up Work - Sunday',
    description: 'Gonna need you to come into work on Sunday.',
    status: 'In Progress',
    assignee: 'Farah Koch',
  },
  {
    title: 'Tips Reports',
    description: 'Did you get the memo?',
    status: 'To Do',
    assignee: 'Salvador Vega',
  },
  {
    title: 'Buy some more Flare',
    description: 'Apparently, 13 is not the minimum number.',
    status: 'Done',
    assignee: 'Maria Koch',
  },
]; 