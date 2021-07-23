from flask import Flask, request
from flask_cors import CORS, cross_origin
import xml.etree.ElementTree as ET

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/api", methods=['POST', 'GET'])
@cross_origin()
def saml_parser():
    if request.method == 'POST':
        request_body = request.get_data()
        root = ET.fromstring(request_body)
        acsURls = []
        acs_urls_index = 1
        certificate_index = 1
        certificates = []
        entityID = None
        singleLogoutService = []

        for child in root.findall("."):
            if child.tag.__contains__("EntityDescriptor"):
                entityID = child.attrib['entityID']
        
        for child in root.findall(".//"):
            splitdata = ""
            if child.tag.__contains__("X509Certificate"):
                certificate_data = child.text;
                trim_whitespace = certificate_data.strip();
                print(trim_whitespace);
                counter = 0
                data = "";
                while(counter <= len(certificate_data)):
                    data = data + trim_whitespace[counter: counter + 64] + "\n"
                    counter = counter + 64

                certificates.append({
                    "index": certificate_index,
                    "content": data
                })
                certificate_index + 1
                
                # certificate = "----BEGIN CERTIFICATE ----\n" + certificate_data + "\n---- END CERTIFICATE ----"

            elif child.tag.__contains__("AssertionConsumerService"):

                acsURls.append({
                    "index": acs_urls_index,
                    "url": child.attrib['Location'],
                    "binding": child.attrib['Binding']
                })
                acs_urls_index = acs_urls_index + 1

            elif child.tag.__contains__("SingleLogoutService"):
                counter = 1;
                singleLogoutService.append({
                    "index": counter,
                    "Url": child.attrib['Location'],
                    "Binding": child.attrib['Binding']
                })
                counter += 1

        metadata =  {
            "entityId": entityID,
            "certificate": certificates,
            "acsUrls": acsURls ,
            "singleLogoutService": singleLogoutService
        }

        return metadata
    else:
        return "404-ERROR ONLY POST DATA IS ACCEPTED"

if __name__ == "__main__":
    app.run() 