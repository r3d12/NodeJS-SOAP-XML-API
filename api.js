var request = require("request");
var DOMParser = require("xmldom").DOMParser;

const query = (Temp, elementToParse) => {
  xml = `<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ns=\"https://www.w3schools.com/xml/\">
  <soapenv:Header/>
   <soapenv:Body>
      <ns:FahrenheitToCelsius>
         <!--Optional:-->
         <ns:Fahrenheit>${Temp}</ns:Fahrenheit>
      </ns:FahrenheitToCelsius>
   </soapenv:Body>
</soapenv:Envelope>`;

  options = {
    method: "POST",
    url: "https://www.w3schools.com/xml/tempconvert.asmx",
    headers: {
      'Content-Type': 'text/xml'
    },
    body: xml
  };
  return new Promise((resolve, reject) => {
    request(options, function(error, response) {
      if (error) {
        reject(new Error(error)); // reject instead of throwing, handle with `catch`
        return;
      }
      text = response.body;
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(text, "text/xml");
      xmlResult = xmlDoc.getElementsByTagName(`${elementToParse}`)[0]
        .childNodes[0].nodeValue;
      resolve(xmlResult);
    });
  });
};
exports.query = query
