import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import { URL_BASE } from "../../utils/url";
import axios from "axios";
import HomeCard from "../../components/HomeCard/HomeCard";
import ChartBar from "../../components/ChartBar/ChartBar";
import Modal from "../../components/HomeModals/Modal";

const DashboardHome = () => {
  const [views, setViews] = useState({});
  const [balance, setBalance] = useState({});
  const token = localStorage.getItem("token");
  const [active, setActive] = useState(false);
  const [activeIncome, setActiveIncome] = useState(false);
  const fetchBalanceData = async () => {
    try {
      await axios
        .get(`${URL_BASE}/balance`, {
          headers: {
            authorization: `${token}`,
          },
        })
        .then((res) => {
          if (res) {
            setBalance(res.data);
          }
        });
    } catch (error) {
      console.log("error fetching balance database", error);
    }
  };
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

  useEffect(() => {
    fetchBalanceData();
  }, []);

  const handleClick = () => {
    setActiveIncome(false);
    setActive(true);
  };
  const handleClickIncome = () => {
    setActive(false);
    setActiveIncome(true);
  };
  const handleCancel = () => {
    setActive(false);
    setActiveIncome(false);
  };
  const handleSend = async (first, label) => {
    if (first !== 0) {
      try {
        let URL;
        if (label === "Income") {
          URL = `${URL_BASE}/balance/income`;
        } else if (label === "Expenses") {
          URL = `${URL_BASE}/balance/expenses`;
        }
        await axios
          .post(
            URL,
            { value: first },
            {
              headers: {
                authorization: `${token}`,
              },
            }
          )
          .then((response) => {
            if (response) {
              fetchBalanceData();
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="font-poppins">
      <Navigation />
      <div className="px-60 flex flex-col gap-4">
        <div className="flex justify-between">
          <HomeCard
            text="Income"
            metric={
              Object.keys(balance).length !== 0
                ? `$USD ${balance.total.totalIncome}`
                : "$USD 0"
            }
            addNew="income"
            handleClick={handleClickIncome}
          />
          <HomeCard
            text="Expenses"
            metric={
              Object.keys(balance).length !== 0
                ? `$USD ${balance.total.totalExpenses}`
                : "$USD 0"
            }
            addNew="expenses"
            handleClick={handleClick}
          />
          <HomeCard
            text="Views"
            metric={Object.keys(views).length !== 0 ? `${views.total}` : "0"}
          />
          <HomeCard
            text="Last week views"
            metric={
              Object.keys(views).length !== 0 ? `${views.lastMonth}` : "0"
            }
          />
        </div>
        <div className="w-full h-full">
          <ChartBar />
        </div>
        <Modal
          label="Income"
          active={activeIncome}
          handleClick={handleClickIncome}
          handleSend={handleSend}
          handleCancel={handleCancel}
        />
        <Modal
          label="Expenses"
          active={active}
          handleClick={handleClick}
          handleSend={handleSend}
          handleCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default DashboardHome;
