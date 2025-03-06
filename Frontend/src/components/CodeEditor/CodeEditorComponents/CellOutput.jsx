export default function CellOutput({ output, error, images }) {
    return (
      <div>
        {error && <div className="alert alert-danger">{error}</div>}
        {output && <pre className="alert alert-secondary p-2">{output}</pre>}
        {images?.map((image, index) => (
          <img key={index} src={image} alt={`Output ${index + 1}`} className="img-fluid mt-2" />
        ))}
      </div>
    );
  }
  