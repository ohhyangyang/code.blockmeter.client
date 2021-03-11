import axios from "axios";

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://6048f662fb5dcc0017969555.mockapi.io/blockmeters",
      withCredentials: true,
    });
  }
  addSite = (
    
  ) => {
    const site="developer.mozilla.org";
    const monthly_users=10;
    const monthly_page_view=40;
    
    const unblock_traffic=35;
    const delta=3;
    const mobile_traffic=60;


    const addedSite = this.api.post(
      site,
      monthly_users,
      monthly_page_view,
      unblock_traffic,
      delta,
      mobile_traffic
    );
  };
}

const apiService = new ApiService();

export default apiService;
