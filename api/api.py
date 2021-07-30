from flask import Flask, request
from flask_cors import CORS, cross_origin
import xml.etree.ElementTree as ET
import urllib3
import sqlite3

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
@app.route("/api", methods=['POST', 'GET'])
@cross_origin()
def saml_parser():
    if request.method == 'POST':
        request_body = request.get_data()
        xml_body_in_string = str(request_body.decode('UTF-8'))

        if(xml_body_in_string.startswith("https://" or "http://")):
            http = urllib3.PoolManager()
            r = http.request('GET', xml_body_in_string)
            data = r.data
            xml_body = data
        else:
            xml_body = request_body

        root = ET.fromstring(xml_body)
        acsURls = []
        acs_urls_index = 1
        certificate_index = 1
        single_logout_service_index = 1
        single_signon_service_index = 1
        certificates = []
        entityID = None
        singleLogoutService = []
        singleSignOnService = []

        for child in root.findall("."):
            if child.tag.__contains__("EntityDescriptor"):
                entityID = child.attrib['entityID']

        for child in root.findall(".//"):
            splitdata = ""
            if child.tag.__contains__("X509Certificate"):
                certificate_data = child.text.replace(" ", "")
                counter = 0
                data = "";
                while(counter <= len(certificate_data)):
                    data = data + certificate_data[counter: counter + 64].replace("\n", "") + "\n"
                    counter = counter + 64

                certificates.append({
                    "index": certificate_index,
                    "content": data
                })
                certificate_index + 1

            elif child.tag.__contains__("AssertionConsumerService"):

                acsURls.append({
                    "index": acs_urls_index,
                    "url": child.attrib['Location'],
                    "binding": child.attrib['Binding']
                })
                acs_urls_index = acs_urls_index + 1

            elif child.tag.__contains__("SingleLogoutService"):

                singleLogoutService.append({
                    "index": single_logout_service_index,
                    "Url": child.attrib['Location'],
                    "Binding": child.attrib['Binding']
                })
                single_logout_service_index + 1
            elif child.tag.__contains__('SingleSignOnService'):
                singleSignOnService.append( {
                    "index": single_signon_service_index,
                    "url": child.attrib['Location'],
                    "binding": child.attrib['Binding']
                })
                single_signon_service_index + 1

        metadata =  {
            "entityId": entityID,
            "certificate": certificates,
            "acsUrls": acsURls ,
            "singleLogoutService": singleLogoutService,
            "singleSignonService": singleSignOnService
        }

        return metadata
    else:
        return "404-ERROR ONLY POST REQUEST IS ACCEPTED"


@app.route("/formatCertificate", methods=['POST', 'GET'])
@cross_origin()
def format_certificate():
    if request.method == 'POST':
        certificate_data = request.get_data()
        certificate_in_string = str(certificate_data.decode('utf-8'))
        certificate_with_no_whitespaces = certificate_in_string.replace(" ", "")
        certificate_with_no_newline_tag = certificate_with_no_whitespaces.replace("\n", "")
        counter = 0
        certificate_length = len(certificate_with_no_newline_tag)
        header = "-----BEGIN CERTIFICATE-----\n"
        footer= "-----END CERTIFICATE-----"
        formatted_certificate = ""
        while (counter <= certificate_length):
            formatted_certificate = formatted_certificate + certificate_with_no_newline_tag[counter: counter + 64] + "\n"
            counter = counter + 64

        certificate_with_header = header + formatted_certificate + '\n' + footer
        return {"data": certificate_with_header}

    else:
        return "404-ERROR ONLY POST REQUEST IS ACCEPTED"

@app.route("/uploadmetadata", methods=['POST', 'GET'])
@cross_origin()
def xml_parse():
    if request.method == 'POST':
        request_body = request.get_data()
        xml_body_in_string = str(request_body.decode('UTF-8'))
        if(xml_body_in_string.startswith("http")):
            http = urllib3.PoolManager()
            r = http.request('GET', xml_body_in_string)
            data = r.data
            xml_body = str(data.decode('UTF-8'))
        else:
            xml_body = str(request_body.decode('utf-8'))
        
        if(xml_body.__contains__('entityID') & xml_body.__contains__('X509Certificate')):
            xml_body = xml_body
            conn = sqlite3.connect('metadata.db')
            root = ET.fromstring(xml_body)
            for child in root.findall(".//"):
                if child.tag.__contains__('SingleSignOnService'):
                    signOnUrl = child.attrib['Location']
            for child in root.findall("."):
                if child.tag.__contains__("EntityDescriptor"):
                    entityID = child.attrib['entityID']

            sql_query = "INSERT INTO metadata(entityId, signOnUrl) select \'" + entityID + "\', \'" + signOnUrl + "\' where not exists (select 1 from metadata where entityID = \'" + entityID + "\' and signOnUrl = \'" + signOnUrl + "\')"
            conn.execute(sql_query)
            conn.commit()
            conn.close()
        else:   
            xml_body = "XML is invalid"
            
        resp = {
            "data": xml_body
        }
        return resp;
    else:
        return "GET"

@app.route("/validateEntityId", methods=['POST', 'GET'])
@cross_origin()
def validateEntityId():
    if request.method == 'POST':
        conn = sqlite3.connect("metadata.db")
        request_body = request.get_data()
        entityId = str(request_body.decode('UTF-8'))
        sql_query = "SELECT signOnUrl from metadata where entityId = \'" + entityId + "\'";
        try:
            cursor = conn.execute(sql_query)
            for row in cursor:
                signOnUrl = row[0]
            conn.close()
            metadata = {
                "data": signOnUrl
            }
        except sqlite3.Error as err:
            return "Please upload metadata first"
        
        return metadata

    else:
        return "404 ERROR" 

if __name__ == "__main__":
    app.run()
