import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './SeePECV3PDF.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface SeePECV3PDFProps {
  pdfUrl: string;
}

const SeePECV3PDF: React.FC<SeePECV3PDFProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg" style={{ minHeight: '792px', padding: '1rem' }}>
          <div className="p-12 flex justify-center">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              className="pdf-document"
            >
              <Page
                pageNumber={currentPage}
                className="pdf-page"
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        </div>
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
            className={`px-4 py-2 rounded-lg font-medium ${
              currentPage <= 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            Previous
          </button>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Page {currentPage} of {numPages}
            </span>
            <div className="flex space-x-2">
              {numPages && [...Array(numPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentPage === index + 1 ? 'bg-emerald-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => setCurrentPage(Math.min(numPages || 1, currentPage + 1))}
            disabled={!numPages || currentPage >= numPages}
            className={`px-4 py-2 rounded-lg font-medium ${
              !numPages || currentPage >= numPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeePECV3PDF;
