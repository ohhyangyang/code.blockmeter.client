import axios from "axios";

class UnblockiaService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://6048f662fb5dcc0017969555.mockapi.io/blockmeters",
    });
  }

  saveSite = (site) => {
    const pr = this.api.post("/", {
      site,
    });
    return pr;
  };

  getSite = (site) => {
    const pr = this.api.get(`/?site=${site}`);
    return pr;
  };

  saveMobileTraffic = (site, mobileTraffic,email) => {
    const pr = this.api.post(`/?site=${site}`, { mobileTraffic,email });
    return pr;
  };
}

const unblockiaService = new UnblockiaService();

export default unblockiaService;
