import React from "react"; 
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

SyntaxHighlighter.registerLanguage("javascript", js);

export default function CodeDisplay({ code, currentLine }) {
  //const lines = code.split("\n");

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        borderRadius: "12px",
        padding: "16px",
        marginTop: "25px",
        marginRight: "0px",
        color: "white",
        overflowY: "auto",
        height: "30%",
        fontFamily: "'IBM Plex Mono', monospace",
      }}
    >
      <SyntaxHighlighter
        language="javascript"
        style={atomOneDark}
        customStyle={{ background: "transparent", padding: 0, margin: 0 }}
        showLineNumbers
        wrapLines
        lineProps={({ lineNumber }) => {
          const style = {
            display: "block",
            background:
              lineNumber === currentLine
                ? "rgba(100, 255, 218, 0.2)"
                : "transparent",
            transition: "background 0.3s",
          };
          return { style };
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
