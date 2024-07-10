import { Flow, Sequence, Class, State, ER, Journey, Gantt, Pie, Quadrant, Requirement, Git, C4, Mindmap, Timeline, Sankey } from './mermaid';

export const MonacoOptions = {
    readOnly: false,
    minimap: {
        enabled: false
    },
    fontWeight: '600',
    fontSize: '14px',
    overviewRulerLanes: 0,
    quickSuggestions: true,
    scrollBeyondLastLine: false,
};

export const mermaidTemplate = (type: string): string => {
    const code = {
        'Flow' : Flow,
        'Sequence': Sequence,
        'Class': Class,
        'State': State,
        'ER': ER,
        'User Journey' : Journey,
        'Gantt': Gantt,
        'Pie': Pie,
        'Quadrant Chart': Quadrant,
        'Requirement' : Requirement,
        'Git' : Git,
        'C4': C4,
        'Mindmap': Mindmap,
        'Timeline': Timeline,
        'Sankey' : Sankey,
    }[type];
    
    return code || '';
};