import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import { URL_BASE } from "../../utils/url";
import axios from "axios";
import HomeCard from "../../components/HomeCard/HomeCard";
import ChartBar from "../../components/ChartBar/ChartBar";

const DashboardHome = () => {
  const [views, setViews] = useState(0);
  const token = localStorage.getItem("token");
  useEffect(() => {
    try {
      const fetchData = async () => {
        await axios
          .get(`${URL_BASE}/views`, {
            headers: {
              authorization: `${token}`,
            },
          })
          .then((res) => {
            if (res) {
              setViews(res.data);
            }
          });
      };
      fetchData();
    } catch (error) {
      console.log("error fetching database", error);
    }
  }, []);
  return (
    <div className="font-poppins">
      <Navigation />
      <div className="px-60 flex flex-col gap-4">
        <div className="flex justify-between">
          <HomeCard text="Income" metric={`$${0}`} />
          <HomeCard text="Expenses" metric={`$${0}`} />
          <HomeCard text="Views" metric={views} />
        </div>
        <div className="w-full">
          <ChartBar />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
