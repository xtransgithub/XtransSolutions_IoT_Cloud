export default function Output({ output }) {
    return (
      <div className="border p-3 bg-light">
        <h5>Output</h5>
        <pre className="bg-dark text-white p-2 rounded">{output || "Run your code to see the output here..."}</pre>
      </div>
    );
  }
  