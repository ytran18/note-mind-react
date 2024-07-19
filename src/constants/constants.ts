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

export const svgRotate = (type: number, isFlipX: boolean, isFlipY: boolean) => {
    // const defaultValue = {
    //     0: [],
    //     1: [6.123233995736766e-17, 1, -1, 6.123233995736766e-17, 0, 0],
    //     2: [-1, 1.2246467991473532e-16, -1.2246467991473532e-16, -1, 0, 0],
    //     3: [-1.8369701987210297e-16, -1, 1, -1.8369701987210297e-16, 0 ,0],
    // }[type];

    const bothXY = {
        1: [-6.123233995736766e-17, -1, 1, -6.123233995736766e-17, 0, 0],
        2: [1, -1.2246467991473532e-16, 1.2246467991473532e-16, 1, 0, 0],
        3: [1.8369701987210297e-16, 1, -1, 1.8369701987210297e-16, 0, 0],
    }[type];

    const onlyX = {
        1: [-6.123233995736766e-17, -1, -1, 6.123233995736766e-17, 0, 0],
        2: [1, -1.2246467991473532e-16, -1.2246467991473532e-16, -1, 0, 0],
        3: [1.8369701987210297e-16, 1, 1, -1.8369701987210297e-16, 0, 0],
    }[type];

    const onlyY = {
        1: [6.123233995736766e-17, 1, 1, -6.123233995736766e-17, 0, 0],
        2: [-1, 1.2246467991473532e-16, 1.2246467991473532e-16, 1, 0, 0],
        3: [-1.8369701987210297e-16, -1, -1, 1.8369701987210297e-16, 0, 0],
    }[type];

    if (type === 0 ) return isFlipX ? isFlipY ? 'matrix(-1,0,0,-1,0,0)' : 'matrix(-1,0,0,1,0,0)' : 'matrix(1,0,0,-1,0,0)';
    if (type === 1) return isFlipX ? isFlipY ? `matrix(${bothXY})` : `matrix(${onlyX})` : `matrix(${onlyY})`;
    if (type === 2) return isFlipX ? isFlipY ? `matrix(${bothXY})` : `matrix(${onlyX})` : `matrix(${onlyY})`;
    if (type === 3) return isFlipX ? isFlipY ? `matrix(${bothXY})` : `matrix(${onlyX})` : `matrix(${onlyY})`;
};