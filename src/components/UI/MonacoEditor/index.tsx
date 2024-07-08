import { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import { initEditor } from '@core/mermaid';

interface MonacoEditorProps {
    handleChangeCode: (value: string) => void;
};

const MonacoEditor = (props: MonacoEditorProps) => {

    const { handleChangeCode } = props;

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
                value: '', // Hoặc giá trị code mặc định nếu có
            });

            editorRef.current.onDidChangeModelContent(({ isFlush }) => {
                if (isFlush) return;
                const newValue = editorRef.current?.getValue();
                if (newValue) {
                    handleChangeCode(newValue);
                }
            });

            monaco.editor.setTheme('mermaid');
            initEditor(monaco);

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