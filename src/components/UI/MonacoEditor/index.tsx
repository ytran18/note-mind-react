import { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import { initEditor } from '@core/mermaid';

interface MonacoEditorProps {
    handleChangeCode: (value: string) => void;
    code: string;
    autoSync: boolean;
    handleSyncCode: () => void;
};

const MonacoEditor = (props: MonacoEditorProps) => {

    const { handleChangeCode, code, autoSync, handleSyncCode } = props;

    const [loadMermaidTheme, setLoadMermaidTheme] = useState<number>(0);

    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

    useEffect(() => {
        const editorContainer = document.getElementById('monaco-mermaid');
        if (editorContainer) {
            editorRef.current = monaco.editor.create(editorContainer, {
                language: 'mermaid',
                minimap: {
                    enabled: false
                },
                fontWeight: '600',
                fontSize: 14,
                overviewRulerLanes: 0,
                quickSuggestions: true,
                scrollBeyondLastLine: false,
                value: code || '',
                wordWrap: "on" as "on",
            });

            editorRef.current.onDidChangeModelContent(({ isFlush }) => {
                if (isFlush) return;
                const newValue = editorRef.current?.getValue();
                if (newValue) {
                    handleChangeCode(newValue);
                }
            });

            // monaco.editor.setTheme('mermaid');
            // initEditor(monaco);

            if (!autoSync) {
                editorRef.current.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
                    handleSyncCode();
                });
            };

            const resizeObserver = new ResizeObserver((entries) => {
                requestAnimationFrame(() => {
                    editorRef.current?.layout({
                        height: entries[0].contentRect.height,
                        width: entries[0].contentRect.width
                    });
                });
            });

            if (editorContainer.parentElement) {
                resizeObserver.observe(editorContainer.parentElement);
            }

            return () => {
                if (editorRef.current) {
                    editorRef.current.dispose();
                }
            };
        }
    }, []);

    useEffect(() => {
        if (loadMermaidTheme > 1) return;

        monaco.editor.setTheme('mermaid');
        initEditor(monaco);
        setLoadMermaidTheme(prev => prev + 1);
    }, [loadMermaidTheme]);

    useEffect(() => {
        if (editorRef.current && code) {
            const currentValue = editorRef.current.getValue();
            if (currentValue !== code) {
                editorRef.current.setValue(code || '');
                const model = editorRef.current.getModel(); // get value of monaco editor
        
                if (model) {
                    const position = model.getPositionAt(model.getValueLength());
                    editorRef.current.setPosition(position);
                    editorRef.current.focus();
                }
            }
        }
    }, [code]);

    return (
        <div id='editor' className='flex flex-col h-full w-full p-1'>
            <div
                id='monaco-mermaid'
                style={{ height: '100%' }}
            >
            </div>
        </div>
    );
};

export default MonacoEditor;