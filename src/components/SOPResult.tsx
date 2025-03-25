'use client';

interface SOPResultProps {
  content: string;
  onDownload: (format: 'docx' | 'pdf' | 'txt') => void;
  onCopy: () => void;
  id?: string;
}

const SOPResult: React.FC<SOPResultProps> = ({ content, onDownload, onCopy, id }) => {
  // Format SOP content for display as plain text
  const formatPlainText = (sopContent: string) => {
    return sopContent.replace(/\n/g, '<br>');
  };

  return (
    <div className="card result-card" id={id}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Your Statement of Purpose</h4>
        <span className="badge bg-success">Generated Successfully</span>
      </div>
      <div className="card-body">
        <div 
          id="sop-result" 
          dangerouslySetInnerHTML={{ __html: formatPlainText(content) }}
        />
        
        <div className="result-actions mt-4">
          <button 
            className="btn btn-primary" 
            onClick={() => onDownload('docx')}
          >
            <i className="fa fa-file-word-o me-2"></i>
            Download as DOCX
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => onDownload('pdf')}
          >
            <i className="fa fa-file-pdf-o me-2"></i>
            Download as PDF
          </button>
          <button 
            className="btn btn-outline-primary" 
            onClick={() => onDownload('txt')}
          >
            <i className="fa fa-file-text-o me-2"></i>
            Download as TXT
          </button>
          <button 
            className="btn btn-outline-secondary" 
            onClick={onCopy}
          >
            <i className="fa fa-clipboard me-2"></i>
            Copy to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SOPResult; 