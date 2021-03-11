import axios from "axios";

class UnblockiaService {
  
  constructor() {
    this.api = axios.create({
      baseURL: "https://6048f662fb5dcc0017969555.mockapi.io/blockmeters",
    });
  }

  saveSite = (
    site,
    monthly_users,
    monthly_page_view,
    unblock_traffic,
    delta,
    mobile_traffic
  ) => {
    this.api
      .post("/", {
        site,
        monthly_users,
        monthly_page_view,
        unblock_traffic,
        delta,
        mobile_traffic,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getSite = (site) => {
    const pr = this.api.get(`/?site=${site}`);
    return pr;
  };
}

const unblockiaService = new UnblockiaService();

export default unblockiaService;
