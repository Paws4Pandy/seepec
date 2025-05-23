import React from 'react';
import SeePECV3PDF from './SeePECV3PDF';

const App: React.FC = () => {
  // You can replace this with your PDF URL
  const samplePdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

  return (
    <div>
      <SeePECV3PDF pdfUrl={samplePdfUrl} />
    </div>
  );
};

export default App;
