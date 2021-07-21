from datetime import time
from flask import Flask, request
from flask_cors import CORS, cross_origin
import time
import xml.etree.ElementTree as ET

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/api", methods=['POST', 'GET'])
@cross_origin()
def saml_parser():
    if request.method == 'POST':
        data = request.get_data();
        root = ET.fromstring(data);
        entityID = root.attrib['entityID'];
        certificate = root[0][0][0][0][0].text;
        singlelogoutUrl = root[0][2].attrib['Location']
        acsUrl = root[0][4].attrib['Location']
        metadata_json = {
            "entityID" : entityID,
            "certificate" : certificate,
            "ACSurl": acsUrl,
            "SingleLogouturl": singlelogoutUrl
        }
        return metadata_json;
    else:
        return "hello"

if __name__ == "__main__":
    app.run() 