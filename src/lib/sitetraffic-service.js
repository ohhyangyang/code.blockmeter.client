import axios from "axios";

class SitetrafficService {
  constructor() {
    this.api = axios.create({
      baseURL:
        "https://endpoint.sitetrafficapi.com/pay-as-you-go/?key=bada3b3637443ac5ff59e80b23b67724b169f577&host=",
    });
  }
  getTrafficData = (site) => {
    const pr=axios.get(`https://endpoint.sitetrafficapi.com/pay-as-you-go/?key=bada3b3637443ac5ff59e80b23b67724b169f577&host=${site}`)
    return pr
    // .then((res)=>{
    //     console.log(res.data.data.estimations.visitors.monthly)
    //     console.log(res.data.data.estimations.pageviews.monthly)
    //     return res.data.data.estimations
    // })
    
  };
}

const sitetrafficService = new SitetrafficService();

export default sitetrafficService;

