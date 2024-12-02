import axios from "axios";
import React ,{createContext, useState, useContext, useEffect} from "react";

const AnalyticsContext = createContext();

export const useAnalyticsContext = ()=> useContext(AnalyticsContext)

export const AnalyticsProvider = ({children})=>{
  const [users, setUsers] = useState([]);
  const [filteredUsers,setFilteredUsers]=useState()
  const [buttonChange,setButtonChange]=useState('')
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/all/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };


    const analyticsData = {
        salesData: {
          total: 100000,
          dates: ["Jan", "Feb", "Mar"],
          values: [1000, 2000, 3000],
        },
        users: { active: 1200 },
        topSellingProducts: [
          { name: "Product A", sales: 5000 },
          { name: "Product B", sales: 4000 },
          { name: "Product C", sales: 3000 },
        ],
        salesOverTime: {
          dates: ["Jan", "Feb", "Mar"],
          values: [1000, 2000, 3000],
        },
        userGrowth: {
          dates: ["Jan", "Feb", "Mar"],
          values: [50, 100, 150],
        },
        revenueByProduct: {
          categories: ["Category A", "Category B", "Category C"],
          values: [5000, 3000, 2000],
        },
      };
      const [filteredData, setFilteredData] = useState(analyticsData);
      const [revenueData, setRevenueData] = useState({
        categories: [],
        values: [],
      });
    
      const fetchRevenueData = async (formattedStartDate,formattedEndDate) => {
  
        try {
            // Include the filters in the query parameters if they exist
            let response = await axios.get(
              "/admin/revenue/total-revenue-by-products",
              {
                params: {
                  startDate: formattedStartDate,
                  endDate:formattedEndDate,
                },
              }
            
            )
          setRevenueData(response.data); // Set the fetched revenue data
          console.log("response from context",response.data)
        } catch (error) {
          console.error("Error fetching revenue by product category:", error);
        }
      };
      function filterByDateRange(fromDate, toDate) {
        console.log('filter running')
        const from = new Date(fromDate);
        const to = new Date(toDate);
        console.log(from , to)
    
        const filtered = users.filter(user => {
          const createdAt = new Date(user.createdAt);
          return createdAt >= from && createdAt <= to;
    
  
            
        });
        setFilteredUsers(filtered)
    }
  useEffect(() => {

   
  }, [  ])
  console.log("filteredUsers",filteredUsers)
  

    return(
        <AnalyticsContext.Provider value={{ buttonChange,setButtonChange,fetchUsers,filteredUsers,setFilteredUsers,users, setUsers,filteredData,setFilteredData ,analyticsData,revenueData, setRevenueData,fetchRevenueData,filterByDateRange}} >
            {children}
        </AnalyticsContext.Provider>
    )
}