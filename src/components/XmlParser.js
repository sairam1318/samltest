import { useEffect, useState } from "react";
import "../App.css";
const XmlParser = () => {
  const [resp, setResp] = useState({
    entityID: null,
    certificate: null,
    acsUrls: null,
    singleLogoutService: null,
    singleSignonService: null,
  });
  const [data, setData] = useState();
  useEffect(() => {
    console.log(resp);
  }, [resp]);

  const handleSubmission = async (e) => {
    e.preventDefault();
    if (data === undefined || data == null) {
      alert("Please upload a valid url or file");
    } else {
      await fetch("http://127.0.0.1:5000/api", {
        method: "POST",
        mode: "cors",
        body: data,
      })
        .then((res) => res.json())
        .then((json) =>
          setResp({
            entityID: json.entityId,
            certificates: json.certificate,
            acsUrls: json.acsUrls,
            singleLogoutService: json.singleLogoutService,
            singleSignonService: json.singleSignonService,
          })
        );
    }
  };
  const handleUrl = (e) => {
    setData(e.target.value);
  };
  const changeHandler = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      setData(e.target.result);
    };
  };

  return (
    <form>
      <div id="xml-parser" className="form-group col-sm-12">
        <div>
          <label>Upload File</label>
          <input
            type="file"
            name="file"
            onChange={(e) => {
              changeHandler(e);
            }}
            accept="xml"
          />
          <br />
      
          <legend>(OR)</legend>
          <div className="col-sm-4">
            <p>
              PASTE URL HERE:{" "}
              <input
                id="url"
                className="form-control"
                onChange={(e) => {
                  handleUrl(e);
                }}
              />
            </p>
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <div className="col-sm-4">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                handleSubmission(e);
              }}
            >
              Submit
            </button>
          </div>
          <br />
          <hr/>
          <div>
            <div>
              {resp.entityID != null ? (
                <div>
                  {" "}
                  <li><strong>Entity Id:</strong> {resp.entityID}{" "}</li>
                </div>
              ) : null}
            </div>
            <div>
              {resp.singleLogoutService != null
                ? resp.singleLogoutService.map((url) => {
                    return (
                      <p key={url.index}>
                          <strong>Single Logout Url:</strong>
                        {" "}
                        {url.Url} <br />{" "}
                        <b>
                          <u>Single logout Binding:</u>
                        </b>{" "}
                        {url.Binding}
                      </p>
                    );
                  })
                : null}
            </div>
            <div>
              {resp.acsUrls != null
                ? resp.acsUrls.map((acsUrl) => {
                    return (
                      <p key={acsUrl.index}>
                        <b>
                          <u>Acs url: </u>
                        </b>
                        {acsUrl.url}
                        <br />{" "}
                        <b>
                          <u> Acs url binding: </u>
                        </b>
                        {acsUrl.binding}
                      </p>
                    );
                  })
                : null}
            </div>
            <div className="signon">
              {" "}
              {resp.singleSignonService != null
                ? resp.singleSignonService.map((signon) => {
                    return (
                      <p key={signon.index}>
                        <b>
                          <strong>Single sign on url: </strong>
                        </b>{" "}
                        {signon.url}
                        <br />{" "}
                        <b>
                          <u>Single sign on Binding: </u>
                        </b>
                        {signon.binding}{" "}
                      </p>
                    );
                  })
                : null}{" "}
            </div>
          </div>
          <div className="certificate">
            {resp.certificates != null
              ? resp.certificates.map((cert) => {
                  return (
                    <p key={cert.index}>
                      <b>
                        <u>Certificate: </u>
                      </b>{" "}
                      <br /> {cert.content}
                    </p>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </form>
  );
};
export default XmlParser;
