const pdfmake = require("pdfmake");

const createPDF = (docDef, name) => {
  try {
    var fonts = {
      Roboto: {
        normal: "public/fonts/Roboto-Regular.ttf",
        bold: "public/fonts/Roboto-Medium.ttf",
        italics: "public/fonts/Roboto-Italic.ttf",
        bolditalics: "public/fonts/Roboto-MediumItalic.ttf",
      },
    };

    pdfmake.addFonts(fonts);

    var pdf = pdfmake.createPdf(docDef);
    pdf.write(`public/pdfs/${name}`).then(
      () => {
        console.log("Pdf Created");
        
        // success event
      },
      (err) => {
        // error event
        console.error(err);
      },
    );
    
  } catch (error) {
    console.log(error);
    
  }
};

module.exports = createPDF;
