import { Editor as MonacoEditor } from "@monaco-editor/react";

const options = {
    readOnly: true,
    minimap: {
        enabled: false
    },
    fontWeight: '600',
    fontSize: 14,
    overviewRulerLanes: 0,
    quickSuggestions: true,
    scrollBeyondLastLine: false,
    wordWrap: "on" as "on",
    insertSpace: true,
    tabSize: 4,
};

interface SVGReactNativeTransformProps {
    transformSVGCode: string;
}

const SVGReactNativeTransform = (props: SVGReactNativeTransformProps) => {

    const { transformSVGCode } = props;

    return (
        <div className="w-full h-full">
            <MonacoEditor 
                defaultLanguage="javascript"
                className="w-full h-full py-[5px]"
                options={options}
                value={transformSVGCode}
            />
        </div>
    );
};

export default SVGReactNativeTransform;