import{ useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import { useEffect } from "react";

export const FetchData = (props) => {
  const { data: planeData, isError, refetch } = useQuery(["plane"], async() => {
      return Axios.get("https://airspacebackend.azurewebsites.net/state/active").then((res) => res.data);
  });

  useEffect(() => {
      if (planeData) {
        props.setData(planeData);
      }
    }, [planeData, props]);

  // Call refetch every 30 minutes
  useEffect(() => {
  const intervalId = setInterval(() => {
    refetch();
  }, 30 * 60 * 1000); // 30 minutes in milliseconds

  return () => clearInterval(intervalId);
  }, [refetch]);
  
  if(isError) {
      return <div>Error fetching data</div>;
  }

  return null;
};